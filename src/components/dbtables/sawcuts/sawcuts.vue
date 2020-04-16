<template> 
    <div class="mt-3">
    <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        top
        color="deep-purple accent-4"
    ></v-progress-linear>
  <v-data-table :headers="headers" :items="aa.data"  class="elevation-1" :search="search" dense
       :footer-props="{showFirstLastPage: true, itemsPerPageOptions: [10,20,40] ,
       'show-current-page':true,}" 
       @pagination="paginate" 
       :server-items-length="aa.total"
       :items-per-page=20 >
 <template v-slot:top >
        <v-toolbar flat color="blue darken-4" dense dark>
          <v-toolbar-title>SAW</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-toolbar-title>BARS </v-toolbar-title>
          <v-spacer></v-spacer>
                <v-text-field
        v-model="search"  @input="searchit"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        </v-toolbar>
    </template>
    <template slot="no-data">
      <div></div>
    </template>
  </v-data-table>
 </div>
</template>
<script>
import Vue from 'vue'
import axios from "axios";
export default
{  
  data() { return {dialog: false,search: '',aa:[],loading:false,
          headers: [
              { text: 'created_at', align: 'left', value: 'created_at'},
               { text: 'updated_at', align: 'left',  value: 'updated_at'},
              { text: 'created_by', align: 'left',  value: 'created_by.name'},
               { text: 'updated_by', align: 'left',  value: 'updated_by.name'},
              { text: 'schedule_saw', align: 'left',  value: 'schedule_saw'},
              { text: 'cut_saw', align: 'left',  value: 'cut_saw'},
              { text: 'quote_ID', value: 'quote_ID',sortable: false },
              { text: 'qt_vrs', value: 'quote_vers' ,sortable: false},
              { text: 'Time (Min)', value: 'cut_time',sortable: false },
              { text: 'Status', value: 'status_id', sortable: false },
              { text: 'Flag', value: 'review', sortable: false },
            ],
             }
          },
 methods:{
            paginate(e){ console.log('paginate-$event',e);
            //axios.get(`http://127.0.0.1:8000/api/saw/getsawschedules?page='+${e.page}`,{})
            this.loading=true;
             axios.get(`${axios.defaults.baseURL}/saw/getsawcuts?page=${e.page}`,
             {params:{'per_page':e.itemsPerPage}})
               // this.$store.dispatch(`getsawschedules?page='+${e.page}`,{})
                    .then((res) => { console.log('getsawbars response',res.data.response.data)  
                                      this.aa=res.data.response; this.loading=false;   })
                    .catch(err=>{ console.log('paginate-err=', err) ; this.loading=false; })
            },
             searchit(e){
              console.log('search=',e)
              if(e.length>2){ this.loading=true;
                 axios.get(`${axios.defaults.baseURL}/saw/searchsawcuts?search=${e}`)
                    .then((res) => { console.log('sawsc search res=',res.data.response.data)  
                                      this.aa=res.data.response; this.loading=false;  })
                    .catch(err=>{ console.log('sawsc search err=', err); this.loading=false;  })
                }
              if(e.length<=0){ this.loading=true;
                 axios.get(`${axios.defaults.baseURL}/saw/searchsawcuts`)
                    .then((res) => { console.log('sawsc search res=',res.data.response.data)  
                                      this.aa=res.data.response; this.loading=false;  })
                    .catch(err=>{ console.log('sawsc search err=', err) ; this.loading=false; })

              }
            }
        }

}
</script>

<style scoped>

</style>