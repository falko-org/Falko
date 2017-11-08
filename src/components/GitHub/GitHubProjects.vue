<template>
  <div class="addgithubrepo">
    <div class="text-center">
      <button type="button" class="btn btn-info btn-md falko-button" v-on:click="getRepos" id="addButton" data-toggle="modal" data-target="#githubModal">
        Import GitHub repository
      </button>
    </div>
    <div class="modal fade" id ="githubModal" role="dialog">
      <div class="modal-dialog">
          <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Import GitHub Repository</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
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
  import { HTTP } from '../../http-common.js';
  export default{
    data() {
      return {
        userRepos: [],
        orgsRepos: [],
        selectedRepos: [],
        user: ""
      }
    },
    methods: {
      getRepos() {
        var token = localStorage.getItem('token');
        var tokenSimple = token.replace(/"/, "");
        var tokenSimple2 = tokenSimple.replace(/"/, "");
        var headers = { 'Authorization':tokenSimple2 };
        HTTP.get("repos", { headers: headers })
        .then(response => {
          this.userRepos = response.data.user[1].repos;
          this.orgsRepos = response.data.orgs;
          this.user = response.data.user[0].login;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      },
      toggleButtonChanged(name, event) {
        if (event.value === true) {
          this.selectedRepos.push(name);
        } else {
          this.selectedRepos = this.selectedRepos.filter(item => item !== name);
        }
      },
      importGithubProjects() {
        doRequisitions(this.selectedRepos, this.selectedRepos.length, this.user)
        .then((response) => {this.$emit('added');})
        .catch((e) => console.log(e.message));
      },
    }
  }
  function doRequisitions(repos, length, user) {
    return new Promise(
      (resolve, reject) => {
        var token = localStorage.getItem('token');
        var user_id = localStorage.getItem('user_id');
        var user_int = parseInt(user_id);
        var tokenSimple = token.replace(/"/, "");
        var tokenSimple2 = tokenSimple.replace(/"/, "");
        var headers = { 'Authorization':tokenSimple2 };
        var count = 0;
        for (var repo of repos) {
          HTTP.post(`users/${user_int}/projects`, {
            name: repo,
            github_slug: user + "/"+repo,
            is_project_from_github: true
          }, {headers: headers})
          .then((response) => {
            count++;
            if (count === length) {
              resolve(response);
            }
          })
          .catch((e) => reject(e));
        }
      }
    )
  }
</script>

<style scoped>
.vue-js-switch {
  float: right;
}
.pointer-cursor {
  cursor: pointer;
}
</style>
