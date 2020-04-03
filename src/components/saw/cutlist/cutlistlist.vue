<template>
  <v-data-table :headers="headers" :items="cutlist"   class="elevation-1" :search="search"
       :footer-props="{showFirstLastPage: true, itemsPerPageOptions: [10,20,40,-1], }">
    <template v-slot:top>
        <v-toolbar flat color="blue lighten-2" dark>
          <v-toolbar-title>JOBS</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-toolbar-title>SAW - {{selectedSaw.replace(/_/g, " ")}}</v-toolbar-title>
          <v-spacer></v-spacer>
                <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        </v-toolbar>
    </template>
 
    <template v-slot:item.action="{ item }" >
       <v-btn ripple small v-if="item.Status_id =='7'"  color="red lighten-2" rounded dark :loading="loading"  @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
       <v-btn ripple small v-else-if="item.Status_id =='6'"  color="teal" rounded dark :loading="loading"  @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
       <v-btn ripple small v-else color="blue lighten-3" rounded dark :loading="loading"   @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
    </template>
    <template v-slot:item.flag="{ item }">
        <v-icon small > mdi-flag-outline </v-icon>
    </template>

  </v-data-table>
</template>
 
<script>
import { mapGetters, mapState, mapActions} from 'vuex';
  export default 
  {   data: () => (
        { dialog: false,search: '',
          headers: [
              { text: 'SNO', align: 'left', sortable: false, value: 'SNO', width:"12%"},
              { text: 'Extrusion', value: 'Extrusion',sortable: false },
              { text: 'Description', value: 'Description', sortable: false},
              { text: 'Item', value: 'Item', sortable: false },
              { text: 'Color', value: 'Color', sortable: false },
              { text: 'Length', value: 'Length', sortable: false },
              { text: 'Qty', value: 'Cuts', sortable: false },
              { text: 'Status', sortable: false },
            ],
           formSearchData: {  SawCode: '',  QuoteID: '',  order_ID:'',  }, loading:false,
        }),

    computed: 
       {  ...mapState({ sawlist: state => state.saw.sawlist, 
                        cutlist:state =>state.saw.cutlist,
                        selectedSaw: state => state.saw.selectedSaw,
                   }),
           
       },
    watch: {   },
    created () {  },
    mounted() {  
              },
    methods: 
    {   chstatus(data)
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
    },
  }
</script>
<style scoped>

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

</style>