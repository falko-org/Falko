<template>
  <div class="addgithubrepo">
    <div class="text-center">
      <button type="button" id="addButton"
              v-bind:class="buttonClass()"
              v-bind:disabled="!this.isGitHubAuthenticated"
              v-on:click="getRepos()"
              v-bind:data-toggle="buttonDataToggle()" data-target="#githubModal"
      >
        Import GitHub repository
      </button>
    </div>
    <div class="modal fade" id="githubModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content" id="importProjectsModal">
          <div class="modal-header">
            <h4 class="modal-title">Import GitHub Repository</h4>
            <button type="button" class="close" data-dismiss="modal" v-on:click="clean" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="row">
            <div class="col align-self-center margin" v-if="loading" align="center">
              <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
            </div>
          </div>
          <div class="row modal-body">
            <div class="col" v-if="userRepos.length != 0">
              <h4
              data-toggle="collapse"
              class="pointer-cursor dropdown-toggle"
              href="#userReposCollapse"
              aria-expanded="false"
              aria-controls="userReposCollapse"
              >
                User Repositories
              </h4>
              <div class="collapse" id="userReposCollapse">
                <div class="scroll-style-github-projects">
                  <ul class="list-group">
                    <li class="list-group-item" v-for="userRepo in userRepos" >
                      {{userRepo}}
                      <toggle-button class="pointer-cursor" v-on:change="toggleButtonChanged(user + '/' + userRepo, $event)"
                      :value="false"
                      color="#AEC3B0"
                      :labels="true" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col" v-else>
              <div v-if="userRepos.length != 0">
                <h4
                data-toggle="collapse"
                class="pointer-cursor dropdown-toggle"
                href="#userReposCollapse"
                aria-expanded="false"
                aria-controls="userReposCollapse">User Repositories
                </h4>
                <div class="collapse" v-bind:id="orgs.name">
                  <div class="scroll-style-github-projects">
                    <ul class="list-group">
                      <li class="list-group-item" v-for="repo in orgs.repos">
                        {{repo}}
                        <toggle-button class="pointer-cursor" v-on:change="toggleButtonChanged(orgs.name + '/' + repo, $event)"
                        :value="false"
                        color="#AEC3B0"
                        :labels="true" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div v-if="orgsRepos.length != 0">
                <div v-for="orgs in orgsRepos">
                  <h4
                  data-toggle="collapse"
                  class="pointer-cursor dropdown-toggle"
                  v-bind:href="'#'+orgs.name"
                  aria-expanded="false"
                  v-bind:aria-controls="orgs.name" >
                  {{orgs.name}}
                  </h4>
                  <div class="collapse" v-bind:id="orgs.name">
                    <ul class="list-group">
                      <li class="list-group-item" v-for="repo in orgsRepos.repos">
                        {{repo}}
                        <toggle-button class="pointer-cursor" v-on:change="toggleButtonChanged(repo, $event)"
                        :value="false"
                        color="#AEC3B0"
                        :labels="true" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary falko-button" v-on:click="importGithubProjects" data-dismiss="modal">Import</button>
            <button type="button" class="btn btn-secondary falko-button-grey" v-on:click="clean" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { HTTP } from '../../http-common';

export default {
  data() {
    return {
      userRepos: [],
      orgsRepos: [],
      selectedRepos: [],
      user: "",
      loading: false
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
    getRepos() {
      this.loading = true;
      const headers = { Authorization: this.token };
      if (this.isGitHubAuthenticated) {
        HTTP.get('repos', { headers })
        .then((response) => {
          this.loading = false;
          this.userRepos = response.data.user[1].repos;;
          this.orgsRepos = response.data.orgs;
          this.user = response.data.user[0].login;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      }
    },

    toggleButtonChanged(name, event) {
      if (event.value === true) {
        this.selectedRepos.push(name);
      } else {
        this.selectedRepos = this.selectedRepos.filter(item => item !== name);
      }
    },

    importGithubProjects() {
      this.doRequisitions(this.selectedRepos, this.selectedRepos.length, this.user)
        .then(() => this.$emit('added'))
        .catch(e => console.log(e.message));
    },

    doRequisitions(repos, length) {
      return new Promise((resolve, reject) => {
        const headers = { Authorization: this.token };
        let count = 0;
        for (const repo of repos) {
          HTTP.post(`users/${this.userId}/projects`, {
            name: repo.split("/")[1],
                github_slug: repo,
                is_project_from_github: true,
                is_scoring: true,
          }, { headers })
            .then((response) => {
              count++;
              if (count === length) {
                resolve(response);
              }
            })
            .catch(e => reject(e));
        }
      });
    },

    buttonClass() {
      if (this.isGitHubAuthenticated) {
        return 'falko-button btn btn-primary';
      }
      return 'btn btn-info btn-md falko-button-grey disabled-cursor';
    },

    buttonDataToggle() {
      if (this.isGitHubAuthenticated) {
        return 'modal';
      }
      return 'none';
    },

    clean() {
      this.userRepos = [];
      this.orgsRepos = [];
      this.selectedRepos = [];
      this.user = "";
    }
  },
};

</script>

<style scoped>
#importProjectsModal {
  min-height: 20em;
}

.vue-js-switch {
  float: right;
}

.margin {
  margin-top: 60px;
}
</style>
