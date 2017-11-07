<template>
  <div>
    <div class="row justify-content-around" id="sprintData">
      <div class="col-md-6">
        <ul class="list-inline">
          <li class="list-inline-item vertical-center">
            <h1>{{sprint.name}}</h1>
          </li>
          <li class="list-inline-item vertical-center small-float-right">
            <h5 class="float-left">
              {{ sprint.initial_date }}
              |
              {{ sprint.final_date }}
            </h5>
          </li>
          <p class="text-justify text-muted">
            {{sprint.description}}
          </p>
        </ul>
      </div>
      <div class="col-md-5" align="end">
          <li class="list-inline-item">
            <add-revision v-on:revisionCreated="setRevisionAsCreated()"
                               v-if="!isRevisionCreated()"></add-revision>

            <router-link v-else v-bind:to="'/revisions/'+sprintRevision.id">
              <button type="button" class="btn btn-info btn-md falko-button">
                Revision
              </button>
            </router-link>
          </li>
          <li class="list-inline-item">
            <edit-sprint></edit-sprint>
          </li>
          <li class="list-inline-item">
            <delete-sprint></delete-sprint>
          </li>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../../event-bus.js';
import { HTTP } from '../../http-common.js';
import EditSprint from '@/components/Sprints/EditSprint';
import DeleteSprint from '@/components/Sprints/DeleteSprint';
import dateConvert from '@/mixins/dateConvert'
import AddRevision from '@/components/Revision/AddRevision';
import Revision from '@/components/Revision/Revision';

export default{
  name: 'Sprint',
  components: {
    'edit-sprint': EditSprint,
    'delete-sprint': DeleteSprint,
    'add-revision': AddRevision,
  },
  data() {
    return {
      sprint: {},
      sprintRevision: [],
    };
  },

  mixins: [ dateConvert ],

  methods: {
    getSprint() {
      var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var headers = { 'Authorization':tokenSimple2 };

      HTTP.get(`sprints/${this.$route.params.id}`, { headers: headers })
        .then((response) => {
          this.sprint = response.data;
          this.sprint.initial_date = this.dateConvert(this.sprint.initial_date);
          this.sprint.final_date = this.dateConvert(this.sprint.final_date);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    getRevision() {
      var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var headers = { 'Authorization': tokenSimple2 };
        HTTP.get(`sprints/${this.$route.params.id}/revisions`, { headers: headers })
        .then((response) => {
          this.sprintRevision = response.data;
          if (this.sprintRevision == null) {
            this.setRevisionAsNotCreated();
          } else {
            this.setRevisionAsCreated();
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    setRevisionAsCreated() {
      localStorage.setItem('isRevisionCreated', 'true');
    },

    setRevisionAsNotCreated() {
      localStorage.setItem('isRevisionCreated', 'false');
    },

    isRevisionCreated() {
      var revision = localStorage.getItem('isRevisionCreated');

      return localStorage.getItem('isRevisionCreated') == 'true'
    }
  },

  ready() {
    this.dateConvert();
  },

  mounted() {
    const myThis = this;

    var token = localStorage.getItem('token');
    var tokenSimple = token.replace(/"/, "");
    var tokenSimple2 = tokenSimple.replace(/"/, "");
    var headers = { 'Authorization': tokenSimple2 };


    EventBus.$on('edited-sprint', () => {
      HTTP.get(`sprints/${this.$route.params.id}`, { headers: headers })
        .then((response) => {
          myThis.project = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    });
    this.getSprint();
    this.getRevision();
  },
};
</script>

<style scoped>
h1 {
  color: #688E9B;
  font-weight: bold;
}

h5 {
  color: rgba(1, 22, 30, 0.75);
  font-weight: lighter;
}

#sprintData {
  margin-top: 2em;
  margin-right: 0em;
}

.small-float-right {
  margin-left: 1em;
}
.vertical-center {
  vertical-align: middle;
}
</style>
