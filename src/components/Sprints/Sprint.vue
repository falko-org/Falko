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
      <div class="col-md-6">
        <li class="list-inline-item">
          <add-retrospective v-on:retrospectiveCreated="setRetrospectiveAsCreated()"
          v-if="!retrospectiveCreatedStatus()"></add-retrospective>

          <router-link v-else v-bind:to="'/retrospectives/'+sprintRetrospective.id">
            <v-btn type="button" 
                   class="primary btn-md falko-button"
            >
              Retrospective
            </v-btn>
          </router-link>
        </li>
        <li class="list-inline-item">
          <add-revision v-on:revisionCreated="setRevisionAsCreated()"
          v-if="!revisionCreatedStatus()"></add-revision>

          <router-link v-else v-bind:to="'/revisions/'+sprintRevision.id">
            <v-btn type="button" 
                   class="primary btn-md falko-button"
            >
              Revision
            </v-btn>
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
    <div class="metrics">
      <metrics></metrics>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EditSprint from './EditSprint.vue';
import DeleteSprint from './DeleteSprint.vue';
import dateConvert from '../../mixins/dateConvert';
import AddRetrospective from '../Retrospective/AddRetrospective.vue';
import AddRevision from '../Revision/AddRevision.vue';
import Revision from '../Revision/Revision.vue';
import Stories from '../Stories/Stories'
import { HTTP } from '../../http-common';
import Velocity from './Velocity.vue';
import Metrics from './Metrics.vue';

export default{
  name: 'Sprint',
  components: {
    'edit-sprint': EditSprint,
    'delete-sprint': DeleteSprint,
    'add-retrospective': AddRetrospective,
    'add-revision': AddRevision,
    'stories': Stories,
    'metrics': Metrics,
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
      isRetrospectiveCreated: state => state.clientStatus.isRetrospectiveCreated,
      isRevisionCreated: state => state.clientStatus.isRevisionCreated,
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
      this.$store.dispatch('setRetrospectiveCreatedStatus', true);
    },

    setRetrospectiveAsNotCreated() {
      this.$store.dispatch('setRetrospectiveCreatedStatus', false);
    },

    retrospectiveCreatedStatus() {
      return this.isRetrospectiveCreated;
    },

    getRevision() {
      const headers = { Authorization: this.token };

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
      this.$store.dispatch('setRevisionCreatedStatus', true);
    },

    setRevisionAsNotCreated() {
      this.$store.dispatch('setRevisionCreatedStatus', false);
    },

    revisionCreatedStatus() {
      return this.isRevisionCreated;
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
.metrics {
  margin-top: 40px;
  width: 99%;
}
</style>
