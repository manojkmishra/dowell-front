import Vue from 'vue';
import axios from 'axios';
import * as types from '../types';
import * as api from '../config';
export default{
 // namespaced:true,
  state: {userlist:null,  },
  getters:{
      
  },
  mutations: 
  { 
   
    [types.GET_USER_LIST ] (state, payload) 
        {
          state.userlist = payload.userlist;   
          console.log('/store---types.GET_USER_LIST state=', state);
         },
  
  },
  actions: 
  { //actions take first option as dispatch(action) or commit(mutation)
      async getusers({commit})
      { let resp= await axios.get(api.users);

        commit({type:types.GET_USER_LIST ,  userlist: resp.data} );
        
      },
      
  }
}
