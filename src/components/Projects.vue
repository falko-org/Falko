<template>
  <div>   
    <div class="row top-buffer" v-for="i in Math.ceil(projects.length / 2)">
      <div v-for="project in projects.slice((i-1) * 2,i*2)" class="col-md-6">
        <router-link v-bind:to="'/inproject/'+project.id">
          <div class="card">
            <div class="card-body project">
              <div class="card-title">{{project.name}}</div>
              <div class="card-text">{{project.description}}</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <AddProj></AddProj>
      </div>
    </div>
  </div>

</template>

<script>
import { EventBus } from '../event-bus.js';
import AddProject from '@/components/AddProject';
import axios from 'axios';

export default{
  components: {
    'AddProj' : AddProject
  },
  name: 'projects',
  data() {
    return{
      projects: []
    }
  },
  methods: {
    getProjects() {
      axios.get("http://localhost:3000/projects")
      .then(response => {
        this.projects = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
    }
  },
  mounted() {
    var _this = this
    EventBus.$on('added-project', function (id) {
      axios.get("http://localhost:3000/projects")
      .then(response => {
        _this.projects = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
    });

    this.getProjects();
  }

}

</script>

<style scoped>

.top-buffer {
  margin-top:30px; 
}
</style>
