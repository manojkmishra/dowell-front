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
  class="elevation-1" :search="search"
 :footer-props="{showFirstLastPage: true, itemsPerPageOptions: [-1,20,40], }"
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
    <template v-slot:item.slidsash1="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
<!------------------------>
       <v-btn  ripple x-small v-if="item.slidsash.status_id =='9'"  color="red accent-2" rounded dark :loading="loading"  @click.prevent="scrap(item.slidsash)" >InPrg
          <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
            <span v-if="aa.id==item.slidsash.review">  <!-- {{aa.id}} -->
            <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
            </span>
          </span>
       </v-btn>
       <v-btn  ripple x-small v-else-if="item.slidsash.status_id =='12'"  color="teal" rounded dark :loading="loading"  @click.prevent="scrap(item.slidsash)" >Cmplt
          <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
            <span v-if="aa.id==item.slidsash.review">  <!-- {{aa.id}} -->
            <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
          </span>
       </v-btn>
       <v-btn  ripple x-small v-else-if="item.slidsash.status_id =='0' || item.slidframe.status_id =='8'"  color="light-blue darken-1" rounded dark :loading="loading"  @click.prevent="scrap(item.slidsash)" >QUD
          <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
            <span v-if="aa.id==item.slidsash.review">  <!-- {{aa.id}} -->
            <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
          </span>
       </v-btn>
       <v-btn  ripple x-small disabled v-else color="blue lighten-3" rounded dark :loading="loading" >NA</v-btn>

    </template><!------------------------------->
    <template v-slot:item.slidframe1="{ item }" ><!--8,0=qd,9-inpr,12-complt----->

       <v-btn  ripple x-small v-if="item.slidframe.status_id =='9'"  color="red accent-2" rounded dark :loading="loading"  @click.prevent="scrap(item.slidframe)" >InPrg
         <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
          <span v-if="aa.id==item.slidframe.review"> 
          <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
        </span>
       </v-btn>
       <v-btn  ripple x-small v-else-if="item.slidframe.status_id =='12'"  color="teal" rounded dark :loading="loading"  @click.prevent="scrap(item.slidframe)" >Cmplt
        <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
          <span v-if="aa.id==item.slidframe.review" > 
          <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
        </span>
       </v-btn>
       <v-btn  ripple x-small v-else-if="item.slidframe.status_id =='0' || item.slidframe.status_id =='8'"  color="light-blue darken-1" rounded dark :loading="loading"  @click.prevent="scrap(item.slidframe)" >QUD
        <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
          <span v-if="aa.id==item.slidframe.review">  
          <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
        </span>
       </v-btn>
       <v-btn  ripple x-small disabled v-else color="blue lighten-3" rounded dark :loading="loading" >NA</v-btn>

      </template><!------------------------------->
    <template v-slot:item.dsw1="{ item }" ><!--8,0=qd,9-inpr,12-complt----->

       <v-btn  ripple x-small v-if="item.dsw.status_id =='9'"  color="red accent-2" rounded dark :loading="loading"  @click.prevent="scrap(item.dsw)" >InPrg
          <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
            <span v-if="aa.id==item.dsw.review">  <!-- {{aa.id}} -->
            <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
            </span>
          </span>
       </v-btn>
       <v-btn  ripple x-small v-else-if="item.dsw.status_id =='12'"  color="teal" rounded dark :loading="loading"  @click.prevent="scrap(item.dsw)" >Cmplt
          <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
            <span v-if="aa.id==item.dsw.review">  <!-- {{aa.id}} -->
            <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
            </span>
          </span>
       </v-btn>
       <v-btn  ripple x-small v-else-if="item.dsw.status_id =='0' || item.slidframe.status_id =='8'"  color="light-blue darken-1" rounded dark :loading="loading"  @click.prevent="scrap(item.dsw)" >QUD
          <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
            <span v-if="aa.id==item.dsw.review">  <!-- {{aa.id}} -->
            <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
            </span>
          </span>
       </v-btn>
       <v-btn  ripple x-small disabled v-else color="blue lighten-3" rounded dark :loading="loading" >NA</v-btn>

    </template><!------------------------------->
    <template v-slot:item.windows1="{ item }" ><!--8,0=qd,9-inpr,12-complt----->

       <v-btn  ripple x-small v-if="item.windows.status_id =='9'"  color="red accent-2" rounded dark :loading="loading"  @click.prevent="scrap(item.windows)" >InPrg
        <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
          <span v-if="aa.id==item.windows.review">  <!-- {{aa.id}} -->
          <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
        </span>
       </v-btn>
       <v-btn  ripple x-small v-else-if="item.windows.status_id =='12'"  color="teal" rounded dark :loading="loading"  @click.prevent="scrap(item.windows)" >Cmplt
        <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
          <span v-if="aa.id==item.windows.review">  <!-- {{aa.id}} -->
          <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
        </span>
       </v-btn>
       <v-btn  ripple x-small v-else-if="item.windows.status_id =='0' || item.slidframe.status_id =='8'"  color="light-blue darken-1" rounded dark :loading="loading"  @click.prevent="scrap(item.windows)" >QUD
        <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
          <span v-if="aa.id==item.windows.review">  <!-- {{aa.id}} -->
          <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
        </span>
       </v-btn>
       <v-btn  ripple x-small disabled v-else color="blue lighten-3" rounded dark :loading="loading" >NA</v-btn>

      </template><!------------------------------->

      <template v-slot:item.easash1="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <v-btn  ripple x-small v-if="item.easash.status_id =='9'"  color="red accent-2" rounded dark :loading="loading"  @click.prevent="scrap(item.easash)" >InPrg
        <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
          <span v-if="aa.id==item.easash.review">  <!-- {{aa.id}} -->
          <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
        </span>
        </span>
       </v-btn>
       <v-btn  ripple x-small v-else-if="item.easash.status_id =='12'"  color="teal" rounded dark :loading="loading"  @click.prevent="scrap(item.easash)" >Cmplt
        <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
          <span v-if="aa.id==item.easash.review">  <!-- {{aa.id}} -->
          <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
        </span>
        </span>
       </v-btn>
       <v-btn  ripple x-small v-else-if="item.easash.status_id =='0' || item.slidframe.status_id =='8'"  color="light-blue darken-1" rounded dark :loading="loading"  @click.prevent="scrap(item.easash)" >QUD
        <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
          <span v-if="aa.id==item.easash.review">  <!-- {{aa.id}} -->
          <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
        </span>
       </v-btn>
       <v-btn  ripple x-small disabled v-else color="blue lighten-3" rounded dark :loading="loading" >NA</v-btn>

    </template>
    <template v-slot:item.eadfl1="{ item }" ><!--8,0=qd,9-inpr,12-complt----->

       <v-btn  ripple x-small v-if="item.eadfl.status_id =='9'"  color="red accent-2" rounded dark :loading="loading"  @click.prevent="scrap(item.eadfl)" >InPrg
        <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
          <span v-if="aa.id==item.eadfl.review">  <!-- {{aa.id}} -->
            <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
        </span>
       </v-btn>
       <v-btn  ripple x-small v-else-if="item.eadfl.status_id =='12'"  color="teal" rounded dark :loading="loading"  @click.prevent="scrap(item.eadfl)" >Cmplt
        <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
          <span v-if="aa.id==item.eadfl.review">  <!-- {{aa.id}} -->
            <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
        </span>
       </v-btn>
       <v-btn  ripple x-small v-else-if="item.eadfl.status_id =='0' || item.slidframe.status_id =='8'"  color="light-blue darken-1" rounded dark :loading="loading"  @click.prevent="scrap(item.eadfl)" >QUD
        <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
          <span v-if="aa.id==item.eadfl.review">  <!-- {{aa.id}} -->
            <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
        </span>
       </v-btn>
       <v-btn  ripple x-small disabled v-else color="blue lighten-3" rounded dark :loading="loading" >NA</v-btn>

    </template>

        <template v-slot:item.bfhd1="{ item }" ><!--8,0=qd,9-inpr,12-complt----->

       <v-btn  ripple x-small v-if="item.bfhd.status_id =='9'"  color="red accent-2" rounded dark :loading="loading"  @click.prevent="scrap(item.bfhd)" >InPrg
        <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
          <span v-if="aa.id==item.bfhd.review">  <!-- {{aa.id}} -->
          <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
        </span>
       </v-btn>
       <v-btn  ripple x-small v-else-if="item.bfhd.status_id =='12'"  color="teal" rounded dark :loading="loading"  @click.prevent="scrap(item.bfhd)" >Cmplt
        <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
          <span v-if="aa.id==item.bfhd.review">  <!-- {{aa.id}} -->
          <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
        </span>
       </v-btn>
       <v-btn  ripple x-small v-else-if="item.bfhd.status_id =='0' || item.slidframe.status_id =='8'"  color="light-blue darken-1" rounded dark :loading="loading"  @click.prevent="scrap(item.bfhd)" >QUD
        <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
          <span v-if="aa.id==item.bfhd.review">  <!-- {{aa.id}} -->
          <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
        </span>
       </v-btn>
       <v-btn  ripple x-small disabled v-else color="blue lighten-3" rounded dark :loading="loading" >NA</v-btn>

    </template>
    <template v-slot:item.commercial1="{ item }" ><!--8,0=qd,9-inpr,12-complt----->

       <v-btn  ripple x-small v-if="item.commercial.status_id =='9'"  color="red accent-2" rounded dark :loading="loading"  @click.prevent="scrap(item.commercial)" >InPrg
        <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
          <span v-if="aa.id==item.commercial.review">  <!-- {{aa.id}} -->
          <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
        </span>
       </v-btn>
       <v-btn  ripple x-small v-else-if="item.commercial.status_id =='12'"  color="teal" rounded dark :loading="loading"  @click.prevent="scrap(item.commercial)" >Cmplt
        <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
          <span v-if="aa.id==item.commercial.review">  <!-- {{aa.id}} -->
          <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
        </span>
       </v-btn>
       <v-btn  ripple x-small v-else-if="item.commercial.status_id =='0' || item.slidframe.status_id =='8'"  color="light-blue darken-1" rounded dark :loading="loading"  @click.prevent="scrap(item.commercial)" >QUD
        <span v-for="aa in sawflags" :key="aa.id" v-if="aa.id !=9">
          <span v-if="aa.id==item.commercial.review">  <!-- {{aa.id}} -->
          <v-icon   v-bind:style="{ color: 'rgb('+aa.red+','+aa.green+','+aa.blue+')' }" > mdi-flag </v-icon> 
          </span>
        </span>
       </v-btn>
       <v-btn  ripple x-small disabled  v-else color="blue lighten-3" rounded dark :loading="loading" >NA</v-btn>

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
             // { text: 'updated_at', align: 'left',  value: 'updated_at',width:"1%"},
             { text: 'cut_date', align: 'left',  value: 'cutday',width:"2%"},
              { text: 'orderID', align: 'left',  value: 'order_ID',width:"1%"},
              { text: 'CUSTOMER', align: 'left',  value: 'cust_name',width:"10%"},
            //  { text: 'quote_ID', align: 'left',  value: 'quote_ID',width:"1%"},
              { text: 'ADSash', align: 'left',  value: 'slidsash1',width:"1%"},
              { text: 'ADFrame', align: 'left',  value: 'slidframe1',width:"1%"},
              { text: 'DSW', align: 'left',  value: 'dsw1',width:"1%"},
              { text: 'WinSash', align: 'left',  value: 'windows1',width:"1%"},
              { text: 'EaSash', align: 'left',  value: 'easash1',width:"1%"},
              { text: 'Awnings', align: 'left',  value: 'eadfl1',width:"1%"},
              { text: 'BFHD', align: 'left',  value: 'bfhd1',width:"1%"},
              { text: 'Commercial', align: 'left',  value: 'commercial1',width:"1%"},
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
                              
                              if((myObj[key].slidsash)==""
                              && (myObj[key].slidframe)==""
                              && (myObj[key].dsw)==""
                              && (myObj[key].windows)==""
                              && (myObj[key].easash)==""
                              && (myObj[key].eadfl)==""
                              && (myObj[key].bfhd)==""
                              && (myObj[key].commercial)==""
                              ){
                               // console.log('hehe')
                                delete myObj[key]
                              }
                            });
                              console.log(myObj);
                            //-------------------------
                       // if(this.user.admin !='1')
                      //  { //return this.headers.filter(header => header.text !== "CutJob")
                                         // }
                         // return this.headers;
                         // let bb=res.data.filter(commer => header.text !== "CutJob");


                        //-------------------------------------
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