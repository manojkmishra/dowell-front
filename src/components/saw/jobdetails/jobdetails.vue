<template>
 <v-container grid-list-lg pa-0 mt-2>
    <v-layout wrap>
       <v-flex xs12>
         <v-btn  text  color="grey" @click="backToJob">
            <v-icon  mr-3>mdi-keyboard-backspace</v-icon>RETURN TO JOB</v-btn>
        <v-btn id="flag-btn" ripple small color="red"  rounded dark   
                  @click.prevent="flagit"><v-icon  >mdi-flag-outline</v-icon>Flag</v-btn>
        <v-btn id="flag-btn" ripple small color="blue darken-4"  rounded dark   
                  @click.prevent="exttosaw"><v-icon  >mdi-share-circle</v-icon>Ext-To-Saw</v-btn>
        <v-btn id="flag-btn" ripple small color="green accent-4"  rounded dark   
                  @click.prevent="reoptimise" ><v-icon  >mdi-cog-clockwise</v-icon>Re-Optimise</v-btn> 
        <v-btn id="flag-btn" ripple medium color="blue"  rounded dark   
                  @click.prevent="scrap"><v-icon  >mdi-clipboard-list</v-icon>CUTLIST</v-btn>
        <v-btn id="flag-btn" ripple small color="purple lighten-3"  rounded dark   
                  @click.prevent="sawprint"><v-icon  >mdi-printer</v-icon>Print</v-btn>
        <v-btn id="flag-btn" ripple small color="cyan"  rounded dark   
                  @click.prevent="scrap"><v-icon  >mdi-circular-saw</v-icon>ChangeSaw</v-btn>
        <v-btn id="flag-btn" ripple small color="orange"  rounded dark   
                  @click.prevent="cutall"><v-icon  >mdi-check-all</v-icon>CUTALL</v-btn>
            
            
       </v-flex>
 
   <v-flex xs12 pt-0>
         <job-details-list ></job-details-list>
    </v-flex> 
  </v-layout>
 </v-container>
</template>
<script>
 import JobDetailsList from './jobdetailslist.vue'
 import { mapGetters, mapState, mapActions} from 'vuex';
export default {
    computed: { ...mapGetters({}),
        ...mapState({
            stateNodes3: state => state.saw.jobdetails,
            selectedJob: state => state.saw.selectedJob,
            selectedSaw: state => state.saw.selectedSaw,
            joblist1: state => state.saw.joblist,
        })},
   data() {  return { seen: true,
            formSearchData: {  SawCode: '',  QuoteID: '',  extn_id: '',  loc:'',  }
        }
    },
components: {   'job-details-list': JobDetailsList,  },
methods: {   backToJob() { //this.$router.push({name: 'joblist'});  
                this.formSearchData.SawCode = this.selectedSaw;
                this.formSearchData.Location = "GBG";               
                this.$store.dispatch('getJobs', this.formSearchData)
                .then((response) => {  
                                    this.$router.push({name: 'joblist'});
                                    })
},
         scrap() 
                {   console.log('scrap clicked selectedjob-=',this.selectedJob);
            this.formSearchData.SawCode = this.selectedSaw;
            this.formSearchData.QuoteID = this.selectedJob.quote_ID;
            console.log('formSearchData=',this.formSearchData);
            this.$store.dispatch('getcutlist', this.formSearchData)
                .then((response) => { console.log('jobdetails--- cutlist',response.data);  
                    this.$router.push({  name: 'cutlist'   });
                })
                .catch((error) => {});

                  },
            //-----------scrap finish---------------------
    extToSaw() { this.formSearchData.QuoteID = this.selectedJob.quote_ID;
                this.formSearchData.SawCode = this.selectedSaw;
                this.formSearchData.loc = "GBG";
                this.$store.dispatch('extToSaw', this.formSearchData)
                .then((response) => {        })
                .catch((error) => {});
            },
    //------------------------------------------------
        reoptimise() 
            {  swal.fire({
                            position: 'top-right',
            title:'<span style="color:white">This function will work in version 2</span>',
                            timer: 2000, toast: true,background: 'purple',
                            });
                        return;
               
            },
    //----------------------------------------------
        cutall() {
            this.formSearchData.QuoteID = this.selectedJob.quote_ID;
            this.formSearchData.SawCode = this.selectedSaw;
            this.formSearchData.loc = "GBG";
            this.$store.dispatch('cutall', this.formSearchData)
                .then((response) => {           })
                .catch((error) => {});
        },
    //-----------------------------------------------
        onClickFlag() {
            if (this.selectedJob.Status_id != 12) {
                let formData = {  id: '', name: '', title: 'Add Flag', };
                let payload = { isShow: true, data: { action: 'Add', data: formData,
                        index: 0            }
                };
                this.$store.dispatch('flagModal', payload);
            } else {
                this.$store.dispatch('showErrorNotification', 'Completed Jobs can not be flagged');
                return;
            }
        },
        sawprint() 
         {     swal.fire({
                            position: 'top-right',
            title:'<span style="color:white">This function will work in version 2</span>',
                            timer: 2000, toast: true,background: 'purple',
                            });
                        return;
        },
    changesaw() 
                {   let formData = { id: '',  name: '', title: 'Change SAW',   };
                    let payload = {  isShow: true,  data: { action: 'Add', data: formData, index: 0  }    };
                    this.$store.dispatch('chsawModal', payload);
                },
            },
}
</script>
<style scoped>
#flag-btn{margin-left:10px}
</style>