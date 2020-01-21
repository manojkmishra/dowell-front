import axios from 'axios';
export default{
   
  state: {sawlist:null,  },
  getters:{
      
  },
  mutations: 
  { 
    GET_SAW_SAWLIST(state,payload)
        {   state.sawlist = payload.sawlist;    },
  
  },
  actions: { //actions take first option as dispatch(action) or commit(mutation)
      async getsaws({commit,dispatch}, formData){ 
        let resp= await axios.post('/saw/getSaws',formData); // eslint-disable-line
        console.log('getsaws-res=',resp);
        commit('GET_SAW_SAWLIST' ,  response.body );
        
        },
  }
}
