import Vue from 'vue';
import axios from 'axios';
import * as types from '../types';
import * as api from '../config';
export default
{
  state: {sawlist:null,joblist:null  },
  getters:{
      
  },
  mutations: 
  { 
   
     [types.GET_SAW_SAWLIST ] (state, payload) 
        { state.sawlist = payload.sawlist; },
     [types.GET_SAW_JOBLIST ] (state, payload) 
        {  state.joblist = payload.joblist; console.log('state=',state) }
  
  },
  actions: 
  { 
      async getsaws({commit}, formData)
        { let resp= await axios.post(api.getsaws,formData);
          commit({type:types.GET_SAW_SAWLIST ,  sawlist: resp.data} );        
        },
      async getJobs ({commit,dispatch}, formData) 
        { console.log('formdata=',formData)  
          let res= await axios.post(api.getJobs, formData)
          console.log('joblist=res.data',res.data); 
          commit({type: types.GET_SAW_JOBLIST, joblist: res.data} );  
          return res;  
        },
  }
}
