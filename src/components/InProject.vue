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
        <EditProject v-on:edited-project="getProject($event)"></EditProject>
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
import {HTTP} from '../http-common.js';
import { mapState } from 'vuex';

export default {
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
  computed: {
    ...mapState({
      token: state => state.auth.token,
    })
  },
  methods: {
    getProject(param) {
      var headers = { 'Authorization':this.token };

      HTTP.get(`projects/${param}`, { headers })
      .then((response) => {
        this.project = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
  },
  mounted() {
    this.getProject(this.$route.params.id);
  }
};
</script>


<style scoped>
#buttons {
  margin-top: 1em;
}

</style>
