<template> 
  <v-data-table :headers="headers" :items="jobdetailslist"   class="elevation-1" 
       :footer-props="{showFirstLastPage: true, itemsPerPageOptions: [10,20,40,-1], }">

   <template v-slot:top>
        <v-toolbar  color="light-blue darken-3" dark dense>
          <v-toolbar-title>BARS</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
         
          <v-toolbar-title>SAW - {{selectedSaw.replace(/_/g, " ")}}  
               <v-divider class="mx-4" inset vertical ></v-divider>
            Order Number - {{selectedJob.Order_Number}}</v-toolbar-title>
        </v-toolbar>
    </template> 
 <template v-slot:item.action="{ item }"><!--1=qd,2-inpr,3-complt----->
     
       <v-btn ripple small  v-if="item.Status_id =='2'" :loading="loading" color="red accent-2" rounded dark   @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
       <v-btn ripple small v-else-if="item.Status_id =='3'" :loading="loading" color="teal" rounded dark   @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
       <v-btn ripple small v-else color="light-blue darken-1" :loading="loading" rounded dark    @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
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
            ],
            formSearchData: {  SawCode: '', QuoteID: '', extn_id: '', loc:'',  }, loading:false,
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
              this.loading=true;
              this.$store.dispatch('selectedJobDetail', data);
              this.$store.dispatch('getprofilecutting', this.formSearchData)
                  .then((response) => { this.loading=false;
                      console.log('profilecutting response',response.data);  
                      this.$router.push({
                          name: 'profilecutting'
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