<template>
  <v-data-table :headers="headers" :items="joblist"   class="elevation-1" 
       :footer-props="{showFirstLastPage: true, itemsPerPageOptions: [10,20,40,-1], }">
    <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>JOB LIST</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
    </template>
 
    <template v-slot:item.action="{ item }">
       <v-btn v-if="item.Status_id =='9'"  color="danger" rounded dark   @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
       <v-btn v-else-if="item.Status_id =='12'"  color="teal" rounded dark   @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
       <v-btn v-else-if="item.Status =='Up Next'"  color="blue darken-3" rounded dark   @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
       <v-btn v-else-if="item.Status =='Flagged'"  color="red lighten-1" rounded dark   @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
       <v-btn v-else color="blue lighten-3" rounded dark    @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
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
        { dialog: false,
          headers: [
              { text: 'Cut Date', align: 'left', sortable: false, value: 'cut_date',},
              { text: 'Order No', value: 'Order_Number',sortable: false },
              { text: 'Customer', value: 'Customer' ,sortable: false},
              { text: 'Time (Min)', value: 'Time',sortable: false },
              { text: 'Color', value: 'Color', sortable: false},
              { text: 'Status', value: 'action', sortable: false },
               { text: 'Flag', value: 'flag', sortable: false },
            ],
 
        }),

    computed: 
       {  ...mapState({ sawlist: state => state.saw.sawlist, 
                        joblist:state =>state.saw.joblist,
                   }),
           
       },
    watch: {   },
    created () {  },
    mounted() { console.log('joblist.vue-this.sawlist=',this.sawlist)
                console.log('joblist.vue-this.joblist=',this.joblist)    
              },
    methods: 
    {   chstatus(item){console.log('chstatus-',item)},
      


    },
  }
</script>