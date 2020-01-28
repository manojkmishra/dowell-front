<template>
    <div>
        <SawList></SawList> 
            
    </div>
</template>
<script>
 import Vue from 'vue';
    import { mapGetters, mapState, mapActions} from 'vuex'
    import SawList from './SawList.vue'
    export default 
    {   components: { 'SawList': SawList, },
    created(){  this.$store.dispatch('getsaws')
    // .then((res) => { console.log('get saws ok',res.data);
   // });

    }
    }

</script>
<style>

</style>