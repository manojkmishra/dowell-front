<template>
 
   <div>
          <v-app-bar flat app ><!--toolbar  -->
            <v-app-bar-nav-icon class="grey--text"></v-app-bar-nav-icon>
            <v-toolbar-title class="transparent"> 
                <span class="font-weight-light">Saw</span><span>Analytics</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
                        <v-btn text color="grey"><v-icon left>mdi-expand_more</v-icon> <span>SignIn</span></v-btn>
                         <v-btn text color="grey"><span>signout</span><v-icon right>mdi-exit_to_app</v-icon></v-btn>
                   
                    <ul>
           <!-- <li>  <router-link :to="{name:'signin'}">SignIn</router-link> </li> -->
           <!-- below routes available after sign in-->
            <div v-if="authenticated">
                <li> User={{user.name}} email={{user.email}}</li>
                <li> <router-link :to="{name:'dashboard'}">Dashboard</router-link> </li>
                <li> <a href="#" @click.prevent="signOut">Sign Out</a> </li>
            </div>
            <div v-else>
                 <li> <router-link :to="{name:'signin'}">Sign In</router-link> </li>
            </div>
        </ul>
            
           
        </v-app-bar><!-- toolbar finish --drawer start-->
      

    </div>
 
</template>

<script>
//import HelloWorld from './components/HelloWorld';
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
