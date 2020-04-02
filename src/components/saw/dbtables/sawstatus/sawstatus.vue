<template>
    <div class="mt-3">
        <sawschedules v-bind:bb="aa" :loading="loading"></sawschedules> 
            
    </div>
</template>
<script>
 import Vue from 'vue';
    import { mapGetters, mapState, mapActions} from 'vuex'
    import sawschedules from './sawbarlist.vue'
    export default 
    {   data(){return{aa:[], loading:false}},
        components: { 'sawschedules': sawschedules, },
        created(){ this.loading=true;
             this.$store.dispatch('getsawstatus')
                    .then((res) => { //this.loading=false;
                                console.log('getstatus response',res.data)  
                                this.aa=res.data;
                                this.loading=false;
                        })
        }
    }

</script>
<style>

</style>