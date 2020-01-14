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
               <v-list  dense rounded>
                  
      <!---multi leve finish ---------->
      <template v-for="(route, index) in routes">
        <template v-if="route.meta && route.meta.hasMulSub">
          <v-list-group id="aa" v-if="roleShow(route)" :value="false" :prepend-icon="route.meta && route.meta.icon" 
                :key="index" >
             <v-list-item slot="activator"  >
              <v-list-item-content>
                <v-list-item-title  >{{ route.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item  v-for="(cRoute, idx) in route.children" :to="{ name: cRoute.name }" :key="idx">
              <v-list-item-action>  <v-icon>{{ cRoute.meta && cRoute.meta.icon }}</v-icon>  </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ cRoute.name, route }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
           <template v-else>
          <v-list-item v-if="roleShow(route)"  :to="{ name: route.name }" :key="index">
            <v-list-item-action><v-icon>{{ route.meta && route.meta.icon }}</v-icon></v-list-item-action>
            <v-list-item-content> <v-list-item-title>{{ route.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </template>
      <!------  -->
              </v-list>
            </v-navigation-drawer>
      </div>

    </nav>
 
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import {mapGetters, mapActions} from 'vuex'

export default {
  
     data(){return{ ps: null,drwr:true, links: [
        { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/dashboard' , },
        { icon: 'mdi-folder', text: 'My Projects', route: '/projects' },
        { icon: 'mdi-account', text: 'Team', route: '/team' },
      ], snackbar:false,
      admins: [ ['Management', 'mdi-folder'], ['Settings', 'mdi-folder'], ],
      cruds: [ ['Create', 'mdi-folder'], ['Read', 'mdi-folder'],
        ['Update', 'mdi-folder'], ['Delete', 'mdi-folder'],
      ],
      arr1:[{path:"/dashboard",name:"Dashboard", meta:{hasMulSub:false}},
            {path:"/tables",name:"Tables", meta:{hasMulSub:true,icon:"mdi-folder"},
             children:[{path:"/table-inline-edit", name:"Tabelinlineedit", meta:{}},
                       {path:"/table-inline-edit", name:"Tabelinlineedit2",meta:{}}
                      ]
            },
            {path:"/tables1",name:"Tables1", meta:{hasMulSub:true,icon:"mdi-folder"},
             children:[{path:"/table-inline-edit1", name:"Tabelinlineedit1", meta:{icon:"mdi-folder"}},
                       {path:"/table-inline-edit11", name:"Tabelinlineedit12",meta:{icon:"mdi-folder"}}
                    ]
            }
          ],
         } //return complete
    },
    computed:{
        ...mapGetters({authenticated:'auth/authenticated',
                       user:'auth/user'
                      }),
           routes() { const routeName = this.$route.name;
               const { routes } = this.$router.options;
               console.log('sidebar-routes=',routes)
               // console.log('sidebar-routes[2].children=',routes[2].children)
               try { for (let i = 0, len = routes.length; i < len; i += 1) 
                        { if (routes[i].children) 
                            { for (let j = 0, len = routes[i].children.length; j < len; j += 1) 
                                  { const child = routes[i].children[j];
                                    if (child.name === routeName) { return routes[i].children; }
                                   }
                            } else if (routes[i].name === routeName) { return routes[i]; }
                        }
                    } catch (err) { console.log('>>>sidebar', err);  }
                    console.log('sidebar-routes2.children=',routes[2].children)
                     console.log('sidebar-arr1=',this.arr1)
                return routes[2].children;
              },
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
        roleShow(route) 
           {  // hack, there is no user when logout
             if (!route.meta) { return true; }
             if (!this.user || route.meta.hidden) { return false; }
             const { auth } = route.meta;
            // return auth ? (!auth.length && !this.user.role) || auth.includes(this.user.role) : !auth;
             return true;
             },
            toggleSidebar() { this.drawer = !this.drawer;  },
            toggleTemporary(val) { this.temporary = val; },
           
    },
    
}
</script>
<style scoped>

#aa:before {
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
#aa:after{

 content: '';
    height: 1px;
    left: 1rem;
    position: absolute;
    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    width: 87%;
    justify-content: center;
 
   
}

</style>