import Vue from 'vue';
import axios from 'axios';
import * as types from '../types';
import * as api from '../config';
export default
{
  state: {sawlist:null,joblist:null, selectedSaw:null,jobdetailslist:null,
          selectedJob:null,selectedJobDetail:null,profilecutting:null,sawschedules:null,
        },
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
            state.selectedSaw=payload.selectedSaw.SawCode;
            console.log('/store/saw.js-types.SET_SELECTED_SAW state=', state);
        },
      [types.GET_SAW_JOBDETAILSLIST ] (state, payload) 
        {  state.jobdetailslist = payload.jobdetailslist;  
           console.log('/store/saw.js-types.GET_SAW_JOBDETAILSLIST state=', state);
        },
        [types.SET_SELECTED_JOB] (state, payload) 
        {   state.selectedJob=payload.selectedJob;
            console.log('/store/saw.js-types.SET_SELECTED_JOB state=', state);
           
        },
        [types.SET_SELECTED_JOBDETAIL] (state, payload) 
        {   state.selectedJobDetail=payload.selectedJobDetail;
            console.log('/store/saw.js-types.SET_SELECTED_JOBDETAIL state=', state);
        },
        [types.GET_SAW_PROFILECUTTING] (state, payload) 
        {   console.log('/store/saw.js-types.GET_SAW_PROFILECUTTING payload=', payload);
            console.log('/store/saw.js----GET_SAW_PROFILECUTTING state=', state);
            state.profilecutting = payload.profilecutting; 
        },
        [types.GET_SAW_SCHEDULES ] (state, payload) 
        {  state.sawschedules = payload.sawschedules;  
         console.log('/store/saw.js-types.GET_SAW_SCHEDULES state=', state);
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
            commit({type: types.GET_SAW_JOBDETAILSLIST, jobdetailslist: res.data} );  
            return res;
           
        },
      selectedJob: ({commit}, data) => {commit({  type: types.SET_SELECTED_JOB ,selectedJob: data   });  },
      selectedJobDetail: ({commit}, data) => {commit({  type: types.SET_SELECTED_JOBDETAIL ,selectedJobDetail: data   });  },
      async getprofilecutting ({commit,dispatch}, formData)
      {   let res= await axios.post(api.getprofilecutting, formData)
          console.log('api.getprofilecutting-- res=', res);
          commit({type: types.GET_SAW_PROFILECUTTING, profilecutting: res.data} );  
          return res;         
      },
      async getsawschedules ({commit,dispatch}) 
      { 
        let res= await axios.get(api.getsawschedules)
        commit({type: types.GET_SAW_SCHEDULES, sawschedules: res.data} );  
        return res;  
      },
  }
}
