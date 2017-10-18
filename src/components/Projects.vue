<template>
  <div>
    <div v-if="isProjectsEmpty()">
      <no-projects></no-projects>
    </div>
    <div class="row top-buffer" v-for="i in Math.ceil(projects.length / 2)">
      <div v-for="project in projects.slice((i-1) * 2,i*2)" class="col-md-6 text-center">
        <router-link v-bind:to="'/inproject/'+project.id">
          <div class="card">
            <div class="card-body project">
              <h4 class="card-title">
                  {{project.name}}
              </h4>
              <p class="card-text text-muted">{{project.description}}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="col">
      <AddProj></AddProj>
    </div>
  </div>

</template>

<script>
import { EventBus } from '../event-bus.js';
import AddProject from '@/components/AddProject';
import {HTTP} from '../http-common.js';
import NoProjects from '@/components/NoProjects'

export default{
  components: {
    'AddProj' : AddProject,
    'no-projects': NoProjects
  },
  name: 'projects',
  data() {
    return{
      projects: []
    }
  },
  methods: {
    getProjects() {
      HTTP.get("projects")
      .then(response => {
        this.projects = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
    },

    isProjectsEmpty() {
      return this.projects.length == 0
    }
  },
  mounted() {
    var _this = this
    EventBus.$on('added-project', function (id) {
      HTTP.get("projects")
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

a:link {
  text-decoration: none !important;
  color: inherit;
}

a:hover {
  font-weight: bold;
}
</style>
