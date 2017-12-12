<template>
  <div>
    <div class="row justify-content-center">
      <div class="col">
        <div class="card">
          <div class="card-body text-center">
            <div class="row">
              <div class="col">
                <h1 class="card-title" align="left"><i class="fa fa-github" aria-hidden="true" v-if="isFromProjectGitHub()"></i>&nbsp;{{project.name}}</h1>
                <h4 class="card-text text-muted" align="left">&nbsp;&nbsp;{{project.description}}</h4>
              </div>
                <div class="row">
                  <div align="center">
                    <router-link v-bind:to="'/projects/'+project.id+'/issues'">
                      <button type="button" class="btn btn-info btn-md falko-button" v-if="isFromProjectGitHub()">
                        Backlog
                      </button>
                    </router-link>
                  </div>
                  <div align="center">
                    <router-link v-bind:to="'/projects/'+project.id+'/releases'">
                      <button type="button" class="btn btn-info btn-md falko-button">
                        Releases
                      </button>
                    </router-link>
                  </div>
                  <div align="center">
                    <edit-project v-on:edited-project="refreshProject()"></edit-project>
                  </div>
                  <div align="center">
                    <div class="row">
                      <delete-project></delete-project>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center" v-if="isFromProjectGitHub()">
        <div class="col-9" align="center">
          <issues-graphic></issues-graphic>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DeleteProject from './DeleteProject.vue';
import EditProject from './EditProject.vue';
import { HTTP } from '../../http-common';
import IssuesGraphic from '../Issues/IssuesGraphic'

export default {
  name: 'Project',
  components: {
    'delete-project': DeleteProject,
    'edit-project': EditProject,
    'issues-graphic': IssuesGraphic,
  },
  data() {
    return {
      project: {},
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },
  methods: {
    setProjectId() {
      this.$store.dispatch('setProject',  this.$route.params.id)
    },
    getProject() {
      const headers = { Authorization: this.token };
      this.isFromProjectGitHub();
      HTTP.get(`projects/${this.$route.params.id}`, { headers })
        .then((response) => {
          this.project = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    refreshProject() {
      this.getProject();
    },
    isFromProjectGitHub() {
      if (this.project.is_project_from_github) {
        localStorage.setItem('is_project_from_github', 'true');
        return true;
      }
      localStorage.setItem('is_project_from_github', 'false');
      return false;
    },
  },
  mounted() {
    this.getProject(this.$route.params.id);
    this.setProjectId();
  },
};
</script>


<style scoped>
#buttons {
  margin-top: 1em;
}
.btn {
  width: 120px;
  margin-right: 4px;
}
.card {
  align-self: center;
  border-style: none;
  margin-top: 20px;
}
h1 {
  color: #598392;
}

#dashBoard {
  text-align: center;
  align-content: center;
}
</style>
