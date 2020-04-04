<template>
 <v-container grid-list-lg pa-0 mt-2>
    <v-layout wrap>
       <v-flex xs12>
         <v-btn  text  color="grey" @click="backToJobdetails">
            <v-icon id="return-btn">mdi-keyboard-backspace</v-icon>RETURN TO JOBDETAILS
         </v-btn>

        <v-btn id="flag-btn" ripple small color="blue darken-4"  rounded dark   
                  @click.prevent="scrap"><v-icon  >mdi-share-circle</v-icon>Ext-To-Saw</v-btn>
        <v-btn id="flag-btn" ripple small color="green accent-4"  rounded dark   
                  @click.prevent="scrap"><v-icon  >mdi-cog-clockwise</v-icon>Re-Optimise</v-btn>
       </v-flex>
   <v-flex md6>
         <profile-information ></profile-information> <br/>
         <opt-cut ></opt-cut> 
    </v-flex> 
       <v-flex md6>
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
#flag-btn{margin-left:10px; }
</style>