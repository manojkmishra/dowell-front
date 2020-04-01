<template> 
<v-simple-table light class="elevation-1">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Extrusion</th>
          <th class="text-left">Description</th>
            <th class="text-left">Color</th>
          <th class="text-left">Stock Length</th>
            <th class="text-left">Bars</th>
          <th class="text-left">Pieces</th>
        </tr>
      </thead>
<tbody>
            <tr>
                <td>{{ stateNode[0].Extrusion }}</td>
                <td>{{ stateNode[0].Description }}</td>
                <td>{{ stateNode[0].Color }}</td>
                <td>{{ stateNode[0].Stock_Length }}</td>
                <td>{{ selectedJobDetail.Bars }}</td>
                <td>{{ selectedJobDetail.Pieces }}</td>
            </tr>
        </tbody>
    </template>
  </v-simple-table>
</template>
 
<script>
import { mapGetters, mapState, mapActions} from 'vuex';
  export default 
  {   data: () => (
        { dialog: false,
          headers: [
              { text: 'S.No', align: 'left', sortable: false, value: 'Extrusion',},
              { text: 'Extrusion', value: 'Description',sortable: false },
              { text: 'Description', value: 'Color' ,sortable: false},
              { text: 'Status', value: 'Stock_Length', sortable: false },

            ],
            formSearchData: {  SawCode: '', QuoteID: '', extn_id: '', loc:'',  }, loading:false,
        }),

    computed: 
      {  ...mapState({
                       
                         stateNode: state => state.saw.profilecutting[0],
                          selectedJob: state => state.saw.selectedJob,
                         selectedSaw: state => state.saw.selectedSaw,
                           stateNodes3: state => state.saw.jobdetails,

                            selectedJobDetail: state => state.saw.selectedJobDetail,
          }),
          order() {    return stateNode[0].Profile_Section;
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
   
}
td{
  
}
</style>