import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import Dashboard from '../views/Dashboard.vue'
import store from '@/store'


Vue.use(VueRouter)
const routes = [

 // {    path: '/',   name: 'home',   component: SignIn  } ,
  {    path: '/',   name: 'signin',   component: SignIn  } ,
  {    path: '/dashboard',   name: 'dashboard',   component: Dashboard,
         
  
          beforeEnter:(to,from,next)=>{
             console.log('to=',to)
             console.log('from=',from)
             console.log('store.getters=',store.getters)
             if(!store.getters['auth/authenticated']){return next({name:'signin'})}
             next()
          }
  } ,
  { path: '/403', meta: { hidden: true, },component: SignIn, }, // redirect: { name: 'Index' },
  { path: '/404', meta: { hidden: true, },component: () => import('@/views/App404.vue'), },
  { path: '*', redirect: '/404', meta: { hidden: true, }, },
]
const router = new VueRouter({
  mode: 'history', base: process.env.BASE_URL, routes
})

export default router
