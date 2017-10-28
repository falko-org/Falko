<template>
  <div>
    <div class="row insprint">
      <div class="col-md-10">
        <div class="card asprint">
          <div class="card-body ">
            <h4 class="card-title">{{sprint.name}}</h4>
            <p class="card-text text-muted">{{sprint.description}}</p>
            <p class="card-text text-muted">{{sprint.start_date}}</p>
            <p class="card-text text-muted">{{sprint.end_date}}</p>
          </div>
        </div>
      </div>
    </div>
        <div class="row justify-content-center" id="buttons">
          <div class="col-md-2" align="center">
            <add-retrospective></add-retrospective>
          </div>
          <div class="col-md-2" align="center">
            <EditSprint></EditSprint>
          </div>
          <div class="col-md-2" align="center">
            <DeleleteSprint></DeleleteSprint>
          </div>
        </div>
  </div>
</template>

<script>
import DeleteSprint from '@/components/Sprints/DeleteSprint';
import EditSprint from '@/components/Sprints/EditSprint';
import AddRetrospective from '@/components/RetrospectiveComponents/AddRetrospective';
import { EventBus } from '../../event-bus.js';
import {HTTP} from '../../http-common.js';

export default{
  name: 'InSprint',
    components: {
      DeleleteSprint: DeleteSprint,
      EditSprint,
    'add-retrospective': AddRetrospective
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

      HTTP.get(`sprints/${this.$route.params.id}`, {headers:headers})
        .then((response) => {
          this.sprint = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  mounted() {
    const myThis = this;

    var token = localStorage.getItem('token');
    var tokenSimple = token.replace(/"/, "");
    var tokenSimple2 = tokenSimple.replace(/"/, "");
    var headers = { 'Authorization':tokenSimple2 };


    EventBus.$on('edited-sprint', (id) => {
      HTTP.get(`sprints/${this.$route.params.id}`, {headers:headers})
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
