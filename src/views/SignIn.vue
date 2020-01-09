<template>

        <v-container fill-height fluid >
         <v-layout wrap >
           <v-flex class="zz1 lg6 md6   sm12 " >
              <v-hover v-slot:default="{ hover }">
              <v-card :elevation="hover ? 12 : 2" color="grey lighten-4" class="mx-auto ">
              <v-toolbar color="blue lighten-2"  dark>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text >
                <v-form color="grey lighten-2" >
                  <v-text-field label="Login" name="login" prepend-icon="mdi-account-circle" type="text" v-model="form.email"/>
                  <v-text-field :type="showPassword ? 'text':'password'" id="password" label="Password" name="password" v-model="form.password"
                  prepend-icon="mdi-lock"  :append-icon="showPassword ? 'mdi-eye':'mdi-eye-off'" @click:append="showPassword=!showPassword" />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="submit" rounded color="teal lighten-2" dark >Login</v-btn>
              </v-card-actions>
            </v-card>
             </v-hover>
           </v-flex>
            <v-flex lg6 md6  class="d-none d-md-flex"  >         
                <v-hover v-slot:default="{ hover }">
                   <v-img  :elevation="hover ? 12 : 2" src="../assets/graphic.svg" alt=""> </v-img>
                 </v-hover>
        
            </v-flex>
          </v-layout>
      
      
      </v-container>

</template>

<script>
//import {mapGetters, mapActions} from 'vuex'
import {mapActions} from 'vuex';
export default 
{  //import axios from 'axios';

  name: 'signin',
  components: { },
  data(){return {form:{email:'',password:''}, showPassword:false}},
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

<style scoped>
.zz1{

    padding-top: 5rem;
    padding-right: 4rem;
    padding-left: 4rem;

}

</style>
