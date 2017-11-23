<template>
  <div class="addgithubrepo">
    <div class="text-center">
      <button type="button" v-bind:class="buttonClass()" v-on:click="getRepos()" id="addButton" v-bind:data-toggle="buttonDataToggle()" data-target="#githubModal">
        Import GitHub repository
      </button>
    </div>
    <div class="modal fade" id ="githubModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Import GitHub Repository</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="userRepos.length != 0">
              <h4 data-toggle="collapse" class="pointer-cursor" href="#userReposCollapse" aria-expanded="false" aria-controls="userReposCollapse" >User Repos</h4>
              <div class="collapse" id="userReposCollapse">
                <ul class="list-group">
                  <li class="list-group-item" v-for="userRepo in userRepos" >
                    {{userRepo}}
                    <toggle-button class="pointer-cursor" v-on:change="toggleButtonChanged(userRepo, $event)"
                    :value="false"
                    color="#AEC3B0"
                    :labels="true" />
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="orgsRepos.length != 0">
              <div v-for="orgs in orgsRepos">
                <h4
                data-toggle="collapse"
                class="pointer-cursor"
                v-bind:href="'#'+orgs.name"
                aria-expanded="false"
                v-bind:aria-controls="orgs.name" >
                {{orgs.name}}
                </h4>
                <div class="collapse" v-bind:id="orgs.name">
                  <ul class="list-group">
                    <li class="list-group-item" v-for="repo in orgs.repos" >
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
          <div class="modal-footer">
            <button type="button" class="btn btn-primary falko-button" v-on:click="importGithubProjects" data-dismiss="modal">Import</button>
            <button type="button" class="btn btn-secondary falko-button" data-dismiss="modal" >Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { HTTP } from '../../http-common';

export default{
  data() {
    return {
      userRepos: [],
      orgsRepos: [],
      selectedRepos: [],
      user: '',
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
      userId: state => state.auth.userId,
    }),
  },
  methods: {
    getRepos() {
      const headers = { Authorization: this.token };
      if (this.isGitHubLinked()) {
        HTTP.get('repos', { headers })
        .then((response) => {
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
        .then(() => { this.$emit('added'); })
        .catch(e => console.log(e.message));
    },

    doRequisitions(repos, length, user) {
      return new Promise((resolve, reject) => {
        const headers = { Authorization: this.token };
        let count = 0;
        for (const repo of repos) {
          HTTP.post(`users/${this.userId}/projects`, {
            name: repo,
                github_slug: `${user}/${repo}`,
                is_project_from_github: true,
                is_scoring: false,
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
    
    isGitHubLinked() {
      return (localStorage.getItem('is_github_authenticated') === 'true');
    },

    buttonClass() {
      if (this.isGitHubLinked()) {
        return 'falko-button btn btn-primary';
      }
      return 'btn btn-info btn-md falko-button-grey disabled-cursor';
    },

    buttonDataToggle() {
      if (this.isGitHubLinked()) {
        return 'modal';
      }
      return 'none';
    },
  },
};
</script>

<style scoped>
.vue-js-switch {
  float: right;
}
.pointer-cursor {
  cursor: pointer;
}
</style>
