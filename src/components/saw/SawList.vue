<template>
  <div class="middle"  v-if="authenticated">
      <center>
        <br>USER={{user.name}}  ROLE={{user.role}} EMAIL={{user.email}}<br>
   <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4" v-for="aaa in aa"> 
      <button type="button3" class="button3">
        {{aaa.SawCode}}
        </button>
  </div>
   </center>
    </div>  
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapState, mapActions} from 'vuex';
import axios from "axios";
export default
{  computed: 
   { ...mapState({ sawlist: state => state.saw.sawlist, }),
     ...mapActions({getsaws:'saw/getsaws'}),
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
                     formData: { dateRange: ['',''], SawCode:'', Location:'',},
                  }  
          },

  created() {  console.log('api---/saw/getSaws-',this.user);
              
             

                 
             // this.$store.dispatch('getsaws',this.formData)
              //     .then((response) => {    })
               //    .catch((error) => {});
               
                //   this.getsaws(this.form).then(()=>{
               // console.log('getsawys resp=');
             // }).catch(()=>{console.log('singin view-sigin failed');
             // })
          
          }
}
</script>

<style>

  
    .button3 {
height: 120px;
width: 80%;
background-color: #237fbc; border-color: #237fbc;
font-family: Open Sans, Helvetica,Arial,sans-serif;
font-size: 100%;
color: white;
   
border-radius: 5px;
margin-top:10px;

font-size: 18px;  width:60%; padding:.8em 1.5em; font-family: Open Sans, Helvetica,Arial,sans-serif;
display: inline-block;zoom: 1; color: #fff; text-align: center; position:relative; 
-webkit-transition: border .25s linear, color .25s linear, background-color .25s linear; 
transition: border .25s linear, color .25s linear, background-color .25s linear;

}

    .button3:hover {background-color: aquamarine; color:#237fbc}
    .button3:active{ top: 3px; outline: none; -webkit-box-shadow: none; box-shadow: none;}
</style>