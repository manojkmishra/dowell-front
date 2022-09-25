<template> 
    <div class="mt-3">
    <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        top
        color="deep-purple accent-4"
    ></v-progress-linear>
  <v-data-table :headers="headers" :items="aa.data"   class="elevation-1"  dense
       :footer-props="{showFirstLastPage: true, itemsPerPageOptions: [10,20,40] ,
       'show-current-page':true,}"   
       @pagination="paginate1" 
       :server-items-length="aa.total"
       :items-per-page=20 
       :search="search">
 <template v-slot:top >
        <v-toolbar flat color="blue darken-4" dense dark>
          <v-toolbar-title>SCHEDULED JOBS </v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
                    <v-menu max-width="290">
                      <template v-slot:activator="{ on }">
                            <v-text-field :value="formattedDate" label="Cut Date" class="mx-2"
                            append-icon="mdi-calendar-range" v-on="on" single-line hide-details></v-text-field>
                      </template>
                      <v-date-picker v-model="due"></v-date-picker>
                    </v-menu>
                  <v-btn v-if="user.admin =='1' || user.admin =='3'" id="btn-cutselected" small  color="amber darken-4" 
                    rounded dark  :loading="pushloading" @click.prevent="pushjobs" >PUSH</v-btn>
                    <!--above push, below filter--------->
                    <v-divider class="mx-4" inset vertical ></v-divider>
                    <v-menu max-width="290">
                      <template v-slot:activator="{ on }">
                            <v-text-field :value="formattedDate1" label="Filter Cut Date" class="mx-2"
                            append-icon="mdi-calendar-range" v-on="on" single-line hide-details></v-text-field>
                      </template>
                      <v-date-picker v-model="due1"></v-date-picker>
                    </v-menu>
                  <v-btn v-if="user.admin =='1' || user.admin =='3'" id="btn-cutselected" small  color="green darken-1" 
                    rounded dark  :loading="filterloading" @click.prevent="filterjobs" >Filter</v-btn>
          <v-spacer></v-spacer>
          <v-divider class="mx-4" inset vertical ></v-divider>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search"
                              @input="searchit" single-line hide-details></v-text-field>
        </v-toolbar>
    </template>
    <template v-slot:item.updatedat="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <span>{{moment(item.updated_at).format('DD-MM-YYYY, HH:mm')}}</span>
    </template>
    <template v-slot:item.cutday="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <span>{{moment(item.cut_date).format('DD-MM-YYYY')}}</span>
    </template>
    <template v-slot:item.tim="{ item }">
      {{ ~~(item.cut_time / 60) + ":" + (item.cut_time % 60 < 10 ? "0" : "") + item.cut_time % 60 }}
    </template>
<!---------------truck------------->
    
         <!----popup---------------->    
 <template v-slot:item.actiont="{ item }" >

             <v-btn v-if="item.truck_no=='T0'"  id="flag-btn" ripple small color="grey" dense rounded dark  
             @click="opentrucks(item)">{{item.truck_no}}</v-btn>
             <v-btn v-else  id="flag-btn" ripple small color="primary" dense rounded dark  
             @click="opentrucks(item)">{{item.truck_no}}</v-btn>

</template>

<!----------------dialog for truck finished----------------------------------->
    <!---=============status===========--------------->
   
    <template v-slot:item.action="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
    <!------------------->
 <v-tooltip bottom :disabled="item.comments==null">
   <template v-slot:activator="{ on }">
      <v-btn v-on="on"  ripple x-small v-if="item.status_id =='9'"  color="red accent-2" rounded dark :loading="loading"  @click.prevent="scrap(item)" >
         InPrg
        <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
            <span v-if="aa.id==item.review">  <!-- {{aa.id}} -->
              <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
            </span>
        </span>
      </v-btn>

       <!----------------->
       <v-btn v-on="on"  ripple x-small v-else-if="item.status_id =='12'"  color="teal" rounded dark :loading="loading"  @click.prevent="scrap(item)" >
         Cmplt
        <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
            <span v-if="aa.id==item.review">  <!-- {{aa.id}} -->
              <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
            </span>
        </span>
      </v-btn>
       <!----------------->
       
        <v-btn v-on="on"  ripple x-small v-else color="light-blue darken-1" rounded dark :loading="loading"   @click.prevent="scrap(item)" >
          Qud
          <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
              <span v-if="aa.id==item.review">  <!-- {{aa.id}} -->
                <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
              </span>
          </span>
        </v-btn>
      </template>
      <span v-if="item.comments !=null">{{item.comments}}</span>
      <span :disabled="item.comments ==null" ></span>
    </v-tooltip>
    </template>

    <!---===============status finish=========----->
  <!-- <template v-slot:item.flag="{ item }">
      <span v-for="aa in sawflags" :key="aa.id">
        <span v-if="aa.id==item.review">  
        <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
       </span>
      </span>
    </template>   
  -->
    <template slot="no-data">
      <div></div>
    </template>
  </v-data-table>
  <v-dialog v-model="truckdialog" persistent max-width="500px">
       <v-card>
            <v-card-title><span class="headline" >TRUCKS </span></v-card-title>
            <v-card-text class="text-center">
              <v-container>
                <div v-for="(stateNode,index) in trucklist1" class="text-center">
                  <template>
                  <v-btn block rounded class="mx-2 mb-2 pl-20 pr-20"  dark @click="changetruck(stateNode)" >
                            {{ stateNode.name }}
                  </v-btn>                   
                  </template>
                </div>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
                  <v-btn color="blue darken-1" text @click="closetrucks">Cancel</v-btn>
            </v-card-actions>
          </v-card>
    </v-dialog>  
    <!----push confirmation----->
        <v-dialog  v-model="pushconfirmdialog"   max-width="350">
      <v-card class="text-center">
        <v-card-title class="text-h5"> Are you sure to push these Jobs</v-card-title>
      
        <v-card-text class="text-h5"> Cut Date:  {{this.due}} </v-card-text>
        <v-card-text class="text-h5"> Jobs already in SawScreens for this date:  {{totaljobsconfirm}} </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  color="red darken-1" :loading="pushconfirmloading" text @click="dontpushjobs()"> Disagree </v-btn>
          <v-btn  color="green darken-1" :loading="pushconfirmloading"  text @click="yespush()">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapState, mapActions} from 'vuex';
import axios from "axios";
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
export default
{      computed:{  ...mapState({ 
                        joblist:state =>state.saw.joblist,
                       // selectedSaw: state => state.saw.selectedSaw,
                        user: state => state.auth.user,
                        sawflags:state => state.saw.sawflags,
                        trucklist:state => state.saw.trucklist,
            }),
            trucklist1(){console.log('user-',this.user,'trucks-',this.trucklist)
             let bb= this.trucklist.filter( x => (x.location_id ==this.user.location_id)  );

            return bb;
        },
        formattedDate(){return this.due ? format(parseISO(this.due),'yyyy-MM-dd') : ''},
        formattedDate1(){return this.due1 ? format(parseISO(this.due1),'yyyy-MM-dd') : ''}
      },
  props:{bb:Array},
  data() { return {truckdialog: false, truckjob:null,pushconfirmdialog:false,pushconfirmloading:false,
  search: '',aa:[],loading:false,pushloading:false,due:'',due1:'',filterloading:false,//paginate1: {},
  totaljobsconfirm:0,
          headers: [
              { text: 'LOC', align: 'left', value: 'schedule_locatn',width:"1%" },
            //  { text: 'created_by', align: 'left',  value: 'created_by.name'},
             // { text: 'updated_at', align: 'left',  value: 'updated_at',width:"1%"},
              { text: 'updated_at', align: 'left',  value: 'updatedat',width:"1%"},
              { text: 'updatedby', align: 'left',  value: 'updated_by.name',width:"1%"},
              //{ text: 'cut_date', align: 'left',  value: 'cut_date',width:"1%"},
              { text: 'cut_date', align: 'left',  value: 'cutday',width:"2%"},
              { text: 'quote_ID', value: 'quote_ID',sortable: false,width:"1%" },
              { text: 'order_ID', value: 'order_ID' ,sortable: false,width:"1%"},
              //{ text: 'truck_no', value: 'truck_no' ,sortable: false,width:"1%"},
              { text: 'truck_no', value: 'actiont' ,sortable: false,width:"1%"},
              { text: 'Color', align: 'left',  value: 'cut_color',width:"1%"},
              { text: 'Customer', align: 'left',  value: 'cust_name',width:"2%"},
              
             // { text: 'cut_time', align: 'left',  value: 'cut_time'},
              { text: 'schedule_saw', align: 'left',  value: 'schedule_saw',width:"1%"},
              { text: 'cut_saw', align: 'left',  value: 'cut_saw',width:"1%"},
              
             // { text: 'Time (Min)', value: 'cut_time',sortable: false,width:"1%" },
              { text: 'Time (Min)', value: 'tim',sortable: false,width:"1%" },
              //{ text: 'Status', value: 'status_id', sortable: false },
              { text: 'Status', value: 'action', sortable: false,width:"1%" },
              //{ text: 'Flag', value: 'flag', sortable: false,width:"1%" },
              //{ text: 'Flag', value: 'review', sortable: false ,width:"1%"},
            ],
            formSearchData: {  SawCode: '',  QuoteID: '',  order_ID:'', selected1:[], cut_saw:'' ,'selerr':false }, 
             }
          },
      created(){  //this.paginate();
        },
        methods:{ 
       changetruck(x)
        {  console.log('truck selected',x,'truckjob=',this.truckjob);
 //-----------view only user-------
                if(this.user.admin =='3')
                            {  this.printdialog=false; this.close()
                              swal.fire({ position: 'top-right',
                                                title:'<span style="color:white">Access denied: View only user</span>',
                                                timer: 2000, toast: true, background: 'red',
                                                });
                                                
                              return;
                            }
//------------------------------
            this.formSearchData.truck_id = x.id;
            this.formSearchData.truck_name = x.name;
            this.formSearchData.job_id = this.truckjob.id;
            //this.loadingtruck=true;
            console.log('formSearchData=',this.formSearchData);
                        this.$store.dispatch('changetruck', this.formSearchData)
                 .then((response) => {  console.log('changetruck',response.data); 
                 //window.location.reload(); //not working here
                 //this.loadingtruck=false;
                    })
                    .catch((error) => {//this.loadingprint=false;
                    });
                this.truckdialog=false;
                this.truckjob=null;
                let e1={page:1,itemsPerPage:20,page:1,pageCount:0,pageStart:0,pageStop:0}
                      this.paginate1(e1)
                //window.location.reload(); 
                //this.formattedDate=
        },
          opentrucks(item){
            console.log('trucks-item=',item)
            this.truckdialog=true;
            this.truckjob=item;
          },
          closetrucks(){           
            this.truckdialog=false;
            this.truckjob=null;
             console.log('close truck-item=',this.truckjob)
          },
          pushjobs()
          { this.due1=''
            if(this.due!="")
            { //---------------check if jobs exists---------------------------
              this.pushconfirmdialog=true; this.pushconfirmloading=true;
              this.totaljobsconfirm=0;
              axios.get(`${axios.defaults.baseURL}/saw/searchsawschedules?search=${this.due},1`,{params:{'per_page':20}} )
                    .then((res) => { console.log('sawsc search res>3 =',res.data.response)  
                                      this.aa=res.data.response; this.pushconfirmloading=false; 
                                      this.totaljobsconfirm=res.data.response.total;
                                      })
                    .catch(err=>{ console.log('sawsc search err=', err); this.pushconfirmloading=false;  })
 //----------------------------------------------
              
            }
            else{
               swal.fire({ position: 'top-right',
                            title:'<span style="color:white">Please select the date</span>',
                            timer: 2000, toast: true, background: 'red',
                          });
                          //this.pushloading=false;
            }
            //this.due=''
          },
          dontpushjobs(){
            this.pushconfirmdialog=false;
this.due=''
          },
          yespush()
              {
                this.pushconfirmdialog = false
              this.pushloading=true;this.totaljobsconfirm=0;
              console.log('date=',this.due)
              axios.post(`${axios.defaults.baseURL}/saw/pushjobs`,{dat:this.due})
              .then(res=>{
                    console.log('push-res',res)
                    console.log('push-res flag',res.data[0].Flag)
                    console.log('push-res message',res.data[0].Message)
                    swal.fire({ position: 'top-right',
                                title:'<span style="color:white">'+ `${res.data[0].Flag}:${res.data[0].Message}`+'</span>',
                                timer: 3000, toast: true, background: 'green',
                             
                              });

                      this.pushloading=false; this.due=''
                  }).catch(err=>{this.pushloading=false;  this.due=''
                  })
              },
          //--------------------------
          filterjobs()
          { this.due=''
            if(this.due1!="")
            {this.filterloading=true;
              console.log('filter date=',this.due1)
              let aa=[this.due1, "true"]
              //this.due1.cutdate=1;
              axios.get(`${axios.defaults.baseURL}/saw/searchsawschedules?search=${this.due1},1`,{params:{'per_page':20}} )
                    .then((res) => { console.log('sawsc search res>3 =',res.data.response)  
                                      this.aa=res.data.response; this.filterloading=false;  })
                    .catch(err=>{ console.log('sawsc search err=', err); this.filterloading=false;  })
             
            }
            else{
               swal.fire({ position: 'top-right',
                            title:'<span style="color:white">Please select the date</span>',
                            timer: 2000, toast: true, background: 'red',
                          });
                          this.filterloading=false;
            }
            //this.due1=''
          },
          paginate1(e){
              console.log('paginate-$event',e); this.loading=true;
            //axios.get(`http://127.0.0.1:8000/api/saw/getsawschedules?page='+${e.page}`,{})
            if(this.search =='')
                { console.log('paginate-not search-e',e)
                /*axios.get(`${axios.defaults.baseURL}/saw/getsawschedules?page=${e.page}`,
                {params:{'per_page':e.itemsPerPage}})
                  // this.$store.dispatch(`getsawschedules?page='+${e.page}`,{})
                        .then((res) => { console.log('getschedules response',res.data.response.data)  
                                          this.aa=res.data.response; this.loading=false;  })
                        .catch(err=>{ console.log('paginate-err=', err) ; this.loading=false; })
                  */
                        //------------------------mock-------
                        this.aa={"current_page":1,"data":[{"id":121587,"created_at":"2022-09-05T20:57:11.000000Z","updated_at":"2022-09-05T20:57:11.000000Z","created_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"updated_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"active":"1","quote_ID":"515569","quote_vers":"2","order_ID":"SMT-A97853-01-V2","truck_no":"T0","schedule_pom":"SMT","schedule_locatn":"SMT","schedule_saw":"NoSaw_SMT","cut_seq":"8","cut_date":"2022-09-05 00:00:00.000","prep_time":"140.00","cut_time":"760.00","cut_color":"PCPWH","cut_saw":null,"status_id":"0","comments":null,"review":"0","cust_code":"200130","cust_name":"Newlet Constructions"},{"id":121327,"created_at":"2022-08-31T22:35:50.000000Z","updated_at":"2022-08-31T22:35:50.000000Z","created_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"updated_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"active":"1","quote_ID":"499572","quote_vers":"8","order_ID":"SMT-A97593-00-V8","truck_no":"T0","schedule_pom":"SMT","schedule_locatn":"SMT","schedule_saw":"DSW_Saw","cut_seq":"2","cut_date":"2022-09-02 00:00:00.000","prep_time":"260.00","cut_time":"1050.00","cut_color":"PCBFM","cut_saw":null,"status_id":"0","comments":null,"review":"0","cust_code":"200440","cust_name":"Designer Living Homes (NSW) Pty Ltd"},{"id":121328,"created_at":"2022-08-31T22:35:50.000000Z","updated_at":"2022-08-31T22:35:50.000000Z","created_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"updated_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"active":"1","quote_ID":"499572","quote_vers":"8","order_ID":"SMT-A97593-00-V8","truck_no":"T0","schedule_pom":"SMT","schedule_locatn":"SMT","schedule_saw":"EA_Frame_Saw","cut_seq":"2","cut_date":"2022-09-02 00:00:00.000","prep_time":"160.00","cut_time":"530.00","cut_color":"PCBFM","cut_saw":null,"status_id":"0","comments":null,"review":"0","cust_code":"200440","cust_name":"Designer Living Homes (NSW) Pty Ltd"},{"id":121329,"created_at":"2022-08-31T22:35:50.000000Z","updated_at":"2022-08-31T22:35:50.000000Z","created_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"updated_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"active":"1","quote_ID":"499572","quote_vers":"8","order_ID":"SMT-A97593-00-V8","truck_no":"T0","schedule_pom":"SMT","schedule_locatn":"SMT","schedule_saw":"EA_Sash_Saw","cut_seq":"2","cut_date":"2022-09-02 00:00:00.000","prep_time":"60.00","cut_time":"280.00","cut_color":"PCBFM","cut_saw":null,"status_id":"0","comments":null,"review":"0","cust_code":"200440","cust_name":"Designer Living Homes (NSW) Pty Ltd"},{"id":121330,"created_at":"2022-08-31T22:35:50.000000Z","updated_at":"2022-08-31T22:35:50.000000Z","created_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"updated_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"active":"1","quote_ID":"499572","quote_vers":"8","order_ID":"SMT-A97593-00-V8","truck_no":"T0","schedule_pom":"SMT","schedule_locatn":"SMT","schedule_saw":"NoSaw_SMT","cut_seq":"2","cut_date":"2022-09-02 00:00:00.000","prep_time":"220.00","cut_time":"650.00","cut_color":"REVEAL","cut_saw":null,"status_id":"0","comments":null,"review":"0","cust_code":"200440","cust_name":"Designer Living Homes (NSW) Pty Ltd"},{"id":121331,"created_at":"2022-08-31T22:35:50.000000Z","updated_at":"2022-08-31T22:35:50.000000Z","created_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"updated_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"active":"1","quote_ID":"499572","quote_vers":"8","order_ID":"SMT-A97593-00-V8","truck_no":"T0","schedule_pom":"SMT","schedule_locatn":"SMT","schedule_saw":"Sliding_Doors_Saw","cut_seq":"2","cut_date":"2022-09-02 00:00:00.000","prep_time":"190.00","cut_time":"420.00","cut_color":"PCBFM","cut_saw":null,"status_id":"0","comments":null,"review":"0","cust_code":"200440","cust_name":"Designer Living Homes (NSW) Pty Ltd"},{"id":121332,"created_at":"2022-08-31T22:35:50.000000Z","updated_at":"2022-08-31T22:35:50.000000Z","created_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"updated_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"active":"1","quote_ID":"513225","quote_vers":"4","order_ID":"SMT-A97732-00-V4","truck_no":"T0","schedule_pom":"SMT","schedule_locatn":"SMT","schedule_saw":"DSW_Saw","cut_seq":"6","cut_date":"2022-09-02 00:00:00.000","prep_time":"170.00","cut_time":"630.00","cut_color":"PCXXX (PRIMROSE GLOSS - 27284365)","cut_saw":null,"status_id":"0","comments":null,"review":"0","cust_code":"200420","cust_name":"In House Granny Flat"},{"id":121333,"created_at":"2022-08-31T22:35:50.000000Z","updated_at":"2022-08-31T22:35:50.000000Z","created_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"updated_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"active":"1","quote_ID":"513225","quote_vers":"4","order_ID":"SMT-A97732-00-V4","truck_no":"T0","schedule_pom":"SMT","schedule_locatn":"SMT","schedule_saw":"NoSaw_SMT","cut_seq":"6","cut_date":"2022-09-02 00:00:00.000","prep_time":"90.00","cut_time":"310.00","cut_color":"REVEAL","cut_saw":null,"status_id":"0","comments":null,"review":"0","cust_code":"200420","cust_name":"In House Granny Flat"},{"id":121334,"created_at":"2022-08-31T22:35:50.000000Z","updated_at":"2022-08-31T22:35:50.000000Z","created_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"updated_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"active":"1","quote_ID":"513225","quote_vers":"4","order_ID":"SMT-A97732-00-V4","truck_no":"T0","schedule_pom":"SMT","schedule_locatn":"SMT","schedule_saw":"Sliding_Doors_Saw","cut_seq":"6","cut_date":"2022-09-02 00:00:00.000","prep_time":"90.00","cut_time":"140.00",
                        "cut_color":"PCXXX (PRIMROSE GLOSS - 27284365)","cut_saw":null,"status_id":"0","comments":null,"review":"0","cust_code":"200420","cust_name":"In House Granny Flat"},{"id":121335,"created_at":"2022-08-31T22:35:50.000000Z","updated_at":"2022-08-31T22:35:50.000000Z","created_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"updated_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"active":"1","quote_ID":"492170","quote_vers":"12","order_ID":"SMT-A97778-00-V12","truck_no":"T0","schedule_pom":"SMT","schedule_locatn":"SMT","schedule_saw":"NoSaw_SMT","cut_seq":"7","cut_date":"2022-09-02 00:00:00.000","prep_time":".00","cut_time":".00","cut_color":"PCPWH","cut_saw":null,"status_id":"0","comments":null,"review":"0","cust_code":"200049","cust_name":"Cash Sales NSW"},{"id":121336,"created_at":"2022-08-31T22:35:50.000000Z","updated_at":"2022-08-31T22:35:50.000000Z","created_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"updated_by":{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"active":"1","quote_ID":"492170","quote_vers":"12","order_ID":"SMT-A97778-00-V12","truck_no":"T0","schedule_pom":"SMT","schedule_locatn":"SMT","schedule_saw":"Sliding_Doors_Saw","cut_seq":"7","cut_date":"2022-09-02 00:00:00.000","prep_time":"190.00","cut_time":"600.00","cut_color":"PCPWH","cut_saw":null,"status_id":"0","comments":null,"review":"0","cust_code":"200049","cust_name":"Cash Sales NSW"},{"id":121309,"created_at":"2022-08-31T22:02:15.000000Z","updated_at":"2022-08-31T22:02:15.000000Z","created_by":{"id":46,"name":"Mark Greenwood","email":"mark.greenwood@dowell.com.au","active":"1","created_at":"2018-08-29T03:31:02.000000Z","updated_at":"2022-08-04T10:09:36.217000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"updated_by":{"id":46,"name":"Mark Greenwood","email":"mark.greenwood@dowell.com.au","active":"1","created_at":"2018-08-29T03:31:02.000000Z","updated_at":"2022-08-04T10:09:36.217000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"active":"1","quote_ID":"508687","quote_vers":"5","order_ID":"SMT-A97850-02-V5","truck_no":"T0","schedule_pom":"SMT","schedule_locatn":"SMT","schedule_saw":"NoSaw_SMT","cut_seq":"5","cut_date":"2022-09-01 00:00:00.000","prep_time":"20.00","cut_time":"30.00","cut_color":"REVEAL","cut_saw":null,"status_id":"0","comments":null,"review":"0","cust_code":"200218","cust_name":"New South Homes"},{"id":121310,"created_at":"2022-08-31T22:02:15.000000Z","updated_at":"2022-08-31T22:02:15.000000Z","created_by":{"id":46,"name":"Mark Greenwood","email":"mark.greenwood@dowell.com.au","active":"1","created_at":"2018-08-29T03:31:02.000000Z","updated_at":"2022-08-04T10:09:36.217000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"updated_by":{"id":46,"name":"Mark Greenwood","email":"mark.greenwood@dowell.com.au","active":"1","created_at":"2018-08-29T03:31:02.000000Z","updated_at":"2022-08-04T10:09:36.217000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"active":"1","quote_ID":"508687","quote_vers":"5","order_ID":"SMT-A97850-02-V5","truck_no":"T0","schedule_pom":"SMT","schedule_locatn":"SMT","schedule_saw":"Sliding_Doors_Saw","cut_seq":"5","cut_date":"2022-09-01 00:00:00.000","prep_time":"120.00","cut_time":"190.00","cut_color":"PCMNM","cut_saw":null,"status_id":"0","comments":null,"review":"0","cust_code":"200218","cust_name":"New South Homes"},{"id":121311,"created_at":"2022-08-31T22:02:15.000000Z","updated_at":"2022-08-31T22:02:15.000000Z","created_by":{"id":46,"name":"Mark Greenwood","email":"mark.greenwood@dowell.com.au","active":"1","created_at":"2018-08-29T03:31:02.000000Z","updated_at":"2022-08-04T10:09:36.217000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"updated_by":{"id":46,"name":"Mark Greenwood","email":"mark.greenwood@dowell.com.au","active":"1","created_at":"2018-08-29T03:31:02.000000Z","updated_at":"2022-08-04T10:09:36.217000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"active":"1","quote_ID":"514188","quote_vers":"6","order_ID":"SMT-A97857-00-V6","truck_no":"T0","schedule_pom":"SMT","schedule_locatn":"SMT","schedule_saw":"DSW_Saw","cut_seq":"6","cut_date":"2022-09-01 00:00:00.000","prep_time":"150.00","cut_time":"450.00","cut_color":"PCBFM","cut_saw":null,"status_id":"0","comments":null,"review":"0","cust_code":"200420","cust_name":"In House Granny Flat"},{"id":121312,"created_at":"2022-08-31T22:02:15.000000Z","updated_at":"2022-08-31T22:02:15.000000Z","created_by":{"id":46,"name":"Mark Greenwood","email":"mark.greenwood@dowell.com.au","active":"1","created_at":"2018-08-29T03:31:02.000000Z","updated_at":"2022-08-04T10:09:36.217000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"updated_by":{"id":46,"name":"Mark Greenwood","email":"mark.greenwood@dowell.com.au","active":"1","created_at":"2018-08-29T03:31:02.000000Z","updated_at":"2022-08-04T10:09:36.217000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"active":"1","quote_ID":"514188","quote_vers":"6","order_ID":"SMT-A97857-00-V6","truck_no":"T0","schedule_pom":"SMT","schedule_locatn":"SMT","schedule_saw":"NoSaw_SMT","cut_seq":"6","cut_date":"2022-09-01 00:00:00.000","prep_time":"60.00","cut_time":"230.00","cut_color":"REVEAL","cut_saw":null,"status_id":"0","comments":null,"review":"0","cust_code":"200420","cust_name":"In House Granny Flat"},{"id":121313,"created_at":"2022-08-31T22:02:15.000000Z","updated_at":"2022-08-31T22:02:15.000000Z","created_by":{"id":46,"name":"Mark Greenwood","email":"mark.greenwood@dowell.com.au","active":"1","created_at":"2018-08-29T03:31:02.000000Z","updated_at":"2022-08-04T10:09:36.217000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"updated_by":{"id":46,"name":"Mark Greenwood","email":"mark.greenwood@dowell.com.au","active":"1","created_at":"2018-08-29T03:31:02.000000Z","updated_at":"2022-08-04T10:09:36.217000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"active":"1","quote_ID":"514188","quote_vers":"6","order_ID":"SMT-A97857-00-V6","truck_no":"T0","schedule_pom":"SMT","schedule_locatn":"SMT","schedule_saw":"Sliding_Doors_Saw","cut_seq":"6","cut_date":"2022-09-01 00:00:00.000","prep_time":"90.00","cut_time":"140.00","cut_color":"PCBFM","cut_saw":null,"status_id":"0","comments":null,"review":"0","cust_code":"200420","cust_name":"In House Granny Flat"},{"id":121314,"created_at":"2022-08-31T22:02:15.000000Z","updated_at":"2022-08-31T22:02:15.000000Z","created_by":{"id":46,"name":"Mark Greenwood","email":"mark.greenwood@dowell.com.au","active":"1","created_at":"2018-08-29T03:31:02.000000Z","updated_at":"2022-08-04T10:09:36.217000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"updated_by":{"id":46,"name":"Mark Greenwood","email":"mark.greenwood@dowell.com.au","active":"1","created_at":"2018-08-29T03:31:02.000000Z","updated_at":"2022-08-04T10:09:36.217000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"active":"1","quote_ID":"514198","quote_vers":"6","order_ID":"SMT-A97859-00-V6","truck_no":"T0","schedule_pom":"SMT","schedule_locatn":"SMT","schedule_saw":"DSW_Saw","cut_seq":"7","cut_date":"2022-09-01 00:00:00.000","prep_time":"120.00","cut_time":"450.00","cut_color":"PCBFM","cut_saw":null,"status_id":"0","comments":null,"review":"0","cust_code":"200420","cust_name":"In House Granny Flat"},{"id":121315,"created_at":"2022-08-31T22:02:15.000000Z","updated_at":"2022-08-31T22:02:15.000000Z","created_by":{"id":46,"name":"Mark Greenwood","email":"mark.greenwood@dowell.com.au","active":"1","created_at":"2018-08-29T03:31:02.000000Z","updated_at":"2022-08-04T10:09:36.217000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"updated_by":{"id":46,"name":"Mark Greenwood","email":"mark.greenwood@dowell.com.au","active":"1","created_at":"2018-08-29T03:31:02.000000Z","updated_at":"2022-08-04T10:09:36.217000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"active":"1","quote_ID":"514198","quote_vers":"6","order_ID":"SMT-A97859-00-V6","truck_no":"T0","schedule_pom":"SMT","schedule_locatn":"SMT","schedule_saw":"NoSaw_SMT","cut_seq":"7",
                        "cut_date":"2022-09-01 00:00:00.000","prep_time":"60.00","cut_time":"230.00","cut_color":"REVEAL","cut_saw":null,"status_id":"0","comments":null,"review":"0","cust_code":"200420","cust_name":"In House Granny Flat"},{"id":121316,"created_at":"2022-08-31T22:02:15.000000Z","updated_at":"2022-08-31T22:02:15.000000Z","created_by":{"id":46,"name":"Mark Greenwood","email":"mark.greenwood@dowell.com.au","active":"1","created_at":"2018-08-29T03:31:02.000000Z","updated_at":"2022-08-04T10:09:36.217000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"updated_by":{"id":46,"name":"Mark Greenwood","email":"mark.greenwood@dowell.com.au","active":"1","created_at":"2018-08-29T03:31:02.000000Z","updated_at":"2022-08-04T10:09:36.217000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"active":"1","quote_ID":"514198","quote_vers":"6","order_ID":"SMT-A97859-00-V6","truck_no":"T0","schedule_pom":"SMT","schedule_locatn":"SMT","schedule_saw":"Sliding_Doors_Saw","cut_seq":"7","cut_date":"2022-09-01 00:00:00.000","prep_time":"90.00","cut_time":"140.00","cut_color":"PCBFM","cut_saw":null,"status_id":"0","comments":null,"review":"0","cust_code":"200420","cust_name":"In House Granny Flat"},{"id":121306,"created_at":"2022-08-31T21:59:41.000000Z","updated_at":"2022-08-31T21:59:41.000000Z","created_by":{"id":46,"name":"Mark Greenwood","email":"mark.greenwood@dowell.com.au","active":"1","created_at":"2018-08-29T03:31:02.000000Z","updated_at":"2022-08-04T10:09:36.217000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"updated_by":{"id":46,"name":"Mark Greenwood","email":"mark.greenwood@dowell.com.au","active":"1","created_at":"2018-08-29T03:31:02.000000Z","updated_at":"2022-08-04T10:09:36.217000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},"active":"1","quote_ID":"489639","quote_vers":"7","order_ID":"NEW-A97047-00-V7","truck_no":"T0","schedule_pom":"SMT","schedule_locatn":"SMT","schedule_saw":"DSW_Saw","cut_seq":"2","cut_date":"2022-09-01 00:00:00.000","prep_time":"390.00","cut_time":"1530.00","cut_color":"CBDUN","cut_saw":null,"status_id":"0","comments":null,"review":"0","cust_code":"200084","cust_name":"Andjoy Homes Pty Ltd"}],"first_page_url":"http:\/\/api.test.dowellscreen.dowell.com.au\/api\/saw\/getsawschedules?page=1","from":1,"last_page":139,"last_page_url":"http:\/\/api.test.dowellscreen.dowell.com.au\/api\/saw\/getsawschedules?page=139","next_page_url":"http:\/\/api.test.dowellscreen.dowell.com.au\/api\/saw\/getsawschedules?page=2","path":"http:\/\/api.test.dowellscreen.dowell.com.au\/api\/saw\/getsawschedules","per_page":"20","prev_page_url":null,"to":20,"total":2771}
                   console.log('sawscedules mock-this.aa.data=',this.aa.data)
                   console.log('sawscedules mock-this.aa=',this.aa)
                   this.loading=false;
                }
              else{
                //this.searchit(e)
                this.due=''; this.due1='';
                console.log('paginate-search-e=',e)
                console.log('paginate-search=',this.search)
              //--------------
                  let x=this.search;
                  if(x.length>3){ this.loading=true;
                  console.log('paginate-search-e-len',x)
                    axios.get(`${axios.defaults.baseURL}/saw/searchsawschedules?search=${x},0`,{params:{'per_page':20, 'page':e.page}} )
                        .then((res) => { console.log('sawsc search res>3 =',res.data.response)  
                                          this.aa=res.data.response; this.loading=false;  })
                        .catch(err=>{ console.log('sawsc search err=', err); this.loading=false;  })
                    }
                  if(x.length<=0){ this.loading=true;
                  console.log('searchlen=0, e=',x)
                    axios.get(`${axios.defaults.baseURL}/saw/getsawschedules?page=1`,
                {params:{'per_page':20}} )
                        .then((res) => { console.log('sawsc search res less<=0 =',res.data.response)  
                                          this.aa=res.data.response; this.loading=false;  })
                        .catch(err=>{ console.log('sawsc search err=', err) ; this.loading=false; })
                  }
              //-----------------
              }
            },
            searchit(e){ this.search=e;
              console.log('search=',e)
              if(e.length>3){ this.loading=true;
                 axios.get(`${axios.defaults.baseURL}/saw/searchsawschedules?search=${e},0`,{params:{'per_page':20}} )
                    .then((res) => { console.log('sawsc search res>3 =',res.data.response)  
                                      this.aa=res.data.response; this.loading=false;  })
                    .catch(err=>{ console.log('sawsc search err=', err); this.loading=false;  })
                }
              if(e.length<=0){ this.loading=true;
              console.log('searchlen=0, e=',e)
                 axios.get(`${axios.defaults.baseURL}/saw/getsawschedules?page=1`,
             {params:{'per_page':20}} )
                    .then((res) => { console.log('sawsc search res less<=0 =',res.data.response)  
                                      this.aa=res.data.response; this.loading=false;  })
                    .catch(err=>{ console.log('sawsc search err=', err) ; this.loading=false; })

              }
            },
        scrap(data) 
                {   console.log('sawsch-scrap-data-=',data);
            if(data.cut_saw !=null)    
            this.formSearchData.SawCode = data.cut_saw;
            else{
              this.formSearchData.SawCode = data.schedule_saw;

            }
            this.formSearchData.QuoteID = data.quote_ID;
            console.log('ssscrap--formSearchData=',this.formSearchData);
            this.loading=true;
            this.$store.dispatch('getcutlist', this.formSearchData)
                .then((response) => { console.log('jobdetails--- cutlist',response.data); 
                this.loading=false; 
                    this.$router.push({  name: 'sscutlist',params: {data: data }   });
                })
                .catch((error) => {this.loading=false;});
          },
        selectjob(data)
          {    console.log('chstatus-',data.Status);
              console.log('this.user.admin-',this.user.admin);
              
              if(data.Status !="Queued" || this.user.admin =='1')
               {
                  this.loading=true;
               if(data.cut_saw==null)
                      { this.formSearchData.status=data.Status_id;
                        this.formSearchData.id = data.id;
                        this.formSearchData.order_ID = data.Order_Number;
                        this.$store.dispatch('updateJobList', this.formSearchData)
                        //this.loading=false;
                      }
               this.formSearchData.SawCode = data.cut_saw;
               this.formSearchData.QuoteID = data.quote_ID;
               
               this.$store.dispatch('selectedJob', data);
               this.$store.dispatch('getjobdetails', this.formSearchData)
                      .then((res) => 
                          { this.loading=false;
                            this.$router.push({  name: 'jobdetails'      });
                          })
                      .catch((error) => {console.log('jobdetails--- error',error); });
                 }
             else{
                 swal.fire({ position: 'top-right',
                        title:'<span style="color:white">Queued Jobs can not be selected</span>',
                            timer: 2000, toast: true,background: 'purple',
                            });
                        return;
                  } 
           },
        },
        watch: {
  pagination: { 
    handler () {console.log('watch tirgger')
      paginate1()
        .then((res) => { console.log('watch response',res.data.response.data)  
                                      this.aa=res.data.response; this.loading=false;  })
                    .catch(err=>{ console.log('watch paginate-err=', err) ; this.loading=false; })
    },
    deep: true
  }
},
}
</script>

<style scoped>
.disable-events {
  pointer-events: none
}
.v-tooltip__content {
 

}
</style>