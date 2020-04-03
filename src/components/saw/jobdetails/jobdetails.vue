<template>
 <v-container grid-list-lg pa-0>
    <v-layout wrap>
       <v-flex xs12>
         <v-btn  text  color="grey" @click="backToJob">
            <v-icon id="return-btn">mdi-keyboard-backspace</v-icon>RETURN TO JOB
         </v-btn>
       </v-flex>
       <v-flex xs12>
            <v-btn ripple small color="blue lighten-3"  rounded dark   
                  @click.prevent="scrap">click</v-btn>
       </v-flex>
   <v-flex xs12>
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
methods: {   backToJob() { this.$router.push({name: 'joblist'});  },
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
            },
}
</script>
<style scoped>

</style>