import axios from 'axios';
export function initialize(store, router) 
{   router.beforeEach((to,from,next)=>{ 
    const requiresAuth= to.matched.some(record=>record.meta.requiresAuth)
    const currentUser = store.state.auth.user;
     if(requiresAuth && !currentUser){ next('/login');} 
     else if(to.path=='/login' && currentUser){ next('/')}
    
     else { next()}
   })
 
   axios.interceptors.request.use(function (config) 
     {  
        return config;
      });
   axios.interceptors.response.use(function (response) {
       
        return response;
      }, function (error) { return Promise.reject(error); });
  }