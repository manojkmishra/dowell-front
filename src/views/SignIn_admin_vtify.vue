/* eslint-disable */
<template>
  <div class="panel-wrapper">
    <span class="logo"><img src="../assets/logo.png" alt="" ></span>
    <div class="slogan-wrapper">
      <div class="slogan"><img src="../assets/login-bg2.svg" alt="" ></div>
    </div>

    <div class="panel-content">
      <v-app class="login-con">
        <!-- <v-spacer></v-spacer> -->
        <v-content>
          <base-langbar />
          <v-container fluid fill-height >
            <v-layout align-center justify-center >
              <v-flex class="frame">
                
                <v-form>
                  <v-text-field v-model="form.username" prepend-icon="person"  @keyup.enter.native="login" required ></v-text-field>
                  <v-text-field v-model="form.password"
                    prepend-icon="lock" @keyup.enter.native="login"
                    :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                    :type="showPwd ? 'text' : 'password'"
                    @click:append="showPwd = !showPwd"
                   
                    required
                  ></v-text-field>
                  <v-layout column wrap justify-end align-end >
                    <v-flex>
                      <v-btn flat small color="primary" @click="redirectForgotPassword" >
                      
                      </v-btn>
                    </v-flex>
                    <v-flex>
                      <v-btn :loading="loginLoading" @click="login">
                        <span slot="loader">Loading...</span>
                       
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-content>

        <v-footer color="#fbfbfb" height="auto">
          <v-layout>
            <v-flex text-xs-center>
              <!-- {{ $t('common.copyrightMessage', { currentYear }) }} -->
            </v-flex>
          </v-layout>
        </v-footer>
      </v-app>
    </div>
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
            { 
           
              this.signIn(this.form).then(()=>{
              
                this.$router.replace({name:'dashboard'})
              }).catch(()=>{})
            }    
    }
}
</script>
