import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/SignIn.vue'
//import Dashboard from '../views/Dashboard.vue'
import Dashboard from '../components/Dashboard/Dashboard.vue'
import saw from '@/components/saw/Saw.vue'
import joblist from '@/components/saw/joblist/sawjobs.vue'
import jobdetails from '@/components/saw/jobdetails/jobdetails.vue'
import profilecutting from '@/components/saw/pcutting/pcutting.vue'
import sawschedules from '@/components/saw/dbtables/sawschedules/sawschedules.vue'
import user from '@/components/users/user.vue'


Vue.use(VueRouter)
const routes = [

  { path: '/',   name: 'dashboard',   component: Dashboard ,meta: { requiresAuth: true  }, } ,
  { path: '/login',   name: 'login',   component: Login  } ,
//  { path: '/dashboard',   name: 'dashboard',   component: Dashboard,meta: { requiresAuth: true  }, } ,
  { path: '/user',name:'user', component: user,meta: { requiresAuth: true }},
  { path: '/sawschedules',name:'sawschedules', component: sawschedules,meta: { requiresAuth: true }},
  { path: '/saw',name:'saw', component: saw,meta: { requiresAuth: true }},
  { path: '/saw/joblist',name:'joblist', component: joblist,meta: { requiresAuth: true }},
  { path: '/saw/jobdetails',name:'jobdetails', component: jobdetails,meta: { requiresAuth: true }},
  { path: '/saw/profilecutting',name:'profilecutting', component: profilecutting,meta: { requiresAuth: true }},
  { path: '/404', component: () => import('@/views/App404.vue'),meta: { requiresAuth: true  }, },
  { path: '*', redirect: '/404' },
]
const router = new VueRouter({
  mode: 'history', base: process.env.BASE_URL, routes
})

export default router
