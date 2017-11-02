<template>
  <div>
    <div v-if="isProjectsEmpty()">
      <no-content parent ="Project"></no-content>
    </div>
    <div class="row top-buffer" v-for="i in Math.ceil(projects.length / 2)">
      <div v-for="project in projects.slice((i-1) * 2,i*2)" class="col-md-6 text-center">
        <router-link v-bind:to="'/project/'+project.id">
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
          <add-project v-on:added="refreshProjects"></add-project>
        </div>
        <div class="col-md-3">
          <github-projects v-on:added="refreshProjects"></github-projects>
        </div>
    </div>
  </div>

</template>

<script>
import AddProject from '@/components/AddProject';
import { HTTP } from '../http-common.js';
import NoContent from '@/components/NoContent';
import GitHubProjects from '@/components/GitHubProjects';

export default {

  name: 'projects',
  components: {
    'add-project': AddProject,
    'no-content': NoContent,
    'github-projects': GitHubProjects,
  },
  data() {
    return {
      projects: [],
    };
  },
  methods: {
    getProjects() {
      var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var headers = { 'Authorization':tokenSimple2 };

      var userId = localStorage.getItem('user_id');
      var userInt = parseInt(userId);

      HTTP.get(`users/${userInt}/projects`, { headers: headers })
        .then((response) => {
          this.projects = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    refreshProjects() {
      this.getProjects();
    },
    isProjectsEmpty() {
      return this.projects.length === 0;
    },
  },
  mounted() {
    this.getProjects();
  },
};
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
