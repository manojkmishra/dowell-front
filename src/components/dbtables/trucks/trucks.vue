<template>
<div>
<div v-if="user.admin =='1'">
  <v-data-table  :headers="headers" :items="trucklist" :search="search" class="elevation-1" >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Trucks</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
                <v-text-field v-model="search" class="serc" append-icon="mdi-magnify" label="Search" single-line hide-details
                ></v-text-field>&nbsp;
        <!--------------modal------------------->
        <v-dialog v-model="dialog" max-width="500px" >
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark rounded class="ml-5 mr-5 mb-2" v-on="on">New Truck</v-btn>
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
                    <v-select single-line bottom label="Location" 
                      v-model="editedItem.location_id" :items="locOptions"   
                      item-text="label" item-value="value" 
                      :rules="[(v) => !!v || 'Location is required!']"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.description" label="Desc"></v-text-field>
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
                        
                        //{ text: "TYPE", align: "left", sortable: true, value: "mobile1" },
                        { text: "LOCATION", align: "left", sortable: true, value: "location_id" },
                        { text: "DESC", align: "left", sortable: true, value: "description" },
                       // { text: "TYPE", align: "left", sortable: true, value: "type" },
                       // { text: "CREATEDBY", align: "left", sortable: true, value: "created_by.name" },
                       // { text: "UPDATEDBY", align: "left", sortable: true, value: "updated_by" },
                       // { text: "UPDATEDAT", align: "left", sortable: true, value: "updated_at" },
                       // { text: "Actions", value: "action", sortable: false, width: "8%" },
                        { text: 'Actions', value: 'actions', sortable: false,width: "10%" },
      ],
      desserts: [],categories: [],
      editedItem: { name: '', email: '', type:'',   description: '',location_id:'',locationid:''},
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
                     axios.get(`${axios.defaults.baseURL}/saw/locations`)
               // this.$store.dispatch(`getsawschedules?page='+${e.page}`,{})
                    .then((res) => { console.log('user-locations',res.data)  
                                    this.locationOptions(res.data);
                                        })
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
         ...mapState({ user: state => state.auth.user,
            trucklist:state => state.saw.trucklist,
         
         }),
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

      editItem (item) //edit clicked--populate form with previous values
      { console.log('edit-item',item)
        this.dialogDelete = false;
        this.editedIndex = this.trucklist.indexOf(item); console.log('editedIndex',this.editedIndex)
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
                     
                      console.log('save--edit2=',this.editedItem)
                      //return;
                    if (!this.$refs.userform.validate()) 
                    {   
                      console.log('edit-item- form validation wrong',this.editedItem)
                      return false; 
                    }
                    else
                    { console.log('edit-item- form ',this.editedItem)
                    this.$store.dispatch('edittruck', this.editedItem) 
                    }
                } 
           //--------save clicked when adding new
        else {       //addtruck api here
                      console.log('add-item',this.editedItem)
                     // return;
                     if (!this.$refs.userform.validate()) 
                    {   
                      console.log('add-truck- form validation wrong',this.editedItem)
                       return false; 
                     }
                    else
                        this.$store.dispatch('addtruck', this.editedItem) 
            }
            //this.reseteditedItem();
            this.close()
        },
        //--------------delete start----------------------------------------------------------
      deleteItem (item) {console.log('delete-pressed-item',item)
                        //const index = this.desserts.indexOf(item)
                        
                        this.dialogDelete = true;
                        this.editedIndex = this.trucklist.indexOf(item); console.log('deleteindex',this.editedIndex)
        this.editedItem = Object.assign({}, item); console.log('editedItem',this.editedItem)
        /*var loc,locid;
        for( var i = 0, len = this.locOptions.length; i < len; i++ ) 
        {    if(this.locOptions[i].value == item.location_id) 
              {loc=this.locOptions[i].label; locid=i;    }
        }
        if(locid !=null)
          this.editedItem.location_id = this.locOptions[locid].value;*/
                        this.dialog = true;
               //after this now press delete on dialogue box to execure below fn
              },
      remove() { console.log('remove---function- editedIndex', this.editedIndex)
                  // delete api here
                    this.$store.dispatch('deletetruck', this.editedItem) 
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