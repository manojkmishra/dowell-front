<template> 
    <div class="mt-5">
    <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        top
        color="deep-purple accent-4"
        
    ></v-progress-linear>
  <v-data-table :headers="headers" :items="aa"  dense
  class="elevation-1" :search="search" sortBy="truck_no"
 :footer-props="{showFirstLastPage: true, itemsPerPageOptions: [-1,20,40], }"
 :hide-default-footer="true"
 
>
    <template v-slot:top>
        <v-toolbar  color="light-blue darken-3" dark >
          <v-toolbar-title>JOBS SUMMARY</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
                  <v-menu max-width="290">
                      <template v-slot:activator="{ on }">
                            <v-text-field :value="formattedDate" label="Cut Date" 
                            append-icon="mdi-calendar-range" v-on="on" single-line hide-details></v-text-field>
                      </template>
                      <v-date-picker v-model="due"></v-date-picker>
                    </v-menu>
                    
          <v-spacer></v-spacer>
                <v-text-field v-model="search" class="serc" append-icon="mdi-magnify" label="Search" single-line hide-details
                ></v-text-field>&nbsp;
                
        </v-toolbar>
    </template>
<template v-slot:item.updatedat="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <span>{{moment(item.updated_at).format('DD-MM-YYYY, h:mm:ss')}}</span>
    </template>
    <template v-slot:item.cutday="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <span>{{moment(item.cut_date).format('DD-MM-YYYY')}}</span>
    </template>
    <!------------------------>
    <template v-slot:item.slidsash1="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
    <!--  <v-tooltip bottom :disabled="item.slidsash.comments==null"> -->
      
      <template >
       <v-btn  ripple x-small v-if="item.NoSaw_SMT.status_id =='9'"  color="red accent-2" rounded dark :loading="loading"  @click.prevent="scrap(item.NoSaw_SMT)" >InPrg
          <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
            <span v-if="aa.id==item.NoSaw_SMT.review">  <!-- {{aa.id}} -->
            <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
            </span>
          </span>
       </v-btn>
       <v-btn  ripple x-small v-else-if="item.NoSaw_SMT.status_id =='12'"  color="teal" rounded dark :loading="loading"  @click.prevent="scrap(item.NoSaw_SMT)" >Cmplt
          <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
            <span v-if="aa.id==item.NoSaw_SMT.review">  <!-- {{aa.id}} -->
            <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
          </span>
       </v-btn>
       <v-btn  ripple x-small v-else-if="item.NoSaw_SMT.status_id =='0' || item.NoSaw_SMT.status_id =='8'"  color="light-blue darken-1" rounded dark :loading="loading"  @click.prevent="scrap(item.NoSaw_SMT)" >QUD
          <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
            <span v-if="aa.id==item.NoSaw_SMT.review">  <!-- {{aa.id}} -->
            <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
          </span>
       </v-btn>
       <v-btn  ripple x-small disabled v-else color="blue lighten-3" rounded dark :loading="loading" >NA</v-btn>
        </template>
      
    </template>
    <!------------------------------->
        <template v-slot:item.slidframe1="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
    <!--  <v-tooltip bottom :disabled="item.slidsash.comments==null"> -->
     
      <template >
       <v-btn ripple x-small v-if="item.SampleSaw.status_id =='9'"  color="red accent-2" rounded dark :loading="loading"  @click.prevent="scrap(item.SampleSaw)" >InPrg
          <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
            <span v-if="aa.id==item.SampleSaw.review">  <!-- {{aa.id}} -->
            <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
            </span>
          </span>
       </v-btn>
       <v-btn  ripple x-small v-else-if="item.SampleSaw.status_id =='12'"  color="teal" rounded dark :loading="loading"  @click.prevent="scrap(item.SampleSaw)" >Cmplt
          <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
            <span v-if="aa.id==item.SampleSaw.review">  <!-- {{aa.id}} -->
            <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
          </span>
       </v-btn>
       <v-btn  ripple x-small v-else-if="item.SampleSaw.status_id =='0' || item.SampleSaw.status_id =='8'"  color="light-blue darken-1" rounded dark :loading="loading"  @click.prevent="scrap(item.SampleSaw)" >QUD
          <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
            <span v-if="aa.id==item.SampleSaw.review">  <!-- {{aa.id}} -->
            <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
          </span>
       </v-btn>
       <v-btn  ripple x-small disabled v-else color="blue lighten-3" rounded dark :loading="loading" >NA</v-btn>
        </template>
      
    </template>


    <template slot="no-data">
      <div></div>
    </template>
  </v-data-table>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapState, mapActions} from 'vuex';
import axios from "axios";
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
export default
{      computed: 
  {  ...mapState({   user: state => state.auth.user,   sawflags:state => state.saw.sawflags,  }),
      formattedDate(){return this.due ? format(parseISO(this.due),'do MMM yyyy') : ''}
  },
  data() { return {dialog: false,search: '',aa:[],loading:false,due:'',
          headers: [
            //  { text: 'created_at', align: 'left', value: 'created_at', },
            //  { text: 'created_by', align: 'left',  value: 'created_by.name'},
             // { text: 'updated_at', align: 'left',  value: 'updatedat',width:"1%"},
             { text: 'cut_date', align: 'left',  value: 'cutday',width:"5%"},
             { text: 'TrkNo', align: 'left',  value: 'truck_no',width:"1%"},
              { text: 'orderID', align: 'left',  value: 'order_ID',width:"1%"},
             //  { text: 'Color', align: 'left',  value: 'cut_color',width:"1%"},
              { text: 'Customer', align: 'left',  value: 'cust_name',width:"10%"},
            //  { text: 'quote_ID', align: 'left',  value: 'quote_ID',width:"1%"},
              { text: 'Sample_Saw', align: 'left',  value: 'slidsash1',width:"1%"},
              { text: 'NoSaw_SMT', align: 'left',  value: 'slidframe1',width:"1%"},
             /* { text: 'WinSash', align: 'left',  value: 'dsw1',width:"1%"},
              { text: 'WINDOWS', align: 'left',  value: 'windows1',width:"1%"},
              { text: 'EaSash', align: 'left',  value: 'easash1',width:"1%"},
              { text: 'Awnings', align: 'left',  value: 'eadfl1',width:"1%"},
              { text: 'BFHD', align: 'center',  value: 'bfhd1',width:"1%"},
              { text: 'Commercial', align: 'center',  value: 'commercial1',width:"1%"},
              { text: 'Transfer', align: 'center',  value: 'transfer1',width:"1%"},*/
             //  { text: 'Timber', align: 'left',  value: 'timber1',width:"1%"},


            ],
            formSearchData: {  SawCode: '',  QuoteID: '',  order_ID:'', selected1:[], cut_saw:'' ,'selerr':false }, 
             }
          },
      created(){  
        /*
         this.$store.dispatch('getjobsummary')
                    .then((res) => { //this.loading=false;
                                console.log('getjobsummary response',res.data)  
                                this.categories=res.data;
                                this.loading=false;
                        }) 
          */
          let today = new Date();
             this.due=new Date(today.getTime() - today.getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0]
            console.log('date---=',this.due);
         this.getjobsummary(this.due);
        },
        methods:{ 
          change(){
              console.log('changed')
          },
            scrap(data) 
                {   console.log('sawsch-scrap-data-=',data);
                  if(data.cut_saw !=null)    
                  this.formSearchData.SawCode = data.cut_saw;
                  else{this.formSearchData.SawCode = data.schedule_saw;   }
                  this.formSearchData.QuoteID = data.quote_ID;
                  console.log('ssscrap--formSearchData=',this.formSearchData);
                  this.loading=true;
                  this.$store.dispatch('getcutlist', this.formSearchData)
                        .then((response) => { console.log('jobdetails--- cutlist',response.data); 
                  this.loading=false; 
                    this.$router.push({  name: 'jscutlist',params: {data: data }   });
                      })
                      .catch((error) => {this.loading=false;});
                },

          async getjobsummary(x){
            this.formSearchData={};
           
           let res1= await axios.post(`${axios.defaults.baseURL}/saw/jobsummary`, {'date':x})       
           .then((res) => { console.log('getjobsummary response-aa=',res.data)  
                            this.aa=res.data;

                            let myObj=this.aa;
                            //Object.keys(obj).forEach(k => 
                           //// (obj[k].commercial == "") && delete obj[k]);
                           // console.log('obj=',obj);

                            Object.keys(myObj).forEach(key => {
                             // console.log(key);        // the name of the current key.
                              console.log(myObj[key].bfhd); // the value of the current key.
                              
                              if((myObj[key].NoSaw_SMT)==""
                              && (myObj[key].SampleSaw)==""

                              ){
                               // console.log('hehe')
                                delete myObj[key]
                              }
                            });
                              console.log(myObj);
                            //------------------------
                            })
                    .catch(err=>{ console.log('getjobsummary-err=', err) ;  })
          }
            
        },
      watch: {
        due(val,val1) {
          console.log(val,val1)
          if (val != val1){
            this.due=val;
          this.getjobsummary(this.due)}
        }
      }

}
</script>

<style scoped>
.disable-events {
  pointer-events: none
}
</style>