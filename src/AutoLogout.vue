<template>
  <div></div>
</template>

<script>
  import { mapGetters, mapState, mapActions} from 'vuex'
export default {
    computed:{
        ...mapGetters({authenticated:'auth/authenticated',
                       user:'auth/user'
                      }),
          
    },
data(){
    return{
        events:['click','mouseover','scroll','keypress','load'],
        warningTimer:null,logoutTimer:null
    }
},
mounted(){

    if(this.user!=null && this.authenticated !=null)
    { console.log('autologouot mounted-set timer ')
       // this.events.forEach(function(event)
        //    { window.addEventListener(event,this.resetTimer);
        //    },this);
        this.setTimers(); 
    }
},
destroyed(){
   console.log('autologouot destroyed- ')
        this.events.forEach(function(event)
            { window.removeEventListener(event,this.resetTimer);
            },this);
        this.resetTimer(); 
   

},
methods:{
            ...mapActions({signOut1:'auth/signOut'}),
        signOut(){ console.log('autologout singout click, this.user,this.auth',this.user,this.authenticated)
        if(this.user!=null && this.authenticated !=null)
        {
                    this.signOut1().then(()=>{
                        this.$router.replace({path:'/login'})
                    })
            }
        },
    setTimers(){ console.log('autologout- settitmer',this.user)
      //  this.warningTimer=setTimeout(this.warningMessage, 5*1000)
       if(this.user!=null && this.authenticated !=null){
        this.logoutTimer=setTimeout(this.signOut, 10*60*60*1000) } 
        },
    warningMessage:function(){alert('warning')},

    resetTimer(){
        clearTimeout(this.logoutTimer); 
        this.setTimers();
    },
    //logout:function(){ document.getElementById('sign-out').click();    }
}

    }

</script>

<style>

</style>