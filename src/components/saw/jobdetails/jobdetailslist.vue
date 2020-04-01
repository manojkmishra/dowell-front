<template> 
  <v-data-table :headers="headers" :items="jobdetailslist"   class="elevation-1" 
       :footer-props="{showFirstLastPage: true, itemsPerPageOptions: [10,20,40,-1], }">

   <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>JOBDETAILS LIST</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
         
          <v-toolbar-title>SAW - {{selectedSaw.replace(/_/g, " ")}}</v-toolbar-title>
        </v-toolbar>
    </template> 
 <template v-slot:item.action="{ item }">
      <v-btn v-if="item.Status_id =='9'"  color="danger" rounded dark   @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
       <v-btn v-else-if="item.Status_id =='2'"  color="teal" rounded dark   @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
       <v-btn v-else-if="item.Status_id =='3'"  color="teal" rounded dark   @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
       <v-btn v-else color="blue lighten-2" rounded dark    @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
    </template>
    <template v-slot:item.flag="{ item }">
        <v-icon small > mdi-flag-outline </v-icon>
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
              { text: 'Extrusion', value: 'Extrusion',sortable: false },
              { text: 'Description', value: 'Description' ,sortable: false},
              { text: 'Colour', value: 'Color',sortable: false },
              { text: 'Pieces', value: 'Pieces', sortable: false},
              { text: 'Bars', value: 'Bars', sortable: false },
               { text: 'Clamps', value: 'clamp_pos', sortable: false },
               { text: 'Status', value: 'action', sortable: false },
                { text: 'Flag', value: 'flag', sortable: false },
            ],
            formSearchData: {  SawCode: '', QuoteID: '', extn_id: '', loc:'',  }
        }),

    computed: 
       {  ...mapState({ sawlist: state => state.saw.sawlist, 
                        jobdetailslist:state =>state.saw.jobdetailslist,
                        selectedSaw: state => state.saw.selectedSaw,
                        selectedJob: state => state.saw.selectedJob,
                   }),
           
       },
    watch: {   },
    created () {  },
    mounted() { console.log('joblist.vue-this.sawlist=',this.sawlist)
                console.log('joblist.vue-this.joblist=',this.jobdetailslist)    
              },
    methods: 
    {   chstatus(data)
          {    console.log('chstatus-',data);
              if(this.selectedJob.cut_saw != null) 
              {this.formSearchData.SawCode = this.selectedJob.cut_saw;}
              else this.formSearchData.SawCode = this.selectedSaw ;
              this.formSearchData.QuoteID = this.selectedJob.quote_ID;
              this.formSearchData.extn_id = data.extn_id;
              console.log('formSearchData=',this.formSearchData);
              this.$store.dispatch('selectedJobDetail', data);
              this.$store.dispatch('getprofilecutting', this.formSearchData)
                  .then((response) => { console.log('profilecutting response',response.data);  
                      this.$router.push({
                          name: 'pcutting'
                      });
                  })
                  .catch((error) => {});
                      
           },
      


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