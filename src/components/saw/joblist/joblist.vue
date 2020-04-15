<template>
  <v-data-table :headers="headers" :items="joblist"  class="elevation-1" :search="search" v-model="selected" show-select
       :footer-props="{showFirstLastPage: true, itemsPerPageOptions: [10,20,40,-1], }">
    <template v-slot:top>
        <v-toolbar  color="light-blue darken-3" dark dense>
          <v-toolbar-title>JobList</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-toolbar-title>SAW - {{selectedSaw.replace(/_/g, " ")}}</v-toolbar-title>
          <v-btn id="btn-cutselected" small  color="blue darken-4" rounded dark :loading="loading"  @click.prevent="cutselcted">CutSelected</v-btn>
          <v-spacer></v-spacer>
                <v-text-field v-model="search" class="serc" append-icon="mdi-magnify" label="Search" single-line hide-details
                ></v-text-field>&nbsp;
                
        </v-toolbar>
    </template>
    <!------flag---------->
     <template v-slot:item.flag="{ item }">
      <v-icon  v-if="item.review>0" v-bind:style="{ color: 'rgb('+item.flagRed+','+item.flagGreen+','+item.flagBlue+')' }" >
        mdi-flag</v-icon> 
    </template>
    <!----status----->
    <template v-slot:item.action="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <v-btn ripple small v-if="item.Status_id =='9'"  color="red accent-2" rounded dark :loading="loading"  @click.prevent="selectjob(item)">{{item.Status}}</v-btn>
       <v-btn ripple small v-else-if="item.Status_id =='12'"  color="teal" rounded dark :loading="loading"  @click.prevent="selectjob(item)">{{item.Status}}</v-btn>
       <v-btn ripple small v-else-if="item.Status =='Up Next'"  color="red accent-1" rounded dark :loading="loading"  @click.prevent="selectjob(item)">{{item.Status}}</v-btn>
       <v-btn ripple small v-else-if="item.Status =='Flagged'"  color="red darken-4" rounded dark :loading="loading"  @click.prevent="selectjob(item)">{{item.Status}}</v-btn>
       <v-btn ripple small v-else color="light-blue darken-1" rounded dark :loading="loading"   @click.prevent="selectjob(item)">{{item.Status}}</v-btn>
    </template>
    <!----cutall---------->
    <template v-slot:item.cutall="{ item }" >
       <v-btn v-if="item.Status_id =='12'" small outlined color="red accent-2" rounded dark :loading="loading"  @click.prevent="cutall(item)">UnCutJob</v-btn>
       <v-btn v-else  small color="teal" outlined rounded dark :loading="loading"   @click.prevent="cutall(item)">CutJob</v-btn>
    </template>
    <!------multiselect-------->
     

  </v-data-table>
</template>
 
<script>
import { mapGetters, mapState, mapActions} from 'vuex';
  export default 
  {   data: () => (
        { dialog: false,search: '',selected: [],
          headers: [
              { text: 'Cut Date', align: 'left', sortable: false, value: 'cut_date', width:"12%"},
              { text: 'Order No', value: 'Order_Number',sortable: false },
              { text: 'Customer', value: 'Customer' ,sortable: false},
              { text: 'Time (Min)', value: 'Time',sortable: false },
              { text: 'Color', value: 'Color', sortable: false},
              { text: 'Flag', value: 'flag', sortable: false },
              { text: 'Status', value: 'action', sortable: false },
              { text: 'CutJob', value: 'cutall', sortable: false },
            ],
           formSearchData: {  SawCode: '',  QuoteID: '',  order_ID:'', selected1:[], cut_saw:'' ,'selerr':false }, 
           loading:false,
        }),

    computed: 
       {  ...mapState({ sawlist: state => state.saw.sawlist, 
                        joblist:state =>state.saw.joblist,
                        selectedSaw: state => state.saw.selectedSaw,

                   }),
           
       },
    watch: {   },
    created () {  },
    mounted() { console.log('joblist.vue-this.sawlist=',this.sawlist)
                console.log('joblist.vue-this.joblist=',this.joblist)    
              },
    methods: 
    {  cutselcted()
          {  //this.formSearchData.SawCode=this.selectedSaw; 
            this.formSearchData.SawCode=this.selectedSaw; 
            console.log('cutselected- this.selected=',this.selected)
            console.log('cutselected- this.formSearchData.selected1=',this.formSearchData.selected1)
            if(this.selected.length==0){
              swal.fire({ position: 'top-right',
                title:'<span style="color:white">Please select jobs to cut</span>',
                timer: 2000, toast: true, background: 'purple',
                });
            }
            else{ this.formSearchData.selected1=[];
            var i = 0;
            while ( i < this.selected.length ) 
                { var x = this.selected[i];
                  console.log('hehe',x);
                   
                  if (x){ this.selected.splice(i,1);
                            if(x.review>0 && x.review !=9){
                            swal.fire({ position: 'top-right',
                              title:'<span style="color:white">Flagged Jobs can not be selected, please UnFlag it</span>',
                              timer: 2000, toast: true,background: 'purple',
                                });
                              return;
                            }
                            if(x.Status_id==12)
                            { swal.fire({ position: 'top-right',
                            title:'<span style="color:white">Only UnCut Jobs can be selected</span>',
                            timer: 2000, toast: true, background: 'purple',
                            });
                                                        this.selected=[];this.formSearchData.selected1=[];
                            return;
                            }
                            else this.formSearchData.selected1.push(x.id);
                        }
                      else i++;
                }
              console.log('cutselected- this.selected=',this.selected)
              console.log('cutselected- this.formSearchData.selected1=',this.formSearchData.selected1)
                if(this.formSearchData.selected1.length>0){
                        this.$store.dispatch('updatecutselectjob', this.formSearchData)
                        .then((response) =>  { console.log('updatecutselectjob---response=',response);  })     
                        .catch((error) => {         });
                }
              this.selected=[];this.selected1=[];
              this.resetformSearchData();     
            }//length>0                       
          },
      selectjob(data)
          {    console.log('chstatus-',data);
               this.formSearchData.SawCode = this.selectedSaw;
               this.formSearchData.QuoteID = data.quote_ID;
               this.loading=true;
               this.$store.dispatch('selectedJob', data);
               if(data.cut_saw==null)
                      { this.formSearchData.status=data.Status_id;
                        this.formSearchData.id = data.id;
                        this.formSearchData.order_ID = data.Order_Number;
                        this.$store.dispatch('updateJobList', this.formSearchData)
                      }
                      
                    this.$store.dispatch('getjobdetails', this.formSearchData)
                      .then((res) => 
                          { this.loading=false;
                            this.$router.push({  name: 'jobdetails'      });
                          })
                      .catch((error) => {console.log('jobdetails--- error',error); });
           },
           cutall(data){
             if(data.review>0 && data.review != 9 ){
               swal.fire({ position: 'top-right',
                        title:'<span style="color:white">Flagged Jobs can not be cut, please UnFlag it</span>',
                            timer: 2000, toast: true,background: 'purple',
                            });
                        return;
                  }
             else{
                console.log('joblist-cutall-item',data);
                this.formSearchData.QuoteID = data.quote_ID;
                this.formSearchData.order_ID = data.Order_Number;
                this.formSearchData.cut_saw = data.cut_saw;
                this.formSearchData.SawCode = this.selectedSaw;
                this.formSearchData.loc = "GBG";
                console.log('cutall formSearchData=',this.formSearchData);               
                this.$store.dispatch('jobcutall', this.formSearchData)
                this.resetformSearchData();
             }
           },
            resetformSearchData(){
                           this.formSearchData= {  SawCode: '',QuoteID: '',order_ID:'',selected1:[], cut_saw:''}
                       }
    },
  }
</script>
<style scoped>
.swal2-popup{
    width:22em !important;
}
#swal2-title {
  margin: 0px;
  font-size: 1rem !important;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.21);
  margin-bottom: 28px;
}
#btn-cutselected{margin-left:1%;}
.theme--light.v-data-table tbody td {
    font-size: 20px !important;
}
.v-data-table td{
   font-size: 10px;
}
tr > td > .text-left{
  padding-right:50px;
}
.serc{
  width:5% !important;
}


</style>