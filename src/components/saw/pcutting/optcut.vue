<template> 
  <v-data-table :headers="headers" :items="stateNodes3"   class="elevation-1" 
       hide-default-footer>

   <template v-slot:top>
        <v-toolbar flat color="white">
          <v-divider class="mx-4" inset vertical ></v-divider>
         
          <v-toolbar-title>SAW - {{selectedSaw.replace(/_/g, " ")}}</v-toolbar-title>
        </v-toolbar>
    </template> 
 <template v-slot:item.action="{ item }">
      <v-btn v-if="item.grp_status =='7'" :loading="loading" color="danger" rounded dark   @click.prevent="onClickSChange(item)">Completed</v-btn>
       <v-btn v-else-if="item.grp_status =='5'" :loading="loading" color="blue lighten-3" rounded dark   @click.prevent="onClickSChange(item)">Queued</v-btn>
        <v-btn  v-else :loading="loading" color="blue lighten-3" rounded dark  @click.prevent="onClickSChange(item)">Queued</v-btn>
    </template>

  </v-data-table>
</template>
 
<script>
import { mapGetters, mapState, mapActions} from 'vuex';
  export default 
  {   data: () => (
        { dialog: false,
          headers: [
              { text: 'S.No', align: 'left', sortable: false, value: 'opt_cut',},
              { text: 'Status', value: 'action', sortable: false },

            ],
            seen: true ,  formSearchData: {  SawCode:'', QuoteID:'',}, loading:false,
            formData: {    ID:'', name: '',    title: '',   qt_id: '',SawCode:'',status:'',location:'', extn_id:'' },
        }),

    computed: 
      {  ...mapState({  stateNodes3: state => state.saw.profilecutting[1],
                            selectedJob: state => state.saw.selectedJob,
                            selectedJobDetail: state => state.saw.selectedJobDetail,
                            selectedSaw: state => state.saw.selectedSaw,
                            jobdetails1: state => state.saw.jobdetails,
                            joblist: state => state.saw.joblist,
                            optcutlist: state => state.saw.optcutlist,
                    }),
                   
      },
    watch: {   },
    created () {  },
    mounted() {    
              },
    methods: 
          {   onClickSChange(action, data, index)
              {   console.log('optcut.vue--change status clicked');  // actin=edit  then follow below
                  console.log('optcut.vue-itemAction: ' + action, data, index);
                  console.log('optcut.vue-cut profilecutting',this.stateNodes3);
                  console.log('optcut.vue-selectedjob',this.selectedJob);
                  console.log('optcut.vue-selectedJobDetail',this.selectedJobDetail);
                  console.log('optcut.vue-jobdetails1',this.jobdetails1);
                 
                   if( this.selectedJob.AllowEdit==0 ) //0 - allowed to cut, 1- not allwed to cut
                     {  this.formData.ID= data.bar_guid;
                       this.formData.SawCode=this.selectedSaw;
                       this.formData.status=data.grp_status;
                           this.formData.qt_id=this.selectedJob.quote_ID;
                             this.formData.extn_id=this.selectedJobDetail.extn_id;
                      //--------------------------
                      console.log('optcut---this.formdata=',this.formData);
                      this.$store.dispatch('updateOptCut', this.formData)
                             .then((response) =>  { console.log('optcut---response=',response);  })     
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
              resetFormData() {  this.formData = {  ID: '', status:'',SawCode:'', Location:'', qt_id:'',extn_id:''  }; },
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