<template> 
    <div class="mt-3">
    <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        top
        color="deep-purple accent-4"
    ></v-progress-linear>
  <v-data-table :headers="headers" :items="aa.data"   class="elevation-1" :search="search" dense
       :footer-props="{showFirstLastPage: true, itemsPerPageOptions: [10,20,40] ,
       'show-current-page':true,}"   
       @pagination="paginate1" 
       :server-items-length="aa.total"
       :items-per-page=20 >
 <template v-slot:top >
        <v-toolbar flat color="blue darken-4" dense dark>
          <v-toolbar-title>SAW</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-toolbar-title>SCHEDULED JOBS </v-toolbar-title>
          <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search"
                              @input="searchit" single-line hide-details></v-text-field>
        </v-toolbar>
    </template>
    <template v-slot:item.updatedat="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <span>{{moment(item.updated_at).format('DD-MM-YYYY, h:mm:ss')}}</span>
    </template>
    <template v-slot:item.cutday="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <span>{{moment(item.cut_date).format('DD-MM-YYYY')}}</span>
    </template>
    <template v-slot:item.action="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <v-btn  ripple x-small v-if="item.status_id =='9'"  color="red accent-2" rounded dark :loading="loading"  @click.prevent="scrap(item)" >InPrg</v-btn>
       <v-btn  ripple x-small v-else-if="item.status_id =='12'"  color="teal" rounded dark :loading="loading"  @click.prevent="scrap(item)" >Cmplt</v-btn>
       <v-btn  ripple x-small v-else color="light-blue darken-1" rounded dark :loading="loading"   @click.prevent="scrap(item)" >Queud</v-btn>
    </template>
     <template v-slot:item.flag="{ item }">
      <span v-for="aa in sawflags" :key="aa.id">
        <span v-if="aa.id==item.review">  <!-- {{aa.id}} -->
        <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
       </span>
      </span>
    </template>
    <template slot="no-data">
      <div></div>
    </template>
  </v-data-table>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapState, mapActions} from 'vuex';
import axios from "axios";
export default
{      computed: 
  {  ...mapState({ 
                        joblist:state =>state.saw.joblist,
                       // selectedSaw: state => state.saw.selectedSaw,
                        user: state => state.auth.user,
                        sawflags:state => state.saw.sawflags,
            }),
  },
  props:{bb:Array},
  data() { return {dialog: false,search: '',aa:[],loading:false,
          headers: [
            //  { text: 'created_at', align: 'left', value: 'created_at', },
            //  { text: 'created_by', align: 'left',  value: 'created_by.name'},
             // { text: 'updated_at', align: 'left',  value: 'updated_at',width:"1%"},
              { text: 'updated_at', align: 'left',  value: 'updatedat',width:"10%"},
              { text: 'updatedby', align: 'left',  value: 'updated_by.name',width:"1%"},
              //{ text: 'cut_date', align: 'left',  value: 'cut_date',width:"1%"},
              { text: 'cut_date', align: 'left',  value: 'cutday',width:"10%"},
             // { text: 'cut_time', align: 'left',  value: 'cut_time'},
              { text: 'schedule_saw', align: 'left',  value: 'schedule_saw',width:"1%"},
              { text: 'cut_saw', align: 'left',  value: 'cut_saw',width:"1%"},
              { text: 'quote_ID', value: 'quote_ID',sortable: false,width:"1%" },
              { text: 'order_ID', value: 'order_ID' ,sortable: false,width:"1%"},
              { text: 'Time (Min)', value: 'cut_time',sortable: false,width:"1%" },
              //{ text: 'Status', value: 'status_id', sortable: false },
              { text: 'Status', value: 'action', sortable: false,width:"1%" },
              { text: 'Flag', value: 'flag', sortable: false,width:"1%" },
              //{ text: 'Flag', value: 'review', sortable: false ,width:"1%"},
            ],
            formSearchData: {  SawCode: '',  QuoteID: '',  order_ID:'', selected1:[], cut_saw:'' ,'selerr':false }, 
             }
          },
      created(){  //this.paginate();
        },
        methods:{ 

            paginate1(e){ console.log('paginate-$event',e); this.loading=true;
            //axios.get(`http://127.0.0.1:8000/api/saw/getsawschedules?page='+${e.page}`,{})
             axios.get(`${axios.defaults.baseURL}/saw/getsawschedules?page=${e.page}`,
             {params:{'per_page':e.itemsPerPage}})
               // this.$store.dispatch(`getsawschedules?page='+${e.page}`,{})
                    .then((res) => { console.log('getschedules response',res.data.response.data)  
                                      this.aa=res.data.response; this.loading=false;  })
                    .catch(err=>{ console.log('paginate-err=', err) ; this.loading=false; })
            },
            searchit(e){ this.search=e;
              console.log('search=',e)
              if(e.length>3){ this.loading=true;
                 axios.get(`${axios.defaults.baseURL}/saw/searchsawschedules?search=${e}`,{params:{'per_page':20}} )
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
</style>