<template> 

  <v-data-table :headers="headers" :items="bb"   class="elevation-1" :search="search"
       :footer-props="{showFirstLastPage: true, itemsPerPageOptions: [10,20,40,-1], }">
 <template v-slot:top >
        <v-toolbar flat color="light-blue lighten-5">
          <v-toolbar-title>SAW</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-toolbar-title>SCHEDULED JOBS </v-toolbar-title>
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
 <!--
    <template v-slot:item.status_id="{ item }" >
       <v-btn ripple small v-if="item.status_id =='9'"  color="red lighten-2" rounded dark :loading="loading"  @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
       <v-btn ripple small v-else-if="item.status_id =='12'"  color="teal" rounded dark :loading="loading"  @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
       <v-btn ripple small v-else color="blue lighten-3" rounded dark :loading="loading"   @click.prevent="chstatus(item)">{{item.Status}}</v-btn>
    </template>
    <template v-slot:item.flag="{ item }">
        <v-icon small > mdi-flag-outline </v-icon>
    </template>
-->

  </v-data-table>
 
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapState, mapActions} from 'vuex';
import axios from "axios";
export default
{  computed: 
   { //...mapState({ sawlist: 'saw/sawlist', }),
    // ...mapActions({getsaws:'saw/getsaws'}),
        ...mapState({ sawbars: state => state.sawtables.sawbars, 

              }),
        ...mapGetters({
                      }),

            },
    props:{bb:Array},
  data() { return {dialog: false,search: '',
          headers: [
              { text: 'created_at', align: 'left', value: 'created_at'},
               { text: 'updated_at', align: 'left',  value: 'updated_at'},
              { text: 'created_by', align: 'left',  value: 'createdby.name'},
               { text: 'updated_by', align: 'left',  value: 'updatedby.name'},
              { text: 'cut_date', align: 'left',  value: 'cut_date'},
              { text: 'schedule_saw', align: 'left',  value: 'schedule_saw'},
              { text: 'cut_saw', align: 'left',  value: 'cut_saw'},
              { text: 'quote_ID', value: 'quote_ID',sortable: false },
              { text: 'order_ID', value: 'order_ID' ,sortable: false},
              { text: 'Time (Min)', value: 'cut_time',sortable: false },
              { text: 'Status', value: 'status_id', sortable: false },
              { text: 'Flag', value: 'review', sortable: false },
            ],
             }
          },
  methods: {  
        
          },

}
</script>

<style scoped>

</style>