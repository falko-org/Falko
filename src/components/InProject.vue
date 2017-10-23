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
        <EditProject></EditProject>
      </div>
      <div class="col-md-2" align="center">
        <DelProject></DelProject>
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
import DeleteProject from '@/components/DeleteProject';
import EditProject from '@/components/EditProject';
import { EventBus } from '../event-bus.js';
import {HTTP} from '../http-common.js';

export default{
  name: 'InProject',
  components: {
    DelProject: DeleteProject,
    EditProject,
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
      var headers = { 'Authorization':tokenSimple2 };
      HTTP.get(`projects/${this.$route.params.id}`, {headers:headers})
      .then((response) => {
        this.project = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
  },
  mounted() {
    const myThis = this;
    EventBus.$on('edited-project', (id) => {
      HTTP.get(`projects/${id}`)
      .then((response) => {
        myThis.project = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
    });
    this.getProject();
  },
  updated(){
    this.getProject();
  }
};
</script>


<style scoped>
#buttons {
  margin-top: 1em;
}

</style>
