<template>
  <div>
    <div v-if="isProjectsEmpty()">
      <no-content parent ="Project"></no-content>
    </div>
    <div class="row top-buffer" v-for="i in Math.ceil(projects.length / 2)">
      <div v-for="project in projects.slice((i-1) * 2,i*2)" class="col-md-6 text-center">
        <router-link v-bind:to="'/projects/'+project.id">
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
        <add-project v-on:added="refreshProjects()"></add-project>
      </div>
      <div class="col-md-3">
        <div v-if="isGitHubAuthenticated()">
          <github-projects v-on:added="refreshProjects()"></github-projects>
        </div>
        <div v-else>
          <github-projects></github-projects>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import AddProject from './AddProject.vue';
import NoContent from '../NoContent.vue';
import GitHubProjects from '../GitHub/GitHubProjects.vue';
import { HTTP } from '../../http-common';

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
      is_github_authenticated: false,
    };
  },
  methods: {
    getProjects() {
      const rawToken = localStorage.getItem('token');
      const token = rawToken.replace(/"/, '').replace(/"/, '');
      const headers = { Authorization: token };
      const userId = localStorage.getItem('user_id');

      HTTP.get(`users/${userId}/projects`, { headers })
        .then((response) => {
          this.projects = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    gitHubAuthenticated() {
      const rawToken = localStorage.getItem('token');
      const token = rawToken.replace(/"/, '').replace(/"/, '');
      const headers = { Authorization: token };
      const userId = localStorage.getItem('user_id');

      HTTP.get(`users/${userId}`, { headers })
        .then((response) => {
          if (response.data.access_token != null) {
            this.is_github_authenticated = true;
          } else {
            this.is_github_authenticated = false;
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    isGitHubAuthenticated() {
      return this.is_github_authenticated;
    },

    refreshProjects() {
      this.getProjects();
      this.gitHubAuthenticated();
    },

    isProjectsEmpty() {
      return this.projects.length === 0;
    },
  },
  mounted() {
    this.getProjects();
    this.gitHubAuthenticated();
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

.disabled-button-github {
  cursor: none;
}

</style>
