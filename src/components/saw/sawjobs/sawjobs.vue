<template>
   <v-btn  text  color="grey" @click="backToSaw">
         <v-icon id="return-btn">mdi-keyboard-backspace</v-icon>RETURN TO SAW

         <test-list-view ></test-list-view>
   </v-btn>
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