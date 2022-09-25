<template>
<div>
<div v-if="user.admin =='1'">
  <v-data-table  :headers="headers" :items="sawstatus" :search="search" class="elevation-1" >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>User List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
                <v-text-field v-model="search" class="serc" append-icon="mdi-magnify" label="Search" single-line hide-details
                ></v-text-field>&nbsp;
        <!--------------modal------------------->
        <v-dialog v-model="dialog" max-width="500px" >
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark rounded class="ml-5 mr-5 mb-2" v-on="on">New User</v-btn>
          </template>
          <!----popup---------------->
          <v-card>
            <v-card-title><span class="headline" >{{ formTitle }}</span></v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="userform">
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.name" label="Name" :rules="requiredRules"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.email" label="Email" 
                    :rules="emailRules" ></v-text-field>
                  </v-col>
                 
                    <v-col cols="12" sm="6" md="6" v-if="dialogDelete === false">
                      <v-text-field :rules="passwordRules"
                     v-model="editedItem.password" label="Password" type="password" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" v-if="dialogDelete === false">
                      <v-text-field  v-model="editedItem.confirm_password" label="Confirm Password" 
                      type="password" :rules="[(editedItem.confirm_password === editedItem.password) || 
                      'Passwords  not matching']" ></v-text-field>
                    </v-col>
                 
                <!--   <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.mobile" label="Mobile"></v-text-field>
                  </v-col> -->
                  <v-col cols="12" sm="6" md="6">
                    <v-select single-line bottom label="Type" 
                      v-model="editedItem.type" :items="typeOptions"    
                      :rules="[(v) => !!v || 'Type is required!']"
                     required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select single-line bottom label="Location" 
                      v-model="editedItem.location_id" :items="locOptions"   
                      item-text="label" item-value="value" 
                      :rules="[(v) => !!v || 'Location is required!']"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
                </v-form>
              </v-container>
            </v-card-text>

           <!-- <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions> -->
            <v-card-actions>
              <div class="flex-grow-1"></div>
                <div v-if="dialogDelete === true">
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="remove">Delete</v-btn>
                </div>
                <div v-else-if="dialogDelete === false">
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--------------modal--------------->
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon medium color="blue darken-2" class="mr-2" @click="editItem(item)" >mdi-pencil</v-icon>
      <v-icon medium color="red" @click="deleteItem(item)" >mdi-delete</v-icon>
    </template>
    <template v-slot:item.mobile1="{ item }">
       <span v-if="item.mobile ==1">Admin User</span>
       <span v-if="item.mobile ==3">View User</span>
       <span v-if="item.mobile ==2 || item.mobile ==''" >Saw User</span>
       <span v-if="item.mobile ==4" >Super User</span>
    </template>
    <template v-slot:item.location_id="{ item }">
        <span v-for="aa in locOptions" :key="aa.value" >
            <span v-if="aa.value==item.location_id">  <!-- {{aa.id}} -->
              {{aa.label}}
            </span>
        </span>
    </template>
    <template v-slot:no-data>
      <div></div> <!----show nothing when no data -->
    </template>
  </v-data-table>
  </div>
  <div v-else class="text-center pt-5"> <h3>Accessible only to Admin Users</h3></div>
  </div>
