import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import saw from './modules/saw'
import user from './modules/user'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {  },
  mutations: {  },
  actions: {  },
  modules: { auth ,saw,user }
})
