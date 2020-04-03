import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import vuetify from './plugins/vuetify';
import {initialize} from './store/helper';
import '@/styles/index.scss';
import '@mdi/font/css/materialdesignicons.css'
require ('@/plugins/Sweetalert');

require('@/store/subscriber')  
//axios.defaults.baseURL='http://127.0.0.1:8000/api'
axios.defaults.baseURL='//uat.oms.dowell.com.au/api'

Vue.config.productionTip = false
initialize(store, router);
Vue.use(vuetify, {
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})
store.dispatch('auth/attempt',localStorage.getItem('token'))
.then(()=>{
      new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
      }).$mount('#app')
})

