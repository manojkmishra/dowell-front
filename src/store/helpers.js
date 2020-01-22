import axios from 'axios';
export function initialize(store, router) 
{   router.beforeEach((to,from,next)=>{ //next= check applied before going towards 'to'
   // console.log('/resources/js/app.js-router.beforeEach Store.state+++++++=', store.state);
    console.log('router- from==', from,'to=',to);
   // console.log('/resources/js/app.js-router.beforeEach to+++++++=', to);
    const requiresAuth= to.matched.some(record=>record.meta.requiresAuth)
    const currentUser = store.state.auth.user;
     if(requiresAuth && !currentUser){console.log('router-case1'); next('/login');} 
     else if(to.path=='/login' && currentUser){ console.log('router-case2');next('/')}
    
     else { console.log('router-case3');next()}
   })
 
   // axios.defaults.headers.common["Authorization"] = `Bearer ${store.getters.currentUser.token}`
   axios.interceptors.request.use(function (config) 
     {  console.log('axios req=',config)
        return config;
      });
   axios.interceptors.response.use(function (response) {
        console.log('axios res=',response)
        return response;
      }, function (error) { return Promise.reject(error); });
  }