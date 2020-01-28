<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="desserts"
    :single-select="singleSelect"
    item-key="name"
    show-select
    class="elevation-1"
  >
    <template v-slot:top>
      <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
    </template>
  </v-data-table>
</template>
 
<script>
import Vue from 'vue'
import {  mapGetters,  mapState } from 'vuex'



export default {
    computed: {     ...mapGetters({}),
                    ...mapState({       stateNodes3: state => state.saw.joblist,
                                        selectedSaw: state => state.saw.selectedSaw,
                                        user: state => state.authUser,
                                }),
            },
    data() {   return { seen: true,  formSearchData: {  SawCode: '',  QuoteID: '',  order_ID:'',  }    }    },
    created() {},
    updated() {},
 
    mounted() { console.log('this.stateNode3=',this.stateNodes3)    },
    methods: {   backToSaw() {    this.$router.push({  name: 'saw'     });    },
                 onActions(data) {  let payload = {  isShow: true,  data: data    };
                                    if (data.action === 'Delete') 
                                     {   this.formSearchData.SawCode = this.selectedSaw;
                                         this.formSearchData.QuoteID = data.data.quote_ID;
                                         this.$store.dispatch('selectedJob', data);
                                         this.$store.dispatch('getjobdetails', this.formSearchData)
                                                 .then((response) => {   console.log('sawlist--- getJobs success response',response.data);  
                                                         this.$router.push({  name: 'jobdetails'       });
                                                        })
                                                .catch((error) => {console.log('getJobs error',response);});
                                     }
                                   if (data.action === 'Edit') { this.$store.dispatch('jobListShowModal', payload);   }

                                 },
                 onClickSChange(action, data, index) 
                                {    console.log('joblist--- selected data=',data);  
                                     this.formSearchData.SawCode = this.selectedSaw;
                                     this.formSearchData.QuoteID = data.quote_ID;
                                     this.$store.dispatch('selectedJob', data);
                                    if(data.cut_saw==null)
                                        { this.formSearchData.status=data.Status_id;
                                          this.formSearchData.id = data.id;
                                          this.formSearchData.order_ID = data.Order_Number;
                                          this.$store.dispatch('updateJobList', this.formSearchData)
                                   
                                        }
     
                                       this.$store.dispatch('getjobdetails', this.formSearchData)
                                           .then((response) => {console.log('joblist--- success response',response.data);  
                                                                this.$router.push({  name: 'jobdetails'      });
                                                               })
                                           .catch((error) => {});
                
         
                                },
                    cutall(action, data, index)  {
                                 
                                this.formSearchData.QuoteID = data.quote_ID;

                               if(data.cut_saw==null) this.formSearchData.order_ID = data.Order_Number;
                               else this.formSearchData.order_ID = null;
                                this.formSearchData.SawCode = this.selectedSaw;
                                this.formSearchData.loc = "GBG";
                                console.log('cutall formSearchData=',this.formSearchData);               
                                this.$store.dispatch('jobcutall', this.formSearchData)
                                    .then((response) => {  console.log('cutall--- response',response.data);  
                                    })
                                    .catch((error) => {});
           
                              },
            }//methods finished

}
</script>

<style>
#backToSaw {
    margin-bottom: 10px;
}

.black-background {
    background-color: #000000;
}

.white {
    color: #ffffff;
}

.btn.btn-black {
    color: #d7d7d7;
    border: solid 1px #333;
    background: #333;
    background: -webkit-gradient(linear, left top, left bottom, from(#666), to(#000));
    background: -moz-linear-gradient(top, #666, #000);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#666666', endColorstr='#000000');
}

.black {
    color: black
}

.red {
    color: red
}

.amber {
    color: darkgoldenrod
}
</style>
