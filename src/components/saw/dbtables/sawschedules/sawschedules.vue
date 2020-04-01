<template>
    <div class="mt-3">
        <sawschedules></sawschedules> 
            
    </div>
</template>
<script>
 import Vue from 'vue';
    import { mapGetters, mapState, mapActions} from 'vuex'
    import sawschedules from './sawscheduleslist.vue'
    export default 
    {   components: { 'sawschedules': sawschedules, },
        created(){  this.$store.dispatch('getsawschedules')    }
    }

</script>
<style>

</style>