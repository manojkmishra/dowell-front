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
            <v-navigation-drawer v-model="drwr" app  class="teal lighten-3" id="sidebar">
               <v-layout column align-center>
                    <v-flex class="mt-5">
                         <v-avatar size="100" class="teal lighten-4"><img src="@/assets/free-time.svg"></v-avatar>
                         <p class=" subheading mt-1">{{user.email}}</p>
                    </v-flex> <!--popup to add projects below -->
               </v-layout>            
      <!---multi leve finish ---------->
    <v-list dense>
       <template  v-for="item in items1" >
        <template v-if="item.dashboard == false">
          <v-list-group id="aa"  :value="false" :prepend-icon="item.action" 
                :key="item.title" >
             <v-list-item slot="activator"  >
              <v-list-item-content>
                <v-list-item-title  >{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item  v-for="(cRoute, idx) in item.items" :to="{ name: cRoute.title }" :key="idx">
              <v-list-item-action>  <v-icon>{{  }}</v-icon>  </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ cRoute.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
           <template v-else>
          <v-list-item  :to="{ name: items1.title }" :key="items1.title">
            <v-list-item-action><v-icon>{{ items1.action }}</v-icon></v-list-item-action>
            <v-list-item-content> <v-list-item-title>{{ items1.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </template>
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
     
      items1: [
         
          { action: 'mdi-school', dashboard:false,title: 'Dining',items: [
              { title: 'Breakfast & brunch' },
              { title: 'New American' },
              { title: 'Sushi' },
            ],
          },
          { action: 'mdi-school', title: 'Education',dashboard:false, items: [ { title: 'List Item' }, ], },
          { action: 'mdi-school', title: 'Family', dashboard:false,items: [{ title: 'List Item' },], },
          { action: 'mdi-school', title: 'Health',dashboard:false, items: [ { title: 'List Item' },  ],},
          { action: 'mdi-school',  title: 'Office',dashboard:false, items: [{ title: 'List Item' },  ],  },
          { action: 'mdi-school', title: 'Promotions',dashboard:false, items: [ { title: 'List Item' }, ],},
          { action: 'mdi-school', title: 'dashboard',dashboard:true, items: [ { title: 'List Item' }, ],},
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
#dashboard-l:hover{
background-color:rgb(123,196,189)
}
#dashboard-l:active{
background-color:rgb(123,196,189)
}
#dashboard-l:focus{
background-color:rgb(123,196,189)
}

</style>