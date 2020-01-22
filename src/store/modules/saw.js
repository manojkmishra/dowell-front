import Vue from 'vue';
import axios from 'axios';
import * as types from '../types';
import * as api from '../config';
export default{
 // namespaced:true,
  state: {sawlist:null,  },
  getters:{
      
  },
  mutations: 
  { 
   
    [types.GET_SAW_SAWLIST ] (state, payload) 
        {
          state.sawlist = payload.sawlist;   
          console.log('GET_SAW_SAWLIST-state=',state); 
         },
  
  },
  actions: 
  { //actions take first option as dispatch(action) or commit(mutation)
      async getsaws({commit}, formData)
      {// console.log(api.getsaws,this.formData)
     
        let resp= await axios.post(api.getsaws,formData);
       // let resp= await axios.post('/saw/getsaws',formData);
        console.log('getsaws-res=',resp);
        commit({type:types.GET_SAW_SAWLIST ,  sawlist: resp.data} );
        
        },
  }
}
