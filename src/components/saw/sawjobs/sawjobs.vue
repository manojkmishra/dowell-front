<template>
   <v-btn  text  color="grey" @click="backToSaw">
         <v-icon id="return-btn">mdi-keyboard-backspace</v-icon>RETURN TO SAW
   </v-btn>
</template>
<script>
export default {

       methods: {   backToSaw() { this.$router.push({name: 'saw'});  },
            }
    
}
</script>
<style scoped>
#return-btn{

}
</style>