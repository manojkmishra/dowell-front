import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/SignIn.vue'
//import Dashboard from '../views/Dashboard.vue'
import Dashboard from '../components/Dashboard/Dashboard.vue'
import store from '@/store'
import sawdashboard from '@/components/saw/Saw.vue'
import test from '@/components/test/test.vue'

Vue.use(VueRouter)
const routes = [

  { path: '/',   name: 'dashboard',   component: Dashboard ,meta: { requiresAuth: true  }, } ,
  { path: '/login',   name: 'login',   component: Login  } ,
//  { path: '/dashboard',   name: 'dashboard',   component: Dashboard,meta: { requiresAuth: true  }, } ,
  { path: '/saw', component: sawdashboard,meta: { requiresAuth: true }},
  { path: '/404', component: () => import('@/views/App404.vue'),meta: { requiresAuth: true  }, },
  { path: '*', redirect: '/404' },
]
const router = new VueRouter({
  mode: 'history', base: process.env.BASE_URL, routes
})

export default router
