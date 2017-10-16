<template>
  <div>
    <div class="row insprint">
      <div class="col-md-10">
        <div class="card asprint">
          <div class="card-body ">
            <h4 class="card-title">{{sprint.name}}</h4>
            <p class="card-text text-muted">{{sprint.description}}</p>
          </div>
        </div>
      </div>
    </div>
        <div class="row justify-content-center" id="buttons">
          <div class="col-md-2">
            <EditProject></EditProject>
          </div>
          <div class="col-md-2">
            <DeleleteSprint></DeleleteSprint>
          </div>
        </div>
  </div>
</template>

<script>
import DeleteSprint from '@/components/DeleteSprint';
import EditProject from '@/components/EditProject';
import { EventBus } from '../event-bus.js';
import {HTTP} from '../http-common.js';

export default{
  name: 'InSprint',
  components: {
    DeleleteSprint: DeleteSprint,
    EditProject,
  },
  data() {
    return {
      sprint: {},
    };
  },
  methods: {
    getSprint() {

      var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var headers = { 'Authorization':tokenSimple2 };

      HTTP.get(`projects/1/sprints/${this.$route.params.id}`, {headers:headers})
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
    EventBus.$on('edited-sprint', (id) => {
      HTTP.get(`sprints/${id}`)
        .then((response) => {
          myThis.project = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    });
    this.getSprint();
  },
};
</script>


<style scoped>
#buttons {
  margin-top: 1em;
}

.asprint{
  position: relative;
  left: 5em;
  text-align: center;
}
</style>
