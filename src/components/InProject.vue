<template>
  <div>
    <div class="row inproject">
      <div class="col-md-10">
        <div class="card aproject">
          <div class="card-body ">
            <h4 class="card-title">{{project.name}}</h4>
            <p class="card-text text-muted">{{project.description}}</p>
          </div>
        </div>
      </div>
    </div>
        <div class="row justify-content-center" id="buttons">
          <div class="col-md-2">
            <EditProject></EditProject>
          </div>
          <div class="col-md-2">
            <DelProject></DelProject>
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
};
</script>


<style scoped>
#buttons {
  margin-top: 1em;
}

.aproject{
  position: relative;
  left: 5em;
  text-align: center;
}
</style>
