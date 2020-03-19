import Vue from 'vue';
import axios from 'axios';
import * as types from '../types';
import * as api from '../config';
export default
{
  state: {sawlist:null,joblist:null, selectedSaw:null, },
  getters:{
      
  },
  mutations: 
  { 
   
     [types.GET_SAW_SAWLIST ] (state, payload) 
        { state.sawlist = payload.sawlist;
         console.log('/store/saw.js-types.GET_SAW_SAWLIST state=', state);
       },
     [types.GET_SAW_JOBLIST ] (state, payload) 
        {  state.joblist = payload.joblist;  
         console.log('/store/saw.js-types.GET_SAW_JOBLIST state=', state);
      },
     [types.SET_SELECTED_SAW] (state, payload) 
        {  // console.log('/store/saw.js-types.SET_SELECTED_SAW payload=', payload);
          //  console.log('/store/saw.js-types.SET_SELECTED_SAW state=', state);
            state.selectedSaw=payload.selectedSaw.SawCode;
            console.log('/store/saw.js-types.SET_SELECTED_SAW state=', state);
        },
  
  },
  actions: 
  { 
      async getsaws({commit}, formData)
        { let resp= await axios.post(api.getsaws,formData);
          commit({type:types.GET_SAW_SAWLIST ,  sawlist: resp.data} );        
        },
      async getJobs ({commit,dispatch}, formData) 
        { 
          let res= await axios.post(api.getJobs, formData)
         
          commit({type: types.GET_SAW_JOBLIST, joblist: res.data} );  
          return res;  
        },
     selectedSaw: ({commit}, data) => {commit({  type: types.SET_SELECTED_SAW ,selectedSaw: data   });  },
     async updateJobList ({dispatch}, formData) 
        { 
             console.log('updateJobList-- formData=', formData);
             let res= await axios.post(api.updateJobList, formData)
             dispatch('getJobs',formData);
             return res; 
        },
     async getjobdetails ({commit,dispatch}, formData)
        {   let res= await axios.post(api.getjobdetails, formData)
            console.log('getjobdetails-- res=', res);
           
        },
      
  }
}
