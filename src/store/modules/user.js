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
      { 
        //let resp= await axios.get(api.users);
let resp=[{"id":1,"name":"Root root","email":"root@example.com","active":"1","created_at":null,"updated_at":null,"created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null},{"id":45,"name":"Manoj Mishra","email":"manoj.mishra@dowell.com.au","active":"1","created_at":"2018-08-29T03:30:39.000000Z","updated_at":"2022-08-17T00:01:44.540000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},{"id":46,"name":"Mark Greenwood","email":"mark.greenwood@dowell.com.au","active":"1","created_at":"2018-08-29T03:31:02.000000Z","updated_at":"2022-08-04T10:09:36.217000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},{"id":47,"name":"Darin Dinneen","email":"darin.dinneen@dowell.com.au","active":"1","created_at":"2018-08-29T03:35:57.000000Z","updated_at":"2022-07-20T15:32:42.927000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"5"},{"id":48,"name":"Deirdre Lamont","email":"deirdre.lamont@dowell.com.au","active":"1","created_at":"2018-08-29T03:36:29.000000Z","updated_at":"2021-07-05T21:29:14.300000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"5"},{"id":49,"name":"John Doe","email":"john.doe@dowell.com.au","active":"1","created_at":"2018-08-29T03:36:55.000000Z","updated_at":"2021-12-14T18:36:20.093000Z","created_by":"1","updated_by":"1","mobile":"2","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},{"id":50,"name":"Steven Greenwood","email":"steven.greenwood@dowell.com.au","active":"1","created_at":"2018-08-29T03:52:18.000000Z","updated_at":"2022-01-20T23:35:01.870000Z","created_by":"44","updated_by":"44","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},{"id":57,"name":"Michael Headland","email":"michael.headland@dowell.com.au","active":"1","created_at":"2018-09-18T21:09:03.000000Z","updated_at":"2020-11-04T00:08:54.493000Z","created_by":"44","updated_by":"44","mobile":"3","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null},{"id":58,"name":"Julian Scarpantoni","email":"julian.scarpantoni@dowell.com.au","active":"1","created_at":"2018-10-09T23:11:58.000000Z","updated_at":"2021-09-27T00:44:57.333000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},{"id":65,"name":"Donna Pascoe","email":"donna.pascoe@dowell.com.au","active":"1","created_at":"2018-12-11T03:09:30.000000Z","updated_at":"2020-11-04T00:14:40.050000Z","created_by":"1","updated_by":"1","mobile":"3","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null},{"id":72,"name":"Tracey Woolley","email":"tracey.woolley@dowell.com.au","active":"1","created_at":"2019-03-05T21:13:57.000000Z","updated_at":"2020-11-04T00:15:12.940000Z","created_by":"44","updated_by":"44","mobile":"2","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null},{"id":73,"name":"Andrew Morine","email":"andrew.morine@dowell.com.au","active":"1","created_at":"2019-03-12T21:33:50.000000Z","updated_at":"2021-08-04T14:58:14.853000Z","created_by":"1","updated_by":"1","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},{"id":74,"name":"Jacqui Gosschalk","email":"jacqui.gosschalk@dowell.com.au","active":"1","created_at":"2019-03-12T23:05:58.000000Z","updated_at":"2020-11-04T00:15:43.943000Z","created_by":"44","updated_by":"44","mobile":"2","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null},{"id":75,"name":"Emma Kennedy","email":"emma.kennedy@dowell.com.au","active":"1","created_at":"2019-03-12T23:06:36.000000Z","updated_at":"2020-11-04T00:15:54.013000Z","created_by":"44","updated_by":"44","mobile":"2","field1":null,"field2":null,"field3":null,"field4":null,"location_id":null},{"id":78,"name":"Jake","email":"jake.dsouza@dowell.com.au","active":"1","created_at":"2021-05-03T13:54:43.670000Z","updated_at":"2021-08-04T15:05:06.017000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},{"id":82,"name":"test.smt","email":"test.smt@dowell.com.au","active":"1","created_at":"2021-09-27T00:36:39.397000Z","updated_at":"2021-09-27T00:36:39.397000Z","created_by":"0","updated_by":"0","mobile":"2","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},{"id":83,"name":"Robert Bugeja","email":"Robert.Bugeja@dowell.com.au","active":"1","created_at":"2021-09-27T03:33:19.357000Z","updated_at":"2021-09-27T03:33:19.357000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},{"id":84,"name":"Dave McKenna","email":"dave.mckenna@dowell.com.au","active":"1","created_at":"2021-12-08T18:42:49.283000Z","updated_at":"2022-01-12T02:45:37.663000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},{"id":85,"name":"Kwaku Baah","email":"Kwaku.baah@dowell.com.au","active":"1","created_at":"2021-12-09T00:01:04.200000Z","updated_at":"2021-12-15T00:42:35.220000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"2"},{"id":86,"name":"Clancy Condran","email":"Clancy.Condran@dowell.com.au","active":"1","created_at":"2022-07-20T15:32:23.950000Z","updated_at":"2022-07-20T15:32:23.950000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"5"},{"id":87,"name":"Andy","email":"Andy.Stewart@dowell.com.au","active":"1","created_at":"2022-08-15T22:45:58.697000Z","updated_at":"2022-08-15T22:45:58.697000Z","created_by":"0","updated_by":"0","mobile":"1","field1":null,"field2":null,"field3":null,"field4":null,"location_id":"22"}]
        //commit({type:types.GET_USER_LIST ,  userlist: resp.data} );
        commit({type:types.GET_USER_LIST ,  userlist: resp} );
        
      },
      adduser(ctx, payload) 
      {  return new Promise((resolve, reject) => 
        {  axios.post(api.adduser, payload)
                .then((response) => 
                {  console.log('actions-adduser-res=',response);
                    ctx.dispatch('getusers');
                }).catch((error) => { console.log('actions-adduser-res=',error);
                  reject(error);  })
        })
      },
      deleteuser(ctx, payload) 
      {  return new Promise((resolve, reject) => 
        {  axios.post(api.deleteuser, payload)
                .then((response) => 
                {  console.log('actions-deleteuser-res=',response);
                    ctx.dispatch('getusers');
                }).catch((error) => { reject(error);  })
        })
      },
      edituser(ctx, payload) 
      {  return new Promise((resolve, reject) => 
        {  axios.post(api.edituser, payload)
                .then((response) => 
                { ctx.dispatch('getusers');
                }).catch((error) => { reject(error);  })
        })
      },
      
  }
}
