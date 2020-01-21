import axios from 'axios';
export function initialize(store, router) 
{   router.beforeEach((to,from,next)=>{ //next= check applied before going towards 'to'
    console.log('/resources/js/app.js-router.beforeEach Store.state+++++++=', store.state);
    console.log('/resources/js/app.js-router.beforeEach from++++++=', from);
    console.log('/resources/js/app.js-router.beforeEach to+++++++=', to);
    const requiresAuth= to.matched.some(record=>record.meta.requiresAuth)
    const currentUser = store.state.auth.user;
     if(requiresAuth && !currentUser){console.log('router-case1'); next('/login');} 
     else if(to.path=='/login' && currentUser){ console.log('router-case2');next('/')}
    
     else { console.log('router-case3');next()}
   })
    //first param=promise has been resolved--not needed so=null
    axios.interceptors.response.use(null, (error) => {
        if (error.response.status == 401) {
            store.commit('signOut');
            router.push('/login');
        }
        return Promise.reject(error); //this is must if error of axios has to be shown
    });

   // axios.defaults.headers.common["Authorization"] = `Bearer ${store.getters.currentUser.token}`
}