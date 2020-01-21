<template>
  <div> Dashboard </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import {mapGetters, mapActions} from 'vuex'
import sawdashboard from '@/components/saw/Saw.vue'
export default {
  name: 'dashboard',
  components: {sawdashboard },
  computed:{ ...mapGetters({authenticated:'auth/authenticated',
                            user:'auth/user'
                           })
           },
}
</script>
