<template>
    <div>Nav Component
        <ul>
            <li>  <router-link :to="{name:'home'}">Home</router-link> </li>
           <!-- below routes available after sign in-->
            <template v-if="authenticated">
                <li> User={{user.name}} email={{user.email}}</li>
                <li> <router-link :to="{name:'dashboard'}">Dashboard</router-link> </li>
                <li> <a href="#" @click.prevent="signOut">Sign Out</a> </li>
            </template>
            <template v-else>
                 <li> <router-link :to="{name:'signin'}">Sign In</router-link> </li>
            </template>
        </ul>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    computed:{
        ...mapGetters({authenticated:'auth/authenticated',
                       user:'auth/user'
                      })
    },
    methods:{
        ...mapActions({signOut1:'auth/signOut'}),
        signOut(){
            this.signOut1().then(()=>{
                this.$router.replace({name:'home'})
            })
        }
    }
}
</script>