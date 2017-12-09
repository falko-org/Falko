<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="card">
          <div class="card-body text-center">
            <div class="row">
              <div class="col-md-4">
                <Gpa></Gpa>
              </div>
              <div class="col-md-3">
                <h4 class="card-title">{{project.name}}</h4>
              </div>
            </div>
            <p class="card-text text-muted">{{project.description}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" id="buttons">
      <div class="col-md-2" v-if="isFromProjectGitHub()" align="center">
        <router-link v-bind:to="'/projects/'+project.id+'/issues'">
          <button type="button" class="btn btn-info btn-md falko-button">
            Backlog
          </button>
        </router-link>
      </div>
      <div v-bind:class="divClass()" align="center">
        <edit-project v-on:edited-project="refreshProject()"></edit-project>
      </div>
      <div v-bind:class="divClass()" align="center">
        <delete-project></delete-project>
      </div>
      <div v-bind:class="divClass()" align="center">
        <router-link v-bind:to="'/projects/'+project.id+'/releases'">
          <button type="button" class="btn btn-info btn-md falko-button">
            Releases
          </button>
        </router-link>
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
      isProjectFromGitHub: state => state.clientStatus.isProjectFromGitHub,
    }),
  },

  methods: {
    setProjectId() {
      this.$store.dispatch('setProject', this.$route.params.id);
    },

    setProjectOrigin() {
      if (this.project.is_project_from_github) {
        this.$store.dispatch('setProjectOrigin', true);
      } else {
        this.$store.dispatch('setProjectOrigin', false);
      }
    },

    getProject() {
      const headers = { Authorization: this.token };

      HTTP.get(`projects/${this.$route.params.id}`, { headers })
        .then((response) => {
          this.project = response.data;
          this.setProjectOrigin();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    refreshProject() {
      this.getProject();
    },

    isFromProjectGitHub() {
      return this.isProjectFromGitHub;
    },

    divClass() {
      if (this.isFromProjectGitHub()) {
        return 'col-md-3';
      }
      return 'col-md-2';
    },
  },

  mounted() {
    this.setProjectId();
    this.getProject(this.$route.params.id);
    this.setProjectId();
  },
};
</script>


<style scoped>
#buttons {
  margin-top: 1em;
}

</style>
