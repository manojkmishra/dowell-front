<template>
    <div class="mt-3">
      <!--  <sawschedules v-bind:bb="aa" :loading="loading"></sawschedules> -->
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        top
        color="deep-purple accent-4"
      ></v-progress-linear>
    <v-simple-table light class="elevation-1" >
             <template v-slot:top>
        <v-toolbar flat color="light-blue lighten-5">
          <v-toolbar-title>SAW</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-toolbar-title>FLAGS</v-toolbar-title>
        </v-toolbar>
    </template> 
    <template v-slot:default>        
      <thead>
        <tr><th class="text-left">ID</th>
        <th class="text-left">R</th> <th class="text-left">G</th> <th class="text-left">B</th>
          <th class="text-left">Flag</th>
          <th class="text-left">Name</th>
          <th class="text-left">Comment</th>
          <th class="text-left">CREATEDBY</th>
          <th class="text-left">UPDATEDBY</th>
          <th class="text-left">UPDATEDAT</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in aa" :key="item.name">
             <td>{{ item.id }}</td>
              <td>{{ item.red }}</td>
               <td>{{ item.green }}</td>
                <td>{{ item.blue }}</td>
                 <td>
                    <v-icon v-bind:style="{ color: 'rgb('+item.red+','+item.green+','+item.blue+')' }" >
                        mdi-flag</v-icon>
                   
                </td>
          <td>{{ item.name }}</td>
          <td>{{ item.comment }}</td>
                    <td>{{ item.createdby.name }}</td>
          <td>{{ item.updatedby.name }}</td>
          <td>{{ item.updated_at }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
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
             this.$store.dispatch('getsawflags')
                    .then((res) => { //this.loading=false;
                                console.log('getsawflags response',res.data)  
                                this.aa=res.data;
                                this.loading=false;
                        })
        }
    }

</script>
<style>

</style>