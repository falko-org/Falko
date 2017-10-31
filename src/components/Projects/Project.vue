<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="card">
          <div class="card-body text-center">
            <h4 class="card-title">{{project.name}}</h4>
            <p class="card-text text-muted">{{project.description}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" id="buttons">
      <div class="col-md-2" align="center">
        <edit-project v-on:edited-project="refreshProject($event)"></edit-project>
      </div>
      <div class="col-md-2" align="center">
        <delete-project></delete-project>
      </div>
      <div class="col-md-2" align="center">
        <Gpa></Gpa>
      </div>
      <div class="col-md-2" align="center">
        <router-link v-bind:to="'/inproject/'+project.id+'/sprints'">
          <button type="button" class="btn btn-info btn-md falko-button" id="sprints">
            Sprints
          </button>
        </router-link>
      </div>
      <div class="col-md-2" align="center">
        <router-link v-bind:to="'/inproject/'+project.id+'/releases'">
          <button type="button" class="btn btn-info btn-md falko-button">
            Releases
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Gpa from '@/components/Gpa'
import DeleteProject from '@/components/Projects/DeleteProject';
import EditProject from '@/components/Projects/EditProject';
import { HTTP } from '../../http-common.js';

export default{
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
  methods: {
    getProject() {
      var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var headers = { 'Authorization': tokenSimple2 };
      HTTP.get(`projects/${this.$route.params.id}`, { headers: headers })
        .then((response) => {
          this.project = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    refreshProject(event) {
      var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var headers = { 'Authorization': tokenSimple2 };
      HTTP.get(`projects/${event}`, { headers: headers })
        .then((response) => {
          this.project = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  mounted() {
    this.getProject();
  },
};
</script>


<style scoped>
#buttons {
  margin-top: 1em;
}

</style>
