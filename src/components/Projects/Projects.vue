<template>
  <div>
    <div v-if="isProjectsEmpty()">
      <no-content parent ="Project"></no-content>
    </div>
    <div class="row justify-content-around" v-for="i in Math.ceil(projects.length / 2)">
      <div v-for="project in projects.slice((i-1) * 2,i*2)" class="col-5">
        <div align="center">
          <div class="card" id="projectCard">
            <router-link v-bind:to="'/project/'+project.id">
              <div class="card-header" id="projectHeader">
                <div class="row align-itens-around" id="projectTitle">
                  <div class="col">
                    <h4 class="no-margin float-left"> {{project.name}}</h4>
                  </div>
                  <div class="col">
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="row align-itens-arround">
                  <div class="col-5 align-content-center">
                    <p class="card-text">
                      <Gpa></Gpa>
                    </p>
                  </div>
                  <div class="col">
                    <p class="card-text text-justify">
                      {{project.description}}
                    </p>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <br>
        </div>
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
import AddProject from '@/components/Projects/AddProject';
import { HTTP } from '../../http-common.js';
import NoContent from '@/components/NoContent';
import GitHubProjects from '@/components/GitHub/GitHubProjects';
import Gpa from '@/components/Gpa'
export default {
  name: 'projects',
  components: {
    'add-project': AddProject,
    'no-content': NoContent,
    'github-projects': GitHubProjects,
    'Gpa': Gpa,
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
div a {
  text-decoration: none;
  color: inherit;
}
#projectCard:hover {
  /* box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15); */
  border-color: #7799A5;
}
#projectCard {
  width: 30em;
}
#projectHeader {
  background-color: #7799A5;
}
#projectTitle {
  margin: 0;
  color: white;
}
</style>