</template>
<script>
    import { mapGetters, mapState, mapActions} from 'vuex'
    import axios from "axios";
  export default {
    data: () => ({
      dialog: false,dialogDelete: false,search: '',
      headers: [
                      //  { text: "ID", value: "id", width: "6%" },
                        { text: "NAME", align: "left", sortable: true, value: "name" },
                        { text: "EMAIL", align: "left", sortable: true, value: "email" },
                        { text: "TYPE", align: "left", sortable: true, value: "mobile1" },
                        { text: "LOCATION", align: "left", sortable: true, value: "location_id" },
                       // { text: "TYPE", align: "left", sortable: true, value: "type" },
                       // { text: "CREATEDBY", align: "left", sortable: true, value: "created_by.name" },
                       // { text: "UPDATEDBY", align: "left", sortable: true, value: "updated_by" },
                       // { text: "UPDATEDAT", align: "left", sortable: true, value: "updated_at" },
                       // { text: "Actions", value: "action", sortable: false, width: "8%" },
                        { text: 'Actions', value: 'actions', sortable: false,width: "10%" },
      ],
      desserts: [],categories: [],
      editedItem: { name: '', email: '', type:'',   password: '', confirm_password: '', mobile:'',location_id:'',locationid:''},
      editedIndex: -1,
      typeOptions: [ "Admin",  "Saw" , "View", "Super"],
      locOptions:[],
      requiredRules: [ v => !!v || 'This field is required'        ],
      emailRules:[ v => !!v || 'The Email is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                  ],
      passwordRules:[  v => !!v || 'The Password is required',
                      v => (v && v.length > 5) || 'The Password must be atleast 6 chars'
                    ]
    }),
/*created(){ this.loading=true;
            this.$store.dispatch('getuserlist')
                    .then((res) => { //this.loading=false;
                                console.log('getstatus response',res.data)  
                                this.sawstatus=res.data;
                                this.loading=false;
                        }) 
        },
        */
    created(){
                    /* axios.get(`${axios.defaults.baseURL}/saw/locations`)
               // this.$store.dispatch(`getsawschedules?page='+${e.page}`,{})
                    .then((res) => { console.log('user-locations',res.data)  
                                    this.locationOptions(res.data);
                                        })*/
               let res=[{"id":1,"state_id":"1","name":"Queanbeyan","comment":"Queanbeyan","active":"1","created_at":"2017-03-22T16:13:18.000000Z","updated_at":"2017-06-14T19:54:04.000000Z","created_by":null,"updated_by":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null},"abbreviation":"QBN","location_id":"2","createdby":null,"updatedby":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null}},{"id":2,"state_id":"2","name":"Smithfield","comment":"Smithfield of NSW","active":"1","created_at":"2017-03-22T16:17:40.000000Z","updated_at":"2017-03-22T16:17:40.000000Z","created_by":null,"updated_by":null,"abbreviation":"SMT","location_id":"2","createdby":null,"updatedby":null},{"id":3,"state_id":"2","name":"Nowra","comment":"Nowra of NSW","active":"1","created_at":"2017-03-22T16:18:00.000000Z","updated_at":"2017-03-22T16:18:00.000000Z","created_by":null,"updated_by":null,"abbreviation":"NOW","location_id":"2","createdby":null,"updatedby":null},{"id":5,"state_id":"3","name":"Geebung","comment":"Geebung of QLD","active":"1","created_at":"2017-03-22T16:18:25.000000Z","updated_at":"2017-03-22T16:18:25.000000Z","created_by":null,"updated_by":null,"abbreviation":"GBG","location_id":"4","createdby":null,"updatedby":null},{"id":7,"state_id":"3","name":"Townsville","comment":"Townsville","active":"1","created_at":"2017-03-22T16:18:51.000000Z","updated_at":"2017-03-22T16:18:51.000000Z","created_by":null,"updated_by":null,"abbreviation":"TVL","location_id":"5","createdby":null,"updatedby":null},{"id":8,"state_id":"3","name":"Cairns","comment":"Cairns","active":"1","created_at":"2017-03-22T16:19:00.000000Z","updated_at":"2017-03-22T16:19:00.000000Z","created_by":null,"updated_by":null,"abbreviation":"CRN","location_id":"5","createdby":null,"updatedby":null},{"id":9,"state_id":"4","name":"Edinburgh Parks","comment":"Edinburgh Parks","active":"1","created_at":"2017-03-22T16:19:11.000000Z","updated_at":"2017-03-22T16:19:11.000000Z","created_by":null,"updated_by":null,"abbreviation":"ELI","location_id":"6","createdby":null,"updatedby":null},{"id":10,"state_id":"4","name":"Lonsdale","comment":"Lonsdale","active":"1","created_at":"2017-03-22T16:19:24.000000Z","updated_at":"2018-03-12T19:23:19.000000Z","created_by":null,"updated_by":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null},"abbreviation":"LON","location_id":"6","createdby":null,"updatedby":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null}},{"id":11,"state_id":"5","name":"Moonah","comment":"Moonah","active":"1","created_at":"2017-03-22T16:19:32.000000Z","updated_at":"2018-03-12T19:23:56.000000Z","created_by":null,"updated_by":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null},"abbreviation":"MOO","location_id":"7","createdby":null,"updatedby":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null}},{"id":12,"state_id":"5","name":"Launceston","comment":"Launceston","active":"1","created_at":"2017-03-22T16:19:42.000000Z","updated_at":"2018-03-12T19:24:16.000000Z","created_by":null,"updated_by":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null},"abbreviation":"LAU","location_id":"7","createdby":null,"updatedby":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null}},{"id":13,"state_id":"6","name":"Bayswater","comment":"Bayswater","active":"1","created_at":"2017-03-22T16:19:52.000000Z","updated_at":"2017-03-22T16:19:52.000000Z","created_by":null,"updated_by":null,"abbreviation":"BAY","location_id":"1","createdby":null,"updatedby":null},{"id":14,"state_id":"6","name":"Albury\/Wodonga","comment":"Albury\/Wodonga","active":"1","created_at":"2017-03-22T16:20:02.000000Z","updated_at":"2018-03-12T19:22:00.000000Z","created_by":null,"updated_by":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null},"abbreviation":"WOD","location_id":"1","createdby":null,"updatedby":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null}},{"id":15,"state_id":"6","name":"Ballarat","comment":"Ballarat","active":"1","created_at":"2017-03-22T16:20:11.000000Z","updated_at":"2018-03-12T19:21:42.000000Z","created_by":null,"updated_by":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null},"abbreviation":"BAL","location_id":"1","createdby":null,"updatedby":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null}},{"id":16,"state_id":"6","name":"Bendigo","comment":"Bendigo","active":"1","created_at":"2017-03-22T16:20:21.000000Z","updated_at":"2018-03-12T19:21:34.000000Z","created_by":null,"updated_by":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null},"abbreviation":"BEN","location_id":"1","createdby":null,"updatedby":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null}},{"id":17,"state_id":"6","name":"Craigieburn","comment":"Craigieburn","active":"1","created_at":"2017-03-22T16:20:31.000000Z","updated_at":"2017-06-14T19:55:13.000000Z","created_by":null,"updated_by":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null},"abbreviation":"CRB","location_id":"1","createdby":null,"updatedby":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null}},{"id":18,"state_id":"6","name":"Geelong","comment":"Geelong","active":"1","created_at":"2017-03-22T16:20:38.000000Z","updated_at":"2018-03-12T19:23:31.000000Z","created_by":null,"updated_by":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null},"abbreviation":"GEL","location_id":"1","createdby":null,"updatedby":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null}},{"id":19,"state_id":"6","name":"Shepparton","comment":"Shepparton","active":"1","created_at":"2017-03-22T16:20:48.000000Z","updated_at":"2017-06-20T12:06:38.000000Z","created_by":null,"updated_by":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null},"abbreviation":"SHP","location_id":"1","createdby":null,"updatedby":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null}},{"id":20,"state_id":"6","name":"Traralgon","comment":"Traralgon","active":"1","created_at":"2017-03-22T16:20:56.000000Z","updated_at":"2018-03-12T19:18:14.000000Z","created_by":null,"updated_by":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null},"abbreviation":"TRA","location_id":"1","createdby":null,"updatedby":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null}},{"id":21,"state_id":"6","name":"Warrnambool","comment":"Warrnambool","active":"1","created_at":"2017-03-22T16:21:12.000000Z",
    "updated_at":"2017-03-22T16:21:12.000000Z","created_by":null,"updated_by":null,"abbreviation":"WBL","location_id":"1","createdby":null,"updatedby":null},{"id":22,"state_id":"7","name":"Perth","comment":"Belmont","active":"1","created_at":"2017-03-22T16:21:30.000000Z","updated_at":"2018-03-12T19:21:22.000000Z","created_by":null,"updated_by":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null},"abbreviation":"PER","location_id":"8","createdby":null,"updatedby":{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null}}]
    console.log('getlocations-loc=',res)
    this.locationOptions(res);
                   // .catch((err)=>{ console.log('user-locations-err=', err.data) })
    },
    computed: {
      formTitle() {  if (this.dialogDelete) { return "Delete User";} 
                    else if (this.editedIndex === -1) { console.log('new--this.editindx',this.editedIndex);
                                        return "New User"; }
                    else if (this.editedIndex > -1) { console.log('edit--this.editindx',this.editedIndex);
                                return "Edit User";  
                                
                                }  
                  },
         ...mapState({  sawstatus:state => state.user.userlist}),
          ...mapGetters({authenticated:'auth/authenticated',
                          user:'auth/user'
                        }),
              loc(){

              }

     },
    watch: { dialog (val) { console.log('inside watch- dialog- val=',val)
                          val || this.close()  },    
        },
    methods: {    locationOptions(locations) 
                    {   console.log('fn locations=',locations);
                        let options = [];
                        for (let location in locations) 
                        {  options.push({ value: locations[location].id, label: locations[location].name,
                                          abbr: locations[location].abbreviation,
                                        });
                        }
                        this.locOptions = options;
                        console.log('this.locOptions=',this.locOptions);
                    },
                  passwordValidator() 
                  { return (this.editedItem.confirm_password === this.editedItem.password) || 
                      'Password not matching';                    
                  },
      reseteditedItem(){
        this.editedItem= { name: '', email: '', type:'',   password: '', confirm_password: '', mobile:'',location_id:'',locationid:''}
      },

      editItem (item) 
      { console.log('edit-item',item)
        this.dialogDelete = false;
        this.editedIndex = this.sawstatus.indexOf(item); console.log('editedIndex',this.editedIndex)
        this.editedItem = Object.assign({}, item); console.log('editedItem',this.editedItem)

        //var loc = this.locOptions.filter(function(v,i) { return v[0] === item.location_id;   });
        //var loc = this.locOptions.filter(item1 => item1.value.indexOf(item.location_id) > -1);
        var loc,locid;
        for( var i = 0, len = this.locOptions.length; i < len; i++ ) 
        {    if(this.locOptions[i].value == item.location_id) 
              {loc=this.locOptions[i].label; locid=i;    }
        }
         // console.log('loc-',loc,locid,item.location_id)
          //console.log('this.locoptions-',this.locOptions)
        if(locid !=null) //this is just to select the location on form dropdown
          //this.editedItem.location_id = Object.assign({label: this.locOptions[locid].value})
          this.editedItem.location_id = this.locOptions[locid].value;

        if(this.editedItem.mobile==1) this.editedItem.type="Admin";
        else if(this.editedItem.mobile==2) this.editedItem.type="Saw";
        else if(this.editedItem.mobile==3) this.editedItem.type="View";
        else if(this.editedItem.mobile==4) this.editedItem.type="Super";
      //  this.editedItem=item;
        console.log('editItem=',this.editedItem)
        this.dialog = true
        },
      save () 
      {  //console.log('save-item=',item);
        if (this.editedIndex > -1) //save clicked when editing
              {  console.log('save--edit1=',this.editedItem)
               //console.log('save--edit1-location_id.label=',this.editedItem.location_id.label)
                    //edit api here
                      if(this.editedItem.type=="Admin") this.editedItem.mobile=1;
                      else if(this.editedItem.type=="Saw") this.editedItem.mobile=2;
                      else if(this.editedItem.type=="View") this.editedItem.mobile=3;
                      else if(this.editedItem.type=="Super") this.editedItem.mobile=4;
                      //this.editedIem.locationid=this.editedItem.location_id.label;
                      console.log('save--edit2=',this.editedItem)
                      //return;
                    if (!this.$refs.userform.validate()) 
                    {   
                      console.log('edit-item- form validation wrong',this.editedItem)
                      return false; 
                    }
                    else
                    { console.log('edit-item- form ',this.editedItem)
                    this.$store.dispatch('edituser', this.editedItem) 
                    }
                } 
           //--------save clicked when adding new
        else {       //adduser api here
                      if(this.editedItem.type=="Admin") this.editedItem.mobile=1;
                      else if(this.editedItem.type=="Saw") this.editedItem.mobile=2;
                      else if(this.editedItem.type=="View") this.editedItem.mobile=3;
                      else if(this.editedItem.type=="Super") this.editedItem.mobile=4;
                      console.log('add-item',this.editedItem)
                     // return;
                     if (!this.$refs.userform.validate()) 
                    {   
                      console.log('add-item- form validation wrong',this.editedItem)
                       return false; 
                     }
                    else
                        this.$store.dispatch('adduser', this.editedItem) 
            }
            //this.reseteditedItem();
            this.close()
        },
        //--------------delete start----------------------------------------------------------
      deleteItem (item) {console.log('delete-pressed-item',item)
                        //const index = this.desserts.indexOf(item)
                        if(this.user.email==item.email)
                        { 
                          return false;
                        }
                        //return false;
                        this.dialogDelete = true;
                        this.editedIndex = this.sawstatus.indexOf(item);
                        this.editedItem = Object.assign({}, item);
                        this.dialog = true;
               //after this now press delete on dialogue box to execure below fn
              },
      remove() { console.log('remove---function- editedIndex', this.editedIndex)
                  // delete api here
                    this.$store.dispatch('deleteuser', this.editedItem) 
                      .then((response) => {})     .catch((error) => {});
                  this.close();
                },
      //-------------------------------delete finish-----------------
      //------------------close modal---------------------------
      close () {  this.dialog = false
                  setTimeout(() => {  this.editedItem = Object.assign({}, this.defaultItem)
                          this.editedIndex = -1, this.dialogDelete = false; }, 100)
              },
    
    },
  }
</script>