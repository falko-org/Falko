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
    <div class="row justify-content-center">
        <div class="col-md-3">
          <add-project></add-project>
        </div>
        <div class="col-md-3">
          <github-projects></github-projects>
        </div>
    </div>
  </div>

</template>

<script>
import { EventBus } from '../event-bus.js';
import AddProject from '@/components/AddProject';
import {HTTP} from '../http-common.js';
import NoProjects from '@/components/NoProjects'
import GitHubProjects from '@/components/GitHubProjects'

export default{
  components: {
    'add-project' : AddProject,
    'no-projects': NoProjects,
    'github-projects': GitHubProjects
  },
  name: 'projects',
  data() {
    return{
      projects: []
    }
  },
  methods: {
    getProjects() {

      var token = localStorage.getItem('token');
			var tokenSimple = token.replace(/"/, "");
			var tokenSimple2 = tokenSimple.replace(/"/, "");
			var headers = { 'Authorization':tokenSimple2 };

      var user_id = localStorage.getItem('user_id');
			var user_int = parseInt(user_id);

      HTTP.get(`users/${user_int}/projects`, { headers: headers })
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
    this.getProjects();
    EventBus.$on('added-project', function (id) {
      HTTP.get("projects")
      .then(response => {
        _this.projects = response.data;
        this.$router.push({ path : 'Projects'});
      })
      .catch(e => {
        this.errors.push(e);
      });
    });

  },
  updated(){
    //this.getProjects();
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
