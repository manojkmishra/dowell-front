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
            <v-navigation-drawer v-model="drwr" app   id="sidebar">
               <v-layout column align-center>
                    <v-flex class="mt-5">
                         <v-avatar size="100" class="blue lighten-4"><img src="@/assets/free-time.svg"></v-avatar>
                         <p class=" subheading mt-1 white--text">{{user.email}}</p>
                    </v-flex> <!--popup to add projects below -->
               </v-layout>            
      <!---multi leve finish ---------->
    <v-list dense>
    <!---   
    <v-list-item>
        <v-list-item-icon> <v-icon>mdi-view-dashboard</v-icon> </v-list-item-icon>
         <v-list-item-content>
        <v-list-item-title>
          <router-link :to="'dashboard'" >Dashboard</router-link></v-list-item-title>
           </v-list-item-content>
      </v-list-item>
  -->
<v-list-group  class="white--text" v-for="link in links2" :key="link.text" :prepend-icon="link.icon"  :value="false" >
  <template v-slot:activator> <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>  </template>
    <v-list-group v-for="lik in link.children" :key="lik.site"  sub-group no-action dense   >
              <template v-slot:activator> <v-list-item-title class="white--text">{{lik.site}}</v-list-item-title>  </template>
                    <v-list-item v-for="lk in lik.kpi" :key="lk.kpi1" router :to="lk.route">
                        <v-list-item-content>
                            <v-list-item-title class="white--text" >{{ lk.kpi1 }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
           </v-list-group>
</v-list-group>
<!----   --->
    </v-list>
           </v-navigation-drawer>
      </div>
    </nav>
 </template>

<script>
//import HelloWorld from './components/HelloWorld';
import {mapGetters, mapActions} from 'vuex'

export default {
  
     data(){return{ drwr:true, 
      links2: [
        { icon: 'mdi-view-dashboard', text: 'Dashboard', 
        },
        { icon: 'mdi-folder', text: 'QLD', 
          children:[{ site:'Geebung', kpi:[{kpi1:'kpi1', route:'/kpi1'},
                                          {kpi1:'kpi2', route:'/kpi1'}],}]
        },

        { icon: 'mdi-folder', text: 'NSW', 
          children:[{ site:'Smithfield', kpi:[{kpi1:'kpi1', route:'/kpi1'},{kpi1:'kpi2', route:'/kpi1'}],},
          { site:'Newcastle', kpi:[{kpi1:'kpi1', route:'/kpi1'},{kpi1:'kpi2', route:'/kpi1'}],},
           { site:'Nowra', kpi:[{kpi1:'kpi1', route:'/kpi1'},{kpi1:'kpi2', route:'/kpi1'}],}]
        },
        { icon: 'mdi-folder', text: 'SA', 
          children:[{ site:'Elizabeth', kpi:[{kpi1:'kpi1', route:'/elizabeth/kpi1'},
                                          {kpi1:'kpi2', route:'/elizabeth/kpi2'}],}]
        },
      ],
     
         } //return complete
    },
    computed:{
        ...mapGetters({authenticated:'auth/authenticated',
                       user:'auth/user'
                      }),
          
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
        },
                   
    },
    
}
</script>
<style scoped>

#liner:before {
  content: '';
    height: 1px;
   left: 1rem;
    position: absolute;
    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    width: 87%;
    justify-content: center;
    padding-right: 2 rem;
}
#liner:after{

 content: '';
    height: 1px;
    left: 1rem;
    position: absolute;
    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    width: 87%;
    justify-content: center;
 
   
}
#sidebar{
  background-color: rgb(66, 93, 146);

  
}

</style>