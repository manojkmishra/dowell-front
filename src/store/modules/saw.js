import Vue from 'vue';
import axios from 'axios';
import * as types from '../types';
import * as api from '../config';
export default
{
  state: {sawflags:null,locations:null,sawstatus:null,sawlist:null,joblist:null, selectedSaw:null,
          jobdetailslist:null,selectedJob:null,selectedJobDetail:null,profilecutting:null,
          cutlist:null,flaggedjob:null,sawprints:null, sawoptions:null,trucklist:null,
          getorder:null,getwomaterial:null,
      getwooperation:null,getwomaterial:null,getopresources:null,getworeservation:null,getorderlines:null
        },
  getters:{
      
  },
  mutations: 
  { 
    [types.GET_LOCATIONS ] (state, payload) 
    { state.locations = payload.locations;
     console.log('/store/saw.js-types.GET_LOCATIONS state=', state);
    },
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
        [types.GET_TRUCKLIST ] (state, payload) 
          { state.trucklist = payload.trucklist;
          console.log('/store/saw.js-types.GET_TRUCKLIST state=', state);
          },
          [types.GET_WOMATERIAL ] (state, payload) 
          { state.getwomaterial = payload.getwomaterial;
           console.log('/store/saw.js-types.GET_WOMATERIAL state=', state);
          },
            [types.GET_ORDERLINES ] (state, payload) 
          { state.getorderlines = payload.getorderlines;
           console.log('/store/saw.js-types.GET_ORDERLINES state=', state);
          },
          [types.GET_OPMATERIAL ] (state, payload) 
          {  state.getopmaterial=null;
                state.getopmaterial = payload.getopmaterial;
           console.log('/store/saw.js-types.GET_OPMATERIAL state=', state);
          },
          [types.GET_OPRESOURCES ] (state, payload) 
          {  state.getopresources=null;
                state.getopresources = payload.getopresources;
           console.log('/store/saw.js-types.GET_OPRESOURCES state=', state);
          },
          [types.GET_WOOPERATION ] (state, payload) 
          { state.getwooperation = payload.getwooperation;
           console.log('/store/saw.js-types.GET_WOOPERATION state=', state);
          },
          [types.GET_WORESERVATION ] (state, payload) 
          { state.getworeservation = payload.getworeservation;
           console.log('/store/saw.js-types.GET_WORESERVATION state=', state);
          },
          [types.GET_ORDER ] (state, payload) 
          { state.getorder = payload.getorder;
           console.log('/store/saw.js-types.GET_ORDER state=', state);
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
     async sawprint ({dispatch}, formData) //job details page print
     {   console.log('sawprint-- formData=', formData);
          let res= await axios.post(api.sawprint, formData)  
          .then((response) => {  
                           console.log('sawprint-res',response)
                                if( response.data[0] !=null )
                                { if(response.data[0].flag=="Success"){
                                  var aa=`${response.data[0].flag}:${response.data[0].message}`
                                  
                                  swal.fire({ position: 'top-right',
                                 html:'<span style="color:white">'+`${aa}`+'</span>',
                                 timer: 2000, toast: true,background: 'green',});
                                } 

                              }
                              else{
                                swal.fire({ position: 'top-right',
                                // html:'<span style="color:white">'+`OrderNo-${aa}`+'</span>',
                                 //html:'<span style="color:white">'+`Print Error`+'</span>',
                                 html:'<span style="color:white">'+`No Flag`+'</span>',
                                 timer: 2000, toast: true,background: 'red',});
                              }
                            })
              .catch((error) => {console.log('sawprint-error',error)
            
            });
                              return res;  

     },
     async printjoblist ({dispatch}, formData) //job details page print
     {   console.log('sawprint-- formData=', formData);
          let res= await axios.post(api.printjoblist, formData)  
          .then((response) => {  
                           
                                if( response.data[0] !=null )
                                { if(response.data[0].flag=="Success"){
                                  var aa=`${response.data[0].flag}:${response.data[0].message}`
                                      swal.fire({ position: 'top-right',
                                    html:'<span style="color:white">'+`${aa}`+'</span>',
                                    timer: 2000, toast: true,background: 'green',});
                                } 
                              }else{
                                swal.fire({ position: 'top-right',
                                 //html:'<span style="color:white">'+`OrderNo-${aa}`+'</span>',
                                // html:'<span style="color:white">'+`Print Error`+'</span>',
                                 html:'<span style="color:white">'+`No Flag`+'</span>',
                                 timer: 2000, toast: true,background: 'red',});
                              }
                            })
              .catch((error) => {console.log('joblistprint-error',error)
            
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
    .then(res => { 
                     // commit({type:types.GET_FLAGGED_JOB ,  flaggedjob: res.data} ); 
                        dispatch('getJobs',formData);
                    })
    .catch(error => { console.log('updateFlag-error',error); reject();   });
    
    return res;
  },

  //=========================Flag Table========================
  async getlocations({commit}, dispatch)
  { let res= await axios.get(api.getlocations);
    commit({type:types.GET_LOCATIONS ,  locations: res.data} ); 
    return res;         
  },
  async gettrucklist ({commit,dispatch}) 
  { let res= await axios.get(api.gettrucklist);  
    commit({type:types.GET_TRUCKLIST ,  trucklist: res.data} ); 
    return res;    
  },
  async addtruck ({dispatch}, formData)
  {   console.log('addtruck-- formData=', formData);
        let res= await axios.post(api.addtruck, formData)  
              .then(response => { dispatch('gettrucklist');  })
              .catch(response => {    });
          return res;
  },
  async edittruck ({dispatch}, formData)
  {   console.log('gettrucklist-- formData=', formData);
        let res= await axios.post(api.edittruck, formData)  
              .then(response => { dispatch('gettrucklist');  })
              .catch(response => {    });
          return res;
  },
  async deletetruck ({dispatch}, formData)
  {   console.log('deletetruck-- formData=', formData);
        let res= await axios.post(api.deletetruck, formData)  
              .then(response => { dispatch('gettrucklist');  })
              .catch(response => {    });
          return res;
  },
  async changetruck ({dispatch}, formData)
  {   console.log('changetruck-- formData=', formData);
        let res= await axios.post(api.changetruck, formData)  
              .then(response => { console.log('changetruck res=',response)  })
              .catch(response => {    });
          return res;
  },
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
  //=======================erp================
  async getorder ({commit,dispatch},formData) 
    { //let res= await axios.get(api.getorder,{params:{'orderkey':formData}});  
    let res=axios.get(`/take5/getorder`,{params:{'orderkey':formData}})
    .then(res => {
          commit({type:types.GET_ORDER ,  getorder: res} )
      } )
      return res;    
    },
    async getwomaterial ({commit,dispatch},formData) 
    { //let res= await axios.get(api.getorder,{params:{'orderkey':formData}});  
    let res=axios.get(`/saw/getwomaterial`,{params:{'WorkOrderId':formData}})
    .then(res => {
          commit({type:types.GET_WOMATERIAL ,  getwomaterial: res} )
      } )
      return res;    
    },
      async getorderlines ({commit,dispatch},formData) 
    { //let res= await axios.get(api.getorder,{params:{'orderkey':formData}});  
    let res=axios.get(`/saw/getorderlines`,{params:{'orderkey':formData}})
    .then(res => {
          commit({type:types.GET_ORDERLINES ,  getorderlines: res} )
      } )
      return res;    
    },
    async getopmaterial ({commit,dispatch},formData) 
    { //let res= await axios.get(api.getorder,{params:{'orderkey':formData}});  
    let res=axios.get(`/saw/getopmaterial`,{params:{'WorkOrderId':formData.WorkOrderId, 'WorkOrderOperationId': formData.WorkOrderOperationId}})
    .then(res => { 
          commit({type:types.GET_OPMATERIAL ,  getopmaterial: res} )
      } )
      return res;    
    },
    async getopresources ({commit,dispatch},formData) 
    { //let res= await axios.get(api.getorder,{params:{'orderkey':formData}});  
    let res=axios.get(`/saw/getopresources`,{params:{'WorkOrderId':formData.WorkOrderId, 'WorkOrderOperationId': formData.WorkOrderOperationId}})
    .then(res => { 
          commit({type:types.GET_OPRESOURCES ,  getopresources: res} )
      } )
      return res;    
    },
    async getwooperation ({commit,dispatch},formData) 
    { //let res= await axios.get(api.getorder,{params:{'orderkey':formData}});  
    let res=axios.get(`/saw/getwooperation`,{params:{'WorkOrderId':formData}})
    .then(res => {
          commit({type:types.GET_WOOPERATION ,  getwooperation: res} )
      } )
      return res;    
    },
    async getworeservation ({commit,dispatch},formData) 
    { //let res= await axios.get(api.getorder,{params:{'orderkey':formData}});  
    let res=axios.get(`/saw/getworeservation`,{params:{'WorkOrderId':formData}})
    .then(res => {
          commit({type:types.GET_WORESERVATION ,  getworeservation: res} )
      } )
      return res;    
    },

  //=============================
    }//actions finish
}
