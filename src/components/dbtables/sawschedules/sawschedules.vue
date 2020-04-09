<template> 

  <v-data-table :headers="headers" :items="aa.data"   class="elevation-1" :search="search"
       :footer-props="{showFirstLastPage: true, itemsPerPageOptions: [10,20,40] ,
       'show-current-page':true,}" 
       @pagination="paginate" 
       :server-items-length="aa.total"
       :items-per-page=20 >
 <template v-slot:top >
        <v-toolbar flat color="light-blue lighten-5">
          <v-toolbar-title>SAW</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-toolbar-title>SCHEDULED JOBS </v-toolbar-title>
          <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search"
                              @input="searchit" single-line hide-details></v-text-field>
        </v-toolbar>
    </template>
        <template slot="no-data">
      <div></div>
    </template>
  </v-data-table>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapState, mapActions} from 'vuex';
import axios from "axios";
export default
{  computed: 
   { 

            },
             props:{bb:Array},
  data() { return {dialog: false,search: '',aa:[],
          headers: [
              { text: 'created_at', align: 'left', value: 'created_at'},
              { text: 'created_by', align: 'left',  value: 'created_by.name'},
              { text: 'updated_at', align: 'left',  value: 'updated_at'},
              { text: 'updatedby', align: 'left',  value: 'updated_by.name'},
              { text: 'cut_date', align: 'left',  value: 'cut_date'},
              { text: 'cut_time', align: 'left',  value: 'cut_time'},
              { text: 'schedule_saw', align: 'left',  value: 'schedule_saw'},
              { text: 'cut_saw', align: 'left',  value: 'cut_saw'},
              { text: 'quote_ID', value: 'quote_ID',sortable: false },
              { text: 'order_ID', value: 'order_ID' ,sortable: false},
              { text: 'Time (Min)', value: 'cut_time',sortable: false },
              { text: 'Status', value: 'status_id', sortable: false },
              { text: 'Flag', value: 'review', sortable: false },
            ],
             }
          },
      created(){  //this.paginate();
        },
        methods:{
            paginate(e){ console.log('paginate-$event',e);
            //axios.get(`http://127.0.0.1:8000/api/saw/getsawschedules?page='+${e.page}`,{})
             axios.get(`${axios.defaults.baseURL}/saw/getsawschedules?page=${e.page}`,
             {params:{'per_page':e.per_page}})
               // this.$store.dispatch(`getsawschedules?page='+${e.page}`,{})
                    .then((res) => { console.log('getschedules response',res.data.response.data)  
                                      this.aa=res.data.response;   })
                    .catch(err=>{ console.log('paginate-err=', err)  })
            },
            searchit(e){
              console.log('search=',e)
              if(e.length>3){
                 axios.get(`${axios.defaults.baseURL}/saw/searchsawschedules?search=${e}`)
                    .then((res) => { console.log('sawsc search res=',res.data.response.data)  
                                      this.aa=res.data.response;   })
                    .catch(err=>{ console.log('sawsc search err=', err)  })
                }
              if(e.length<=0){
                 axios.get(`${axios.defaults.baseURL}/saw/searchsawschedules`)
                    .then((res) => { console.log('sawsc search res=',res.data.response.data)  
                                      this.aa=res.data.response;   })
                    .catch(err=>{ console.log('sawsc search err=', err)  })

              }
            }
        }
}
</script>

<style scoped>

</style>