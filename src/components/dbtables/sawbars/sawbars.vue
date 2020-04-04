<template>
    <div class="mt-3">
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        top
        color="deep-purple accent-4"
      ></v-progress-linear>
        <sawschedules v-bind:bb="aa" ></sawschedules> 
            
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
             this.$store.dispatch('getsawbars')
                    .then((res) => { //this.loading=false;
                                console.log('getsawbars response',res.data)  
                                this.aa=res.data;
                                this.loading=false;
                        })
        }
    }

</script>
<style>

</style>