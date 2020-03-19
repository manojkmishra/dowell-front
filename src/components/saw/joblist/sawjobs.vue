<template>
 <v-container grid-list-lg pa-0>
    <v-layout wrap>
       <v-flex xs12>
         <v-btn  text  color="grey" @click="backToSaw">
            <v-icon id="return-btn">mdi-keyboard-backspace</v-icon>RETURN TO SAW
         </v-btn>
       </v-flex>
    <v-flex xs12>
         <test-list-view ></test-list-view>
    </v-flex>
  </v-layout>
 </v-container>
</template>
<script>
 import TestListView from './joblist.vue'
export default {
        components: { 
        'test-list-view': TestListView,  },
       methods: {   backToSaw() { this.$router.push({name: 'saw'});  },
            },
    
}
</script>
<style scoped>
#return-btn{

}
</style>