<template>
  <div>
 Dashboard
 <div v-if="authenticated">
 <li> User={{user.name}} email={{user.email}}</li>
 </div>
 <li> <router-link :to="{name:'dashboard'}">Dashboard</router-link> </li>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'dashboard',
  components: { },
   computed:{
        ...mapGetters({authenticated:'auth/authenticated',
                       user:'auth/user'
                      })
    },
}
</script>
