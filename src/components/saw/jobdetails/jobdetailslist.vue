<template> 
  <v-data-table :headers="headers" :items="jobdetailslist"   class="elevation-1" 
       :footer-props="{showFirstLastPage: true, itemsPerPageOptions: [10,20,40,-1], }">

   <template v-slot:top>
        <v-toolbar  color="light-blue darken-3" dark dense>
          <v-toolbar-title>BARS</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
         
          <v-toolbar-title>SAW - {{selectedSaw.replace(/_/g, " ")}}  
               <v-divider class="mx-4" inset vertical ></v-divider>
            Order Number - {{selectedJob.Order_Number}}
            <v-divider class="mx-4" inset vertical ></v-divider>
<!----->
 <v-tooltip v-if="showflag1" bottom :disabled="flagcolor.name==null">
   <template v-slot:activator="{ on }">
            <v-btn v-on="on"  v-if="showflag1" small  rounded dark 
              v-bind:style="{ 'background-color': 'rgb('+flagcolor.red+','+flagcolor.green+','+flagcolor.blue+')' }">
                <v-icon >mdi-flag-outline</v-icon>
                Flagged Job</v-btn> 
    </template>
    <span>{{flagcolor.name+"-"+flaggedjob.comments}}</span>
  </v-tooltip> 
  
</v-toolbar-title>

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
  {  

    computed: 
      {  ...mapState({  sawlist: state => state.saw.sawlist, 
                        jobdetailslist:state =>state.saw.jobdetailslist,
                        selectedSaw: state => state.saw.selectedSaw,
                        selectedJob: state => state.saw.selectedJob,
                        flaggedjob:state => state.saw.flaggedjob,
                        sawflags:state => state.saw.sawflags
                    }),
          showflag1()
          {//show flag on table header
            if(this.flaggedjob && this.flaggedjob.quote_ID==this.selectedJob.quote_ID
                && this.flaggedjob.order_ID==this.selectedJob.Order_Number
                && this.flaggedjob.cut_saw==this.selectedJob.cut_saw
                && this.flaggedjob.review>0 && this.flaggedjob.review != 9 
                && this.flaggedjob.review !=6)//show flag in this case
                  {     this.showflag=true;this.flagcolor=this.flaggedjob;
                          console.log('jobdetailslist.vue->same job-showflag-',this.showflag,'this.flaggedjob.review-',this.flaggedjob.review,
                                        'this.flaggedjob-',this.flaggedjob);
                          let bb= this.sawflags.filter( x => x.id ==  this.flaggedjob.review );
                          this.flagcolor=bb[0];
                          console.log('jobdetailslist.vue-flag=',this.flagcolor)
                          return this.showflag;
                        
                  }
                else {
                  this.showflag=false;this.flagcolor=null;
                  console.log('jobdetailslist.vue-dont show flag->this.flaggedjob.review-',this.flaggedjob.review);
                  console.log('jobdetailslist.vue-showflag=-',this.showflag);
                  return this.showflag;
                };
          }
      },
      created () {  },
       data: () => (
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
            formSearchData: {  SawCode: '', QuoteID: '', extn_id: '', loc:''  }, loading:false,
            showflag:false, cmt:{val:''},
            flagcolor:null
        }),
   
    mounted() { console.log('joblist.vue-this.sawlist=',this.sawlist)
                console.log('joblist.vue-this.joblist=',this.jobdetailslist)    
              },
    methods: 
    {  
      chstatus(data)
          {    console.log('chstatus-',data);
              if(this.selectedJob.cut_saw != null) 
              {this.formSearchData.SawCode = this.selectedJob.cut_saw;}
              else this.formSearchData.SawCode = this.selectedSaw ;
              this.formSearchData.QuoteID = this.selectedJob.quote_ID;
              this.formSearchData.extn_id = data.extn_id;
              this.formSearchData.fincol = data.FincolID;
              console.log('formSearchData=',this.formSearchData);
              this.loading=true;
              this.$store.dispatch('selectedJobDetail', data);
              this.$store.dispatch('getprofilecutting', this.formSearchData)
                  .then((response) => { this.loading=false;
                      console.log('jdlist.vue-getprofilecutting response',response.data);  
                      this.$router.push({ name: 'profilecutting' });
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
.disable-events {
  pointer-events: none
}
</style>