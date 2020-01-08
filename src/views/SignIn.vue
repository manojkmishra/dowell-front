<template>
  <div>
 Sign In
    <form @submit.prevent="submit">
      {{form}}
      <div> <label for="email">Email</label>
            <input type="text" name="email" id="email" v-model="form.email"> 
      </div>
      <div> <label for="password">Pass</label> 
            <input type="password" name="password" id="password" v-model="form.password"> 
      </div>
      <div><button type="submit">Submit</button> </div>
    </form>
  </div>
</template>

<script>
//import axios from 'axios';
import {mapActions} from 'vuex';
export default {
  name: 'signin',
  components: { },
  data(){return {form:{email:'',password:''}}},
  methods: { 
        ...mapActions({signIn:'auth/signIn'}),
         submit()
            { console.log('submit pressed form=',this.form);
            // let resp=axios.post('http://127.0.0.1:8000/api/auth/signin',this.form); // eslint-disable-line
            // let resp=axios.post('/auth/signin',this.form); // eslint-disable-line
            // console.log('signin res=',resp);
              this.signIn(this.form).then(()=>{
                console.log('authenticated- forwarding to dashboard')
                this.$router.replace({name:'dashboard'})
              }).catch(()=>{console.log('singin view-sigin failed')})
            }    
    }
}
</script>
