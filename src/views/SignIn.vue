<template>
 
        <v-container fill-height fluid >
         <v-layout wrap >
            <v-flex lg6 md6  class="d-none d-md-flex svg1"  >         
                
                   <v-img   src="../assets/graphic.svg" alt=""> </v-img>
                 
            </v-flex>

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

          </v-layout>
      
      
      </v-container>

</template>

<script>

//import {mapGetters, mapActions} from 'vuex'
import {mapActions} from 'vuex';
import navi1 from '@/components/TheNavigation';
export default 
{  //import axios from 'axios';

  name: 'signin',
  components: { navi1 },
  data(){return {form:{email:'',password:''}, showPassword:false,aalert:true }},
  methods: { 
        ...mapActions({signIn:'auth/signIn'}),
         submit()
            { console.log('submit pressed form=',this.form);
            // let resp=axios.post('http://127.0.0.1:8000/api/auth/signin',this.form); // eslint-disable-line
            // let resp=axios.post('/auth/signin',this.form); // eslint-disable-line
            // console.log('signin res=',resp);
              this.signIn(this.form).then(()=>{
                console.log('authenticated- forwarding to dashboard');
                toast.fire({
                                icon: "success",
                                title: "You have logged in successfully"
                            })
                this.$router.replace({name:'dashboard'})
              }).catch(()=>{console.log('singin view-sigin failed');
              swal.fire(
                                "Login Failed",
                                "There was an error logging in. Please try again.",
                                "warning"
                            )})
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
.svg1:hover{  transform: scale(1.2)

}
.svg1{width:100%; transition:all 1s ease}

</style>
