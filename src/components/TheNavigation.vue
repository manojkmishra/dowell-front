<template>
    <nav>
          
          <v-app-bar flat app ><!--toolbar  -->
            <div v-if="authenticated">
                <v-app-bar-nav-icon class="grey--text" @click="drwr = !drwr"></v-app-bar-nav-icon>
            </div>
            <v-toolbar-title class="transparent"> 
                <span class="font-weight-light">Saw</span><span>Screens</span>
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
            <v-navigation-drawer v-model="drwr" app  class="blue-grey lighten-5" id="sidebar">
               <v-layout column align-center>
                    <v-flex class="mt-5">
                         <v-avatar size="100" class=""><img src="@/assets/free-time.svg"></v-avatar>
                         <p class=" subheading mt-1">{{user.email}}</p>
                    </v-flex> <!--popup to add projects below -->
               </v-layout>            
      <!---multi leve finish ---------->
    <v-list dense>
     <!--  <v-list-item id="dashboard-l">
        <v-list-item-icon> <v-icon>mdi-view-dashboard</v-icon> </v-list-item-icon>
         <v-list-item-content>
        <v-list-item-title :to="'dashboard'">
          <router-link :to="{ name: 'dashboard' }" >Dashboard</router-link></v-list-item-title>
           </v-list-item-content>
      </v-list-item>  -->
     
        <v-list-group id="liner" :value="false" v-for="item in items" :key="item.title" 
          :prepend-icon="item.action" no-action>
           <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>             

            <v-list-item v-for="subItem in item.items" :key="subItem.title" @click="" :value="false"> 
              <v-list-item-content>
                <v-list-item-title v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          
          </v-list-group>
                 
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
     
      items: [
          { action: 'mdi-view-dashboard', title: 'Dashboard'},
           { action: 'mdi-folder', title: 'QLD', items: [ { title: 'Geebung' }, ], },
          { action: 'mdi-folder', title: 'NSW',items: [
              { title: 'Smithfield' },
              { title: 'Nowra' },
              { title: 'Beresfield' },
            ],
          },
          { action: 'mdi-folder', title: 'SA', items: [ { title: 'Elizabeth' }, ], },
          { action: 'mdi-folder', title: 'VIC', items: [{ title: 'Bayswater' },], },
          
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
.v-application a {  text-decoration: none; color:black}
/*
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
*/
#dashboard-l:hover{
background-color:rgb(123,196,189)
}
#dashboard-l:active{
background-color:rgb(123,196,189)
}
#dashboard-l:focus{
background-color:rgb(123,196,189)
}
.v-list .v-list-item--active {
    color: inherit;
    background-color: blue;
}

</style>