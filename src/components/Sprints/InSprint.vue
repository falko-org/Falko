<template>
  <div>
    <div class="row justify-content-around no-margin">
      <div class="col-md-10">
        <div class="card asprint">
          <div class="card-body ">
            <h4 class="card-title">{{sprint.name}}</h4>
            <p class="card-text text-muted">{{sprint.description}}</p>
            <p class="card-text text-muted">{{sprint.start_date}}</p>
            <p class="card-text text-muted">{{sprint.end_date}}</p>
          </div>
        </div>
        <div class="row justify-content-between no-margin" id="buttons">
          <div class="col-md-3">
            <add-retrospective v-on:retrospectiveCreated="setRetrospectiveAsCreated()"
                               v-if="!isRetrospectiveCreated()"></add-retrospective>

            <router-link v-else v-bind:to="'/retrospective/'+sprintRetrospective.id">
              <button type="button" class="btn btn-info btn-md falko-button">
                Retrospective
              </button>
            </router-link>
          </div>
          <div class="col-md-3" align="center">
            <EditSprint></EditSprint>
          </div>
          <div class="col-md-3" align="end">
            <DeleleteSprint></DeleleteSprint>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeleteSprint from '@/components/Sprints/DeleteSprint';
import EditSprint from '@/components/Sprints/EditSprint';
import AddRetrospective from '@/components/RetrospectiveComponents/AddRetrospective';
import Retrospective from '@/components/RetrospectiveComponents/Retrospective';
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
      sprintRetrospective: []
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

    getRetrospective() {
      var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var headers = { 'Authorization':tokenSimple2 };

      HTTP.get(`sprints/${this.$route.params.id}/retrospectives`, {headers:headers})
        .then((response) => {
          
          this.sprintRetrospective = response.data;

          if (this.sprintRetrospective.length == 0) {
            this.setRetrospectiveAsNotCreated();
          }
        })
        .catch(e => {
          this.errors.push(e);
        });
    },

    setRetrospectiveAsCreated () {
      localStorage.setItem('isRetrospectiveCreated', 'true');
    },
    
    setRetrospectiveAsNotCreated () {
      localStorage.setItem('isRetrospectiveCreated', 'false');
    },

    isRetrospectiveCreated () {
      var retrospective = localStorage.getItem('isRetrospectiveCreated');

      return localStorage.getItem('isRetrospectiveCreated') == 'true'
    }
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

    this.getRetrospective();
  },
};
</script>


<style scoped>
#buttons {
  margin-top: 1em;
}

.asprint{
  text-align: center;
}
</style>
