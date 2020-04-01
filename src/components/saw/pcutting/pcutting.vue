<template>
 <v-container grid-list-lg pa-0>
    <v-layout wrap>
       <v-flex xs12>
         <v-btn  text  color="grey" @click="backToJobdetails">
            <v-icon id="return-btn">mdi-keyboard-backspace</v-icon>RETURN TO JOBDETAILS
         </v-btn>
       </v-flex>
   <v-flex xs6>
         <profile-information ></profile-information> <br/>
         <opt-cut ></opt-cut> 
    </v-flex> 
       <v-flex xs6>
         <profile-cutting-list ></profile-cutting-list> 
    </v-flex> 

  </v-layout>
 </v-container>
</template>
<script>
 import pcuttinglist from './pcuttinglist.vue'
  import pinformation from './pinformation.vue'
    import optcut from './optcut.vue'
export default {
        components: { 
        'profile-cutting-list': pcuttinglist, 
        'profile-information': pinformation, 
        'opt-cut': optcut, 
         },
       methods: {   backToJobdetails() { this.$router.push({name: 'jobdetails'});  },
            },
    
}
</script>
<style scoped>
#return-btn{

}
</style>