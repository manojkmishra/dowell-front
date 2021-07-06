<template> 
<v-simple-table light class="elevation-1">
     <template v-slot:top>
        <v-toolbar color="light-blue darken-3" dark dense>
          <v-toolbar-title>CUTS INFO</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-toolbar-title class="mx-4">SAW - {{selectedSaw.replace(/_/g, " ")}}</v-toolbar-title>
    <template>
            <v-btn v-if="selectedJob.review !=9 && selectedJob.review !=6 && selectedJob.review !=0" small  rounded dark 
              v-bind:style="{ 'background-color': 'rgb('+selectedJob.flagRed+','+selectedJob.flagGreen+','+selectedJob.flagBlue+')' }">
                <v-icon >mdi-flag-outline</v-icon>
                <span v-for="aa in sawflags" :key="aa.id" >
                  <span v-if="aa.id==selectedJob.review">{{aa.name}}</span>
                </span>
            </v-btn> 
    </template>
        </v-toolbar>
    </template> 
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
                          //flaggedjob:state => state.saw.flaggedjob
                          sawflags:state => state.saw.sawflags
          }),
          order() {    return stateNode[0].Profile_Section;
          }
      },


  }
</script>
<style scoped>
.disable-events {
  pointer-events: none
}
</style>