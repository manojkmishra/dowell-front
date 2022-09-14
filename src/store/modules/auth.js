import axios from 'axios';
export default{
  namespaced:true,
  state: {token:null,user:null,  },
  getters:{
      authenticated(state){ 
      return state.token && state.user},
      user(state){
          return state.user}
  },
  mutations: 
  { 
    SET_TOKEN(state,token1)
        {   state.token=token1;
          
        },
    SET_USER(state,data)
        {   state.user=data;
          
        }
  },
  actions: { 
      async signIn({dispatch},formdata){ 
        let resp= await axios.post('/auth/signin',formdata); 
      
        return dispatch('attempt',resp.data.token);
        },
      async attempt({commit, state},token1){ 
          if(token1) commit('SET_TOKEN',token1) 
          if(!state.token) return 
          try{ let resp=await axios.get('auth/me'
                                               )
             
               commit('SET_USER',resp.data)
               }catch(e)
                    {
                      commit('SET_TOKEN',null) 
                      commit('SET_USER',null)
                    }
         },
       signOut({commit}){
              
                commit('SET_TOKEN',null) 
                commit('SET_USER',null)
              
       }

  }
}
