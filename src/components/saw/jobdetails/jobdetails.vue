<template>
 <v-container grid-list-lg pa-0>
    <v-layout wrap>
       <v-flex xs12>
         <v-btn  text  color="grey" @click="backToJob">
            <v-icon id="return-btn">mdi-keyboard-backspace</v-icon>RETURN TO JOB
         </v-btn>
       </v-flex>
   <v-flex xs12>
         <job-details-list ></job-details-list>
    </v-flex> 
  </v-layout>
 </v-container>
</template>
<script>
 import JobDetailsList from './jobdetailslist.vue'
export default {
        components: { 
        'job-details-list': JobDetailsList,  },
       methods: {   backToJob() { this.$router.push({name: 'joblist'});  },
            },
    
}
</script>
<style scoped>
#return-btn{

}
</style>