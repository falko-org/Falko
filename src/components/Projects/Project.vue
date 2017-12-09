<template>
  <div>
    <div class="row justify-content-center">
      <div class="col">
        <div class="card">

          <div class="card-body text-center">
            <div class="row">
              <div class="col">
                <h1 class="card-title"><i class="fa fa-github" aria-hidden="true" v-if="isFromProjectGitHub()"></i>&nbsp;{{project.name}}</h1>
                <p class="card-text text-muted">{{project.description}}</p>
              </div>

                <div class="row">

                  <div v-bind:class="divClass()" align="center">
                    <router-link v-bind:to="'/projects/'+project.id+'/issues'">
                      <button type="button" class="btn btn-info btn-md falko-button" v-if="isFromProjectGitHub()">
                        Backlog
                      </button>
                    </router-link>
                  </div>
                  <div v-bind:class="divClass()" align="center">
                    <router-link v-bind:to="'/projects/'+project.id+'/releases'">
                      <button type="button" class="btn btn-info btn-md falko-button">
                        Releases
                      </button>
                    </router-link>
                  </div>
                  <div v-bind:class="divClass()" align="center">
                    <edit-project v-on:edited-project="refreshProject()"></edit-project>
                  </div>
                  <div v-bind:class="divClass()" align="center">
                    <delete-project></delete-project>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DeleteProject from './DeleteProject.vue';
import EditProject from './EditProject.vue';
import Gpa from '../Gpa.vue';
import { HTTP } from '../../http-common';

export default {
  name: 'Project',
  components: {
    'delete-project': DeleteProject,
    'edit-project': EditProject,
    Gpa,
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

    divClass() {
      if (this.isFromProjectGitHub()) {
        return 'col-md-3';
      }
      return 'col-md-2';
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
}

.card {
  align-self: center;
  border-style: none;
  margin-top: 20px;
}

h1 {
  color: #598392;
}

.card-title {
  text-align: left;
}

</style>
