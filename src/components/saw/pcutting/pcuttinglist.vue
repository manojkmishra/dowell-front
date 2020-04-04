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
     <v-btn ripple small v-if="item.Status_id =='7'"  color="teal" rounded dark :loading="loading"  @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
       <v-btn ripple small v-else color="light-blue darken-1" rounded dark :loading="loading"   @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
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
            formSearchData: {  SawCode: '', QuoteID: '', extn_id: '', loc:'',  }, loading:false,
        }),

    computed: 
      {  ...mapState({  stateNodes2: state => state.saw.profilecutting[0],
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
              onClickSChange(action, data, index)
              {   console.log('pcuttinglist.vue--change status clicked');  // actin=edit  then follow below
                  console.log('pcuttinglist.vue-itemAction: ' + action, data, index);
                  console.log('pcuttinglist.vue-cut profilecutting',this.stateNodes3);
                  console.log('pcuttinglist.vue-selectedjob',this.selectedJob);
                  console.log('pcuttinglist.vue-selectedJobDetail',this.selectedJobDetail);
                  console.log('pcuttinglist.vue-jobdetails1',this.jobdetails1);
                  //---for cut status
                 // if( this.selectedJob.AllowEdit==0 && this.selectedJob.review ==0 )
                   if( this.selectedJob.AllowEdit==0 ) //0 - allowed to cut, 1- not allwed to cut
                     {  this.formData.ID= data.ID;
                       this.formData.SawCode=this.selectedSaw;
                       this.formData.status=data.Status_id;
                      //--------------------------
                      console.log('pcuttinglist---this.formdata=',this.formData);
                      this.$store.dispatch('updateCutList', this.formData)
                             .then((response) =>  { console.log('pcuttinglist---response=',response);  })     
                             .catch((error) => {         });
                      this.resetFormData();
                    }
                  else 
                         {
                            // this.$store.dispatch('showErrorNotification', 'Only Unflagged InProgress and UpNext Jobs can be Cut');
                             this.$store.dispatch('showErrorNotification', 'This Job is not allowed to be cut');
                             return;

                        }
              },
              resetFormData() {  this.formData = {  ID: '', status:'',SawCode:'', Location:''  }; },
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