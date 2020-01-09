<template>
    <nav>
          
          <v-app-bar flat app ><!--toolbar  -->
            <div v-if="authenticated">
                <v-app-bar-nav-icon class="grey--text" @click="drwr = !drwr"></v-app-bar-nav-icon>
            </div>
            <v-toolbar-title class="transparent"> 
                <span class="font-weight-light">Saw</span><span>Analytics</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <div v-if="authenticated">
                <v-btn text color="grey"> <a href="#" @click.prevent="signOut">Sign Out</a> </v-btn>
            </div>
            <div v-else>
                  <v-btn text color="grey"> 
                      <router-link :to="{name:'signin'}"></router-link>
                   </v-btn>
            </div>
        </v-app-bar><!-- toolbar finish --drawer start-->
        <div v-if="authenticated">
            <div snackbar="true" > </div>
            <v-navigation-drawer v-model="drwr" app  class="teal">
               <v-layout column align-center>
                    <v-flex class="mt-5">
                         <v-avatar size="100" class="grey lighten-4"><img src="/avatar-1.png"></v-avatar>
                         <p class="white--text subheading mt-1">Manoj Mishra </p>
                    </v-flex> <!--popup to add projects below -->
                   
               </v-layout>
               <v-list rounded>
                    <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                        <v-list-item-icon>
                            <v-icon class="white--text">{{ link.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
              </v-list>
            </v-navigation-drawer>
      </div>

    </nav>
 
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import {mapGetters, mapActions} from 'vuex'

export default {
  
     data(){return{drwr:true, links: [
        { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/dashboard' },
        { icon: 'mdi-folder', text: 'My Projects', route: '/projects' },
        { icon: 'mdi-account', text: 'Team', route: '/team' },
      ], snackbar:false}
    },
    computed:{
        ...mapGetters({authenticated:'auth/authenticated',
                       user:'auth/user'
                      })
    },
    methods:{
        ...mapActions({signOut1:'auth/signOut'}),
        signOut(){
            this.signOut1().then(()=>{
                this.$router.replace({name:'signin'})
                 toast.fire({
                    icon: "success",
                    title: "You have logged out successfully"
                });
            })
        }
    }
}
</script>
