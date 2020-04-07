import Vue from 'vue';
import axios from 'axios';
import * as types from '../types';
import * as api from '../config';
export default
{
  state: {sawlist:null,joblist:null, selectedSaw:null,jobdetailslist:null,
          selectedJob:null,selectedJobDetail:null,profilecutting:null,
          cutlist:null,
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
        [types.GET_SAW_CUTLIST] (state, payload) 
        {   console.log('/store/saw.js-types.GET_SAW_CUTLIST payload=', payload);
            console.log('/store/saw.js----GET_SAW_CUTLIST state=', state);
            state.cutlist = payload.cutlist; 
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
     async updateJobList ({dispatch}, formData) //to update cut_saw in the tables
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
//-----------------------------------------------------------------
      async getsawschedules () 
      { let res= await axios.get(api.getsawschedules);   return res;  },
      async getsawbars ({commit,dispatch}) 
      { let res= await axios.get(api.getsawbars) ;  return res;    },
      async getsawcuts ({commit,dispatch}) 
      { let res= await axios.get(api.getsawcuts);      return res;   },
      async getsawflags ({commit,dispatch}) 
      { let res= await axios.get(api.getsawflags);  return res;    },
      async getsawstatus ({commit,dispatch}) 
      { let res= await axios.get(api.getsawstatus);    return res;    },
//-------------------------------------------------------------
  async getcutlist({commit,dispatch}, formData)
      {   let res= await axios.post(api.getcutlist, formData)
          console.log('api.getcutlist-- res=', res);
          commit({type: types.GET_SAW_CUTLIST, cutlist: res.data} );  
          return res;         
      },
  //--------------------cutall on joblist page--------------------------
  async jobcutall({dispatch}, formData)
  {  let res= await axios.post(api.cutall, formData) 
    .then((response) => {  console.log('cutall--- response',response.data);  
                            var fdqt=formData.order_ID;
                            swal.fire({
                              position: 'top-right',
                              title:'<span style="color:white">Job Done </span>',
                              html:'<span style="color:white">'+`OrderNo-${formData.order_ID}`+'</span>',
                                timer: 3000, toast: true,background: 'purple',
                              });
                            dispatch('getJobs',formData);
                          })
    .catch((error) => {console.log('cutall-error',error)});
    return res;
  },
  //-----------------------------------------------
  async updatecutselectjob({dispatch}, formData)
  {  let res= await axios.post(api.updatecutselectjob, formData)  
    .then((response) => {  console.log('cutall--- response',response.data);  
                            var fdqt=formData.order_ID;
                            swal.fire({
                              position: 'top-right',
                              title:'<span style="color:white">Selected Jobs have been cut</span>',
                                timer: 2000, toast: true,background: 'purple',
                              });
                            dispatch('getJobs',formData);
                          })
    .catch((error) => {console.log('cutall-error',error)});
    return res;
  },
  //=========================profilecut page=============================
  async updateprofilecut ({dispatch}, formData)
  { let res= await axios.post(api.updateprofilecut, formData)   
    .then((response) => {  console.log('updateprofilecut--- response',response);  
          swal.fire({
            position: 'top-right',
            title:'<span style="color:white">Profile Cut List updated</span>',
              timer: 2000, toast: true,background: 'purple',
            });
            dispatch('getprofilecutting',formData);
        })
      .catch((error) => {console.log('updateprofilecut-error',error)});
      return res;
  },
//-------------------------------------
async updateOptCut({dispatch}, formData) 
    { let res= await axios.post(api.updateOptCut, formData)   
      .then((response) => {  console.log('updateprofilecut--- response',response);  
      swal.fire({
        position: 'top-right',
        title:'<span style="color:white">OptCut List updated</span>',
          timer: 2000, toast: true,background: 'purple',
        });
       dispatch('getprofilecutting',formData);
       //commit({type: types.GET_SAW_PROFILECUTTING, profilecutting: response.data} ); 
    })
    .catch((error) => {console.log('optcut-error',error)});
    return res;  
  },
     //----------------------------
     async extToSawCut ({dispatch}, formData)
     {   console.log('extToSawCut-- formData=', formData);
          let res= await axios.post(api.exttosawcut, formData)  
          .then((response) => {  
                            var aa=`${response.data[0].flag}:${response.data[0].message}`
                                if(response.data[0].flag=="Success")
                                { swal.fire({ position: 'top-right',
                                 html:'<span style="color:white">'+`${aa}`+'</span>',
                                 timer: 2000, toast: true,background: 'green',});
                              }else{
                                swal.fire({ position: 'top-right',
                                 html:'<span style="color:white">'+`OrderNo-${aa}`+'</span>',
                                 timer: 2000, toast: true,background: 'red',});
                              }
                            })
              .catch((error) => {console.log('extToSawCut-error',error)
            
            });
                              return res;  

     },
   async  reOptimiseCut({dispatch}, formData)  
      {  console.log('reOptimiseCut-- formData=', formData);
        let res= await axios.post(api.reoptimisecut, formData) 
                  .then((response) => 
                      {  var aa=`${response.data[0].flag}:${response.data[0].message}`
                        console.log('reOptimiseCut--- response',response);  
                          swal.fire({
                          position: 'top-right',
                          html:'<span style="color:white">'+`${aa}`+'</span>',
                          timer: 2000, toast: true,background: 'green',
                              });
                      })
                  .catch((error) => {
                    swal.fire({ position: 'top-right', html:'<span style="color:white">'+`${error}`+'</span>',
                                timer: 2000, toast: true,background: 'red',
                              });
                          });
                  return res;   
      },
//====================scrap=cutlist page=========================
//---------------------------------------------
async updateselectedcutlist({dispatch}, formData) 
  {  console.log('updateScrapList-- formData=', formData);
    let res= await axios.post(api.updateselectedcutlist, formData)   
    .then((response) => {  console.log('updateselectedcutlist--- response',response);            
            dispatch('getcutlist',formData);            
        })
      .catch((error) => {console.log('updateprofilecut-error',error)});
      return res;
   },

   //-----------------------------------

  //--------------------------------------------
    }//actions finish
}
