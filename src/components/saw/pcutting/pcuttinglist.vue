<template> 
  <v-data-table :headers="headers" :items="stateNodes3"   class="elevation-1" 
       :footer-props="{showFirstLastPage: true, itemsPerPageOptions: [10,20,40,-1], }">

   <template v-slot:top>
        <v-toolbar color="light-blue darken-3" dark dense>
          <v-toolbar-title>PROFILECUTTING LIST</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
         
          <v-toolbar-title>Order Number - {{selectedJob.Order_Number}}</v-toolbar-title>
        </v-toolbar>
    </template> 
 <template v-slot:item.action="{ item }">
     <v-btn ripple small v-if="item.Status_id =='7'"  color="teal" rounded dark :loading="loading"  @click.prevent="pcutchangestatus(item)">{{item.Status}}</v-btn>
       <v-btn ripple small v-else color="light-blue darken-1" rounded dark :loading="loading"   @click.prevent="pcutchangestatus(item)">{{item.Status}}</v-btn>
    </template>

  </v-data-table>
</template>
 
<script>
import { mapGetters, mapState, mapActions} from 'vuex';
  export default 
  {   data: () => (
        { dialog: false,
          headers: [
              { text: 'S.No', align: 'left', sortable: false, value: 'SNO',},
              { text: 'Extrusion', value: 'Length',sortable: false },
              { text: 'Description', value: 'Cuts' ,sortable: false},
              { text: 'Machine', value: 'Machine' ,sortable: false},
              { text: 'Status', value: 'action', sortable: false },

            ],
            formSearchData: {  SawCode:'', QuoteID:'',}, loading:false,
                           formData: {    ID:'', QuoteID:'',   title: '',  SawCode:'',status:'',location:'',jid:'' },
        }),

    computed: 
      {  ...mapState({   stateNodes2: state => state.saw.profilecutting[0],
                            selectedJob: state => state.saw.selectedJob,
                            selectedJobDetail: state => state.saw.selectedJobDetail,
                            selectedSaw: state => state.saw.selectedSaw,
                            jobdetails1: state => state.saw.jobdetails,
                            joblist: state => state.saw.joblist,
                    }),
                    stateNodes3() {   return this.stateNodes2.slice().sort(function(a, b) {    return a.Length - b.Length;  });
                            }
      },
    watch: {   },
    created () {  },
    mounted() {    
              },
    methods: 
          {              
              pcutchangestatus( data)
              {   console.log('pcuttinglist.vue--change status clicked');  // actin=edit  then follow below
                  console.log('pcuttinglist.data ',  data);
                  console.log('pcuttinglist.vue-cut profilecutting',this.stateNodes3);
                  console.log('pcuttinglist.vue-selectedjob',this.selectedJob);
                  console.log('pcuttinglist.vue-selectedJobDetail',this.selectedJobDetail);
                  //---for cut status
                 // if( this.selectedJob.AllowEdit==0 && this.selectedJob.review ==0 )
                   if( this.selectedJob.AllowEdit==0 ) //0 - allowed to cut, 1- not allwed to cut
                     {  this.formData.ID= data.ID;
                       this.formData.SawCode=this.selectedSaw;
                       this.formData.status=data.Status_id;
                       this.formData.QuoteID=this.selectedJob.quote_ID;
                       this.formData.extn_id=this.selectedJobDetail.extn_id;
                       this.formData.jid = this.selectedJob.id;
                      //--------------------------
                      console.log('pcuttinglist---this.formdata=',this.formData);
                      this.$store.dispatch('updateprofilecut', this.formData)
                             .then((response) =>  { console.log('updateprofilecut---response=',response);  })     
                             .catch((error) => {         });
                      this.resetFormData();
                    }
                  else 
                         {
                            swal.fire({
                              position: 'top-right',
                              title:'<span style="color:white">This Job is not allowed to be cut</span>',
                              timer: 2000, toast: true,background: 'purple',
                              });
                             return;

                        }
              },
              resetFormData() {  this.formData = {  ID: '', status:'',SawCode:'', Location:'',QuoteID:'', jid:'' }; },
          },

  }
</script>
<style scoped>

.theme--light.v-data-table tbody td {
    font-size: 20px !important;
}
.v-data-table td{
   font-size: 10px;
}
</style>