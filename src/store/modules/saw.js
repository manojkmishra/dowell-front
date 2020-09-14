import Vue from 'vue';
import axios from 'axios';
import * as types from '../types';
import * as api from '../config';
export default
{
  state: {sawflags:null,sawstatus:null,sawlist:null,joblist:null, selectedSaw:null,
          jobdetailslist:null,selectedJob:null,selectedJobDetail:null,profilecutting:null,
          cutlist:null,flaggedjob:null,sawprints:null, sawoptions:null,
        },
  getters:{
      
  },
  mutations: 
  { 
    [types.GET_SAW_FLAGS ] (state, payload) 
    { state.sawflags = payload.sawflags;
     console.log('/store/saw.js-types.GET_SAW_FLAGS state=', state);
    },
    [types.GET_SAW_PRINTS ] (state, payload) 
    { state.sawprints = payload.sawprints;
     console.log('/store/saw.js-types.GET_SAW_PRINTS state=', state);
    },
   [types.GET_SAW_STATUS ] (state, payload) 
   { state.sawstatus = payload.sawstatus;
    console.log('/store/saw.js-types.GET_SAW_STATUS state=', state);
    },
     [types.GET_SAW_SAWLIST ] (state, payload) 
        { state.sawlist = payload.sawlist; let options = [];
          for (let status in payload.sawlist) 
          { options.push({value:payload.sawlist[status].SawCode});  }
          state.sawoptions = options;
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
        [types.GET_FLAGGED_JOB] (state, payload) 
        {   console.log('/store/saw.js-types.GET_FLAGGED_JOB payload=', payload);
            console.log('/store/saw.js----GET_FLAGGED_JOB state=', state);
            state.flaggedjob = payload.flaggedjob; 
        },
 
  },
  actions: 
  {  
      async getsaws({commit}, formData)
        { let res= await axios.post(api.getsaws,formData);
          commit({type:types.GET_SAW_SAWLIST ,  sawlist: res.data} ); 
          return res;         
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
  async updatetransferjob({dispatch}, formData)
  {  console.log('transferjob-formdata',formData);
    let res= await axios.post(api.updatetransferjob, formData)  
    .then((response) => {  console.log('transferjob--- response',response.data);  
                            var fdqt=formData.order_ID;
                            swal.fire({
                              position: 'top-right',
                              title:'<span style="color:white">Selected Jobs have been transferred</span>',
                                timer: 2000, toast: true,background: 'purple',
                              });
                            console.log('transferjob-resok-getjobs-formdata',formData);
                            dispatch('getJobs',formData);
                          })
    .catch((error) => {console.log('transferjob-error',error)});
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
    async exttosawjd ({dispatch}, formData)
     {   console.log('extToSawCut-- formData=', formData);
          let res= await axios.post(api.exttosawjd, formData)  
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
              .catch((error) => {console.log('extToSawjd-error',error)
            
            });
                              return res;  
     },
     //------------------------------------------
     async fixstatus ({dispatch}, formData)
     {   console.log('fixstatus-vuex- formData=', formData);
          let res= await axios.post(api.fixstatus, formData)  
          .then((response) => {  
            console.log('fixstatus-vuex- res=', response);
                            })
              .catch((error) => {console.log('fixstatus-vuex-error',error)
            
            });
                              return res;  

     },

     //------------------------------------------
     async sawprint ({dispatch}, formData)
     {   console.log('sawprint-- formData=', formData);
          let res= await axios.post(api.sawprint, formData)  
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
              .catch((error) => {console.log('sawprint-error',error)
            
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
async updateScrapList ({dispatch}, formData)
{ let res= await axios.post(api.updateprofilecut, formData)   
  .then((response) => {  console.log('updateprofilecut--- response',response);  
        swal.fire({
          position: 'top-right',
          title:'<span style="color:white">Cut List updated</span>',
            timer: 2000, toast: true,background: 'purple',
          });
          dispatch('getcutlist',formData);  
      })
    .catch((error) => {console.log('updateprofilecut-error',error)});
    return res;
},
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
   //jdetails buttons--------------------
   async cutall ({dispatch}, formData) 
   {  let res= await axios.post(api.cutallself, formData)  
            .then(response => { 
                                dispatch('getjobdetails',formData);
                                dispatch('getJobs',formData);
            })
          .catch(response => { console.log('cutall-error',error); reject();   });
   },
//------------------------------flag-------------------
  async updateFlag ({commit,dispatch}, formData) 
  { console.log('updateflag--- formData',formData); 
    let res= await axios.post(api.updateFlag, formData)  
    .then(res => { commit({type:types.GET_FLAGGED_JOB ,  flaggedjob: res.data} ); 
                        dispatch('getJobs',formData);
                    })
    .catch(error => { console.log('updateFlag-error',error); reject();   });
    
    return res;
  },

  //=========================Flag Table========================
  async getsawflags ({commit,dispatch}) 
  { let res= await axios.get(api.getsawflags);  
    commit({type:types.GET_SAW_FLAGS ,  sawflags: res.data} ); 
    return res;    },
  async addflag ({dispatch}, formData)
  {   console.log('addflag-- formData=', formData);
        let res= await axios.post(api.addflag, formData)  
              .then(response => { dispatch('getsawflags');  })
              .catch(response => {    });
          return res;
  },
  async editflag ({dispatch}, formData)
  {   console.log('addflag-- formData=', formData);
        let res= await axios.post(api.editflag, formData)  
              .then(response => { dispatch('getsawflags');  })
              .catch(response => {    });
          return res;
  },
  async deleteflag ({dispatch}, formData)
  {   console.log('addflag-- formData=', formData);
        let res= await axios.post(api.deleteflag, formData)  
              .then(response => { dispatch('getsawflags');  })
              .catch(response => {    });
          return res;
  },
  //---------------------------------------
  async getsawprint ({commit,dispatch}) 
  { let res= await axios.get(api.getsawprint);  
    commit({type:types.GET_SAW_PRINTS ,  sawprints: res.data} ); 
    return res;    
  },
  async addsawprint ({dispatch}, formData)
  {   console.log('addsawprint-- formData=', formData);
        let res= await axios.post(api.addsawprint, formData)  
              .then(response => { dispatch('getsawprint');  })
              .catch(response => {    });
          return res;
  },
  async editsawprint ({dispatch}, formData)
  {   console.log('sawprint-- formData=', formData);
        let res= await axios.post(api.editsawprint, formData)  
              .then(response => { dispatch('getsawprint');  })
              .catch(response => {    });
          return res;
  },
  async deletesawprint ({dispatch}, formData)
  {   console.log('sawprint-- formData=', formData);
        let res= await axios.post(api.deletesawprint, formData)  
              .then(response => { dispatch('getsawprint');  })
              .catch(response => {    });
          return res;
  },

  //------------------------------------
  async getsawstatus ({commit,dispatch}) 
  { let res= await axios.get(api.getsawstatus);   
    commit({type:types.GET_SAW_STATUS ,  sawstatus: res.data} );
     return res;    
  },
  async addstatus ({dispatch}, formData)
  {   console.log('addstatus-- formData=', formData);
        let res= await axios.post(api.addstatus, formData)  
              .then(response => { dispatch('getsawstatus');  })
              .catch(response => {    });
          return res;
  },
  async editstatus ({dispatch}, formData)
  {   console.log('editstatus-- formData=', formData);
        let res= await axios.post(api.editstatus, formData)  
              .then(response => { dispatch('getsawstatus');  })
              .catch(response => {    });
          return res;
  },
  async deletestatus ({dispatch}, formData)
  {   console.log('delete-- formData=', formData);
        let res= await axios.post(api.deletestatus, formData)  
              .then(response => { dispatch('getsawstatus');  })
              .catch(response => {    });
          return res;
  },

  //=============================
    }//actions finish
}
