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
      <div class="col-md-6" align="end">
        <li class="list-inline-item">
          <router-link v-bind:to="'/sprints/'+$route.params.id+'/burndown'">
            <button type="button" class="btn btn-info btn-md falko-button">
              Burndown
            </button>
          </router-link>
        </li>
        <li class="list-inline-item">
          <add-retrospective v-on:retrospectiveCreated="setRetrospectiveAsCreated()"
          v-if="!isRetrospectiveCreated()">
          </add-retrospective>

          <router-link v-else v-bind:to="'/retrospectives/'+sprintRetrospective.id">
            <button type="button" class="btn btn-info btn-md falko-button">
              Retrospective
            </button>
          </router-link>
        </li>
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
          <router-link v-bind:to="'/sprints/'+sprint.id+'/velocity'">
            <button type="button" class="btn btn-info btn-md falko-button">
              Velocity
            </button>
          </router-link>
        </li>
        <li class="list-inline-item">
          <edit-sprint v-on:edited-sprint="refreshSprint()"></edit-sprint>
        </li>
        <li class="list-inline-item">
          <delete-sprint></delete-sprint>
        </li>
      </div>
    </div>
    <div class="row">
      <sprint-planing></sprint-planing>
    </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EditSprint from './EditSprint.vue';
import DeleteSprint from './DeleteSprint.vue';
import dateConvert from '../../mixins/dateConvert';
import AddRetrospective from '../Retrospective/AddRetrospective.vue';
import Retrospective from '../Retrospective/Retrospective.vue';
import AddRevision from '../Revision/AddRevision.vue';
import Revision from '../Revision/Revision.vue';
import SprintPlaning from '../SprintPlaning/SprintPlaning.vue';
import { HTTP } from '../../http-common';
import Velocity from './Velocity.vue';

export default{
  name: 'Sprint',
  components: {
    'edit-sprint': EditSprint,
    'delete-sprint': DeleteSprint,
    'add-retrospective': AddRetrospective,
    'add-revision': AddRevision,
    'sprint-planing': SprintPlaning,
  },
  data() {
    return {
      sprint: {},
      sprintRetrospective: [],
      sprintRevision: [],
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },

  mixins: [dateConvert],

  methods: {
    getSprint() {
      const headers = { Authorization: this.token };

      HTTP.get(`sprints/${this.$route.params.id}`, { headers })
      .then((response) => {
        this.sprint = response.data;
        this.sprint.initial_date = this.dateConvert(this.sprint.initial_date);
        this.sprint.final_date = this.dateConvert(this.sprint.final_date);
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },

    getRetrospective() {
      const headers = { Authorization: this.token };

      HTTP.get(`sprints/${this.$route.params.id}/retrospectives`, { headers })
      .then((response) => {
        this.sprintRetrospective = response.data;
        if (this.sprintRetrospective.length === 0) {
          this.setRetrospectiveAsNotCreated();
        } else {
          this.setRetrospectiveAsCreated();
        }
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },

    setRetrospectiveAsCreated() {
      localStorage.setItem('isRetrospectiveCreated', 'true');
    },

    setRetrospectiveAsNotCreated() {
      localStorage.setItem('isRetrospectiveCreated', 'false');
    },

    isRetrospectiveCreated() {
      return localStorage.getItem('isRetrospectiveCreated') === 'true';
    },

    getRevision() {
      const token = localStorage.getItem('token');
      const tokenSimple = token.replace(/"/, '');
      const tokenSimple2 = tokenSimple.replace(/"/, '');
      const headers = { Authorization: tokenSimple2 };
      HTTP.get(`sprints/${this.$route.params.id}/revisions`, { headers })
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
      const revision = localStorage.getItem('isRevisionCreated');

      return localStorage.getItem('isRevisionCreated') == 'true';
    },

    refreshSprint() {
      this.getSprint();
    },
  },

  ready() {
    this.dateConvert();
  },

  mounted() {
    this.getSprint();
    this.getRetrospective();
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
