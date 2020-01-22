<template>
 <div >
     
      

       <v-layout row wrap class="justify-center">
      <div v-for="aaa in aa" >
        <v-btn class="primary dark " id="button3"> {{aaa.SawCode}}</v-btn>
      </div>
    </v-layout>
 
   </div>  
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapState, mapActions} from 'vuex';
import axios from "axios";
export default
{  computed: 
   { //...mapState({ sawlist: 'saw/sawlist', }),
    // ...mapActions({getsaws:'saw/getsaws'}),
    ...mapState({ sawlist: state => state.saw.sawlist, 
                             
               }),
     ...mapGetters({authenticated:'auth/authenticated',
                       user:'auth/user'
                      }),
        aa() { if (this.sawlist)  
                        {  console.log('sawlist----this.sawlist=',this.sawlist);
                            return this.sawlist;
                        }
               }
            },
  data() { return { label: 'danger', aa1:[], user1:'',
                     formData: {  SawCode:'', Location:'',},
                  }  
          },

  created() {  
          
          }
}
</script>

<style scoped>
#button3 {
  padding: 10rem;
height: 120px;
width: 80%;
background-color: #237fbc; border-color: #237fbc;
font-family: Open Sans, Helvetica,Arial,sans-serif;
font-size: 100%;
color: white;
   
border-radius: 5px;
margin-top:10px;

font-size: 18px;  width:60%; padding:2rem; font-family: Open Sans, Helvetica,Arial,sans-serif;
display: inline-block;zoom: 1; color: #fff; text-align: center; position:relative; 
-webkit-transition: border .25s linear, color .25s linear, background-color .25s linear; 
transition: border .25s linear, color .25s linear, background-color .25s linear;

}

    .button3:hover {background-color: aquamarine; color:#237fbc}
    .button3:active{ top: 3px; outline: none; -webkit-box-shadow: none; box-shadow: none;}
</style>