<template>
  <v-data-table :headers="headers" :items="cutlist"   class="elevation-1" :search="search"
       :footer-props="{showFirstLastPage: true, itemsPerPageOptions: [10,20,40,-1], }">
    <template v-slot:top>
        <v-toolbar  color="light-blue darken-3" dark dense>
          <v-toolbar-title>JOBS</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-toolbar-title>SAW - {{selectedSaw.replace(/_/g, " ")}}</v-toolbar-title>
          <v-spacer></v-spacer>
                <v-text-field v-model="search" class="serc" append-icon="mdi-magnify" label="Search" single-line hide-details
                ></v-text-field>&nbsp;
               <v-btn id="btn-cutselected" small  color="blue darken-4" rounded dark :loading="loading"  @click.prevent="uncutselect">UnCutSelected</v-btn>
                <v-btn id="btn-cutselected" small  color="blue darken-4" rounded dark :loading="loading"  @click.prevent="cutselected">CutSelected</v-btn>
        </v-toolbar>
    </template>
    <!----status----->
    <template v-slot:item.action="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
             <v-btn ripple small v-if="item.Status_id =='7'"  color="teal" rounded dark :loading="loading"  @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
       <v-btn ripple small v-else color="light-blue darken-1" rounded dark :loading="loading"   @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
    </template>
    <!------multiselect-------->
      <template v-slot:item.sel="{ item }"> 
          <v-checkbox hide-details class="shrink mr-2"
            :checked="formData.selected1.indexOf(item.ID) !== -1"  @click.native="toggleSelect(item)"
          ></v-checkbox>
      </template>

  </v-data-table>
</template>
 
<script>
import { mapGetters, mapState, mapActions} from 'vuex';
  export default 
  {   data: () => (
        { dialog: false,search: '',selected: [],
          headers: [
              { text: 'SNO', align: 'left', sortable: false, value: 'SNO', width:"5%"},
              { text: 'Extrusion', value: 'Extrusion',sortable: false },
              { text: 'Description', value: 'Description', sortable: false},
              { text: 'Item', value: 'Item', sortable: false },
              { text: 'Color', value: 'Color', sortable: false },
              { text: 'Length', value: 'Length', sortable: false },
              { text: 'Qty', value: 'Cuts', sortable: false },
              { text: 'Status', value: 'action', sortable: false },
              { text: "Select", value: "sel", sortable: false },

            ],
           formData: {    ID:'', name: '',    title: '',   id: '',SawCode:'',status:'',location:'', selected1:[] ,QuoteID:'', jid:''  }, 
           loading:false,
        }),

    computed: 
       {  ...mapState({ sawlist: state => state.saw.sawlist, 
                        cutlist:state =>state.saw.cutlist,
                        selectedSaw: state => state.saw.selectedSaw,
                        selectedJob: state => state.saw.selectedJob,
                        selectedJobDetail: state => state.saw.selectedJobDetail,
                        selectedSaw: state => state.saw.selectedSaw,
                   }),
           
       },
    watch: {   },
    created () {  },
    mounted() { console.log('joblist.vue-this.sawlist=',this.sawlist)
                console.log('joblist.vue-this.joblist=',this.joblist)    
              },
    methods: 
    {  
                toggleSelect (cat) 
                  {      if (this.formData.selected1.indexOf(cat.ID) !== -1) 
                               {   this.formData.selected.splice(this.formData.selected1.findIndex(v => v === cat.ID), 1)
                               } 
                               else  { this.formData.selected1.push(cat.ID)
                                
                                  }
                   } ,
                cutselected()
                { //console.log('cutsel-selectedjob=',this.selectedJob)
                    //  console.log('cutsel-formdata=',this.formData)
                     if(this.formData.selected1.length>0)
                  {
                   if( this.selectedJob.AllowEdit==0 ) //0 - allowed to cut, 1- not allwed to cut
                     { console.log('cutsel-selectedjob=',this.selectedJob)
                      console.log('cutsel-formdata=',this.formData)
                       this.formData.SawCode=this.selectedSaw;
                       this.formData.status=7;
                       this.formData.QuoteID = this.selectedJob.quote_ID;
                       this.formData.jid = this.selectedJob.id;
                    console.log('cutsel-formdata=',this.formData)
                      this.$store.dispatch('updateselectedcutlist', this.formData)
                             .then((response) =>  {   })     
                      this.resetFormData();
                     }
                 }
                else{ swal.fire({ position: 'top-right',
                                  title:'<span style="color:white">Please select jobs to cut</span>',
                                timer: 2000, toast: true, background: 'purple', color:'white'
                                });
                   }
                },
              uncutselect()
                { 
                    
                    if( this.selectedJob.AllowEdit==0 ) //0 - allowed to cut, 1- not allwed to cut
                     { this.formData.SawCode=this.selectedSaw;
                       this.formData.status=5;
                       this.formData.QuoteID = this.selectedJob.quote_ID;
                        this.formData.jid = this.selectedJob.id;
                     console.log('uncutsel-formdata=',this.formData)
                       this.$store.dispatch('updatecutselectscrap', this.formData)
                             .then((response) =>  {  })     
                             .catch((error) => {         });
                       this.resetFormData();
                     }
                   },
                extToSaw() 
                    {
                      this.formSearchData.QuoteID = this.selectedJob.quote_ID;
                      this.formSearchData.SawCode = this.selectedSaw;
                      this.formSearchData.loc = "GBG";
                      this.formSearchData.extn_id = this.stateNodes3[0].extn_id;
                                
                      this.$store.dispatch('extToSawCut', this.formSearchData)
                                .then((response) => {  
                       
                                           })
                               .catch((error) => {});
           
                    },
              

              onClickSChange(action, data, index)
              {  
                    if( this.selectedJob.AllowEdit==0 ) //0 - allowed to cut, 1- not allwed to cut
                     {  this.formData.ID= data.ID;
                        this.formData.SawCode=this.selectedSaw;
                        this.formData.status=data.Status_id;                    
                        this.formData.QuoteID = this.selectedJob.quote_ID;
                        this.formData.jid = this.selectedJob.id;
                     
                        this.$store.dispatch('updateScrapList', this.formData)
                             .then((response) =>  {  })     
                             .catch((error) => {         });
                        this.resetFormData();

                    }
                  else {     this.$store.dispatch('showErrorNotification', 'This Job is not allowed to cut');
                            return;
                       }
              },
              resetFormData() {  this.formData = {  ID: '', status:'',SawCode:'', Location:'' ,selected:[],QuoteID:'',jid:'' }; },
          },

  }
</script>
<style scoped>

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
tr tbody
{
  margin-top: -25%;
}
.serc{
  width:5% !important;
}
</style>