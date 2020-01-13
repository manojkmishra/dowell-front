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
                <v-btn text color="grey" @click.prevent="signOut"> Sign Out
                <v-icon >mdi-export-variant</v-icon>  </v-btn>
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
                         <v-avatar size="100" class="grey lighten-4"><img src="@/assets/free-time.svg"></v-avatar>
                         <p class="white--text subheading mt-1">{{user.email}}</p>
                    </v-flex> <!--popup to add projects below -->
                   
               </v-layout>
               <v-list rounded dense>
                    <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                        <v-list-item-icon>
                            <v-icon class="white--text">{{ link.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <!---multi level-------- -->
                    <v-list-group prepend-icon="mdi-account white--text" value="true" class="white--text">
                      <template v-slot:activator>
                           <v-list-item-title class="white--text">Users</v-list-item-title>
                      </template>
                      <v-list-group no-action sub-group value="true">
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title class="white--text">Admin</v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <v-list-item v-for="(admin, i) in admins" :key="i" link>
                           <v-list-item-title v-text="admin[0]"></v-list-item-title>
                           <v-list-item-icon> <v-icon v-text="admin[1]"></v-icon>
                           </v-list-item-icon>
                        </v-list-item>
                     </v-list-group>

        <v-list-group sub-group no-action >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="white--text">Actions</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="(crud, i) in cruds" :key="i" @click="" >
            <v-list-item-title v-text="crud[0]" class="white--text"></v-list-item-title>
            <v-list-item-action>
              <v-icon v-text="crud[1]" class="white--text"></v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
      </v-list-group>
      <!---multi leve finish -->
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
        { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/dashboard' , },
        { icon: 'mdi-folder', text: 'My Projects', route: '/projects' },
        { icon: 'mdi-account', text: 'Team', route: '/team' },
      ], snackbar:false,
      admins: [ ['Management', 'mdi-folder'], ['Settings', 'mdi-folder'], ],
      cruds: [ ['Create', 'mdi-folder'], ['Read', 'mdi-folder'],
        ['Update', 'mdi-folder'], ['Delete', 'mdi-folder'],
      ],}
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
