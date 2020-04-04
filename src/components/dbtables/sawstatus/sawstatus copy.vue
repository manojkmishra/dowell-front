<template>
    <div class="mt-3">
      <!--  <sawschedules v-bind:bb="aa" :loading="loading"></sawschedules> -->
        <v-flex>
            <v-card>
        <v-list>
            <v-list-group
              v-for="item in items"
              v-model="item.active"
              :key="item.title"
              :prepend-icon="item.icon"
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>              
              <v-list-tile 
                v-for="item in item.children"
                :key="item.title" 
                :prepend-icon="item.icon"
                @click="editChildItem(item)">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content> 
                <v-list-tile-action><v-btn icon class="mx-0" @click="editChildItem(item)">
              <v-icon color="teal"item>edit</v-icon>
            </v-btn>
                </v-list-tile-action>
                <v-list-tile-action>
            <v-btn icon class="mx-0" @click="deleteChildItem(item)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
                  </v-list-tile-action>
              </v-list-tile>
            </v-list-group>
          </v-list>
            </v-card></v-flex>
    </div>
</template>
<script>
 import Vue from 'vue';
    import { mapGetters, mapState, mapActions} from 'vuex'
    import sawschedules from './sawbarlist.vue'
    export default 
    {   data(){return{aa:[], loading:false}},
        components: { 'sawschedules': sawschedules, },
        created(){ this.loading=true;
             this.$store.dispatch('getsawstatus')
                    .then((res) => { //this.loading=false;
                                console.log('getstatus response',res.data)  
                                this.aa=res.data;
                                this.loading=false;
                        })
        }
    }

</script>
<style>

</style>