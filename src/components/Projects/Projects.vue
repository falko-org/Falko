<template>
  <div>
    <div v-if="isProjectsEmpty()">
      <no-content parent ="Project"></no-content>
    </div>
    <tr> <td colspan="2" bgcolor="#FFFFFF" height="30">&nbsp;</td> </tr>
    <div class="row justify-content-around" v-for="i in Math.ceil(projects.length / 2)">
      <div v-for="project in projects.slice((i-1) * 2,i*2)" class="col-5">
        <div align="center">
          <div class="card" id="projectCard">
            <router-link v-bind:to="'/projects/'+project.id">
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
                  <div class="col">
                    <p class="card-text text-justify">
                      {{project.description}}
                    </p>
                  </div>
                  <div class="col-md-4 justify-content-center">
                    <grade id="grade" align="center" v-bind:project="project.id"></grade>
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
        <add-project v-on:added="refreshProjects()"></add-project>
      </div>
      <div class="col-md-3">
        <github-projects v-on:added="refreshProjects()"></github-projects>
      </div>
    </div>
    <div v-if="!this.isGitHubAuthenticated" class="row justify-content-center" id="importTutorial">
      <p class="text-muted">
        To import a repository, you must have previously linked your github account
      </p>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex';
import AddProject from './AddProject.vue';
import NoContent from '../NoContent.vue';
import GitHubProjects from '../GitHub/GitHubProjects.vue';
import { HTTP } from '../../http-common';
import Grade from './Grade.vue'

export default {
  name: 'projects',
  components: {
    'add-project': AddProject,
    'no-content': NoContent,
    'github-projects': GitHubProjects,
    'grade': Grade,
  },

  data() {
    return {
      projects: [],
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
      userId: state => state.auth.userId,
      isGitHubAuthenticated: state => state.auth.isGitHubAuthenticated,
    }),
  },
  methods: {
    setGitHubAuthenticationVuex() {
      const headers = { Authorization: this.token };

      HTTP.get(`users/${this.userId}`, { headers })
        .then((response) => {
          const gitHubToken = response.data.access_token;

          if (gitHubToken != null) {
            this.$store.dispatch('linkedGitHub');
          } else {
            this.$store.dispatch('unlinkedGitHub');
          }
        });
    },

    getProjects() {
      const headers = { Authorization: this.token };

      HTTP.get(`users/${this.userId}/projects`, { headers })
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
    this.setGitHubAuthenticationVuex();
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
  /*border-color: #7799A5;*/
  box-shadow: 0 4px 12px 0 rgba(0,0,0,0.2);
  border-color: #5D6A6F;
}

#projectCard {
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.3);
  transition: 0.2s;
}

#projectHeader {
  background-color: #5D6A6F;
}

#projectTitle {
  margin: 0;
  color: white;
}

#importTutorial {
  margin-top: 1em;
  font-style: italic;
}

#grade {
  margin-left: 1.5em;
}
</style>
