<template>
    <div id="root-order-list">
        <div class="main"> 
            <div class="container">
               <div class="row">
                    <h2>Saw page</h2>
                    <div class="col-md-12"> <SawList></SawList> </div>
               </div>
            </div>
        </div>
    </div>
</template>
<script>
 import Vue from 'vue';
    import { mapGetters, mapState, mapActions} from 'vuex'

    import SawList from './SawList.vue'

      export default 
    {
          components: { 'SawList': SawList, }

    }

</script>
<style>

</style>