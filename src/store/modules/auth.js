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
  { //all mutations take current state and data to be mutated as input
    SET_TOKEN(state,token1)
        {   state.token=token1;
          console.log('/store---types.SET_TOKEN state=', state);
        },
    SET_USER(state,data)
        {   state.user=data;
          console.log('/store---types.SET_USER state=', state);
        }
  },
  actions: { //actions take first option as dispatch(action) or commit(mutation)
      async signIn({dispatch},formdata){ 
        let resp= await axios.post('/auth/signin',formdata); // eslint-disable-line
      console.log('mock-auth.js-resp=',resp)
        return dispatch('attempt',resp.data.token);
        },
      async attempt({commit, state},token1){ //to validate the token of this user

        console.log('mock-toekn=',token1)
        //token1="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9zaWduaW4iLCJpYXQiOjE2NjM2MzA2MDUsImV4cCI6MTY2MzY3MDIwNSwibmJmIjoxNjYzNjMwNjA1LCJqdGkiOiJ4Znh3SGdEV2FXUjNSSGJzIiwic3ViIjo0NSwicHJ2IjoiYzA1ZjUzZjA0Yjc2MTJiNjUwYmY2MjA1MGY4NDA5NWRhNjk2NDliMyJ9.2Ntp9tRDseh46leZAuy6R5v6D_7k5SgcesEknRLc5rY"
          if(token1) commit('SET_TOKEN',token1) //dont SET_TOKEN if no token
          if(!state.token) return //dont fire me api if no token
          try{ let resp=await axios.get('auth/me'//,{headers:{'Authorization':'Bearer'+token1}}
                                               )
            //resp={"email":"manoj.mishra@dowell.com.au","name":"Manoj Mishra","admin":"1","location_id":"2"}
             console.log('mock-attempt-resp',resp)
               commit('SET_USER',resp.data)
               }catch(e)
                    {
                      commit('SET_TOKEN',null) //if token invalid- make all token/user-null
                      commit('SET_USER',null)
                    }
         },
       signOut({commit}){
              // return axios.post('auth/signout').then(()=>{
                commit('SET_TOKEN',null) 
                commit('SET_USER',null)
              // })
       }

  }
}
