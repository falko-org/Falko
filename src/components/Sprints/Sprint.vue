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
          <add-retrospective v-on:retrospectiveCreated="setRetrospectiveAsCreated()"
          v-if="!isRetrospectiveCreated()"></add-retrospective>

          <router-link v-else v-bind:to="'/retrospectives/'+sprintRetrospective.id">
            <button type="button" class="btn btn-info btn-md falko-button">
              Retrospective
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EditSprint from './EditSprint.vue';
import DeleteSprint from './DeleteSprint.vue';
import dateConvert from '../../mixins/dateConvert';
import AddRetrospective from '@/components/Retrospective/AddRetrospective.vue';
import { HTTP } from '../../http-common';

export default{
  name: 'Sprint',
  components: {
    'edit-sprint': EditSprint,
    'delete-sprint': DeleteSprint,
    'add-retrospective': AddRetrospective,
  },
  data() {
    return {
      sprint: {},
      sprintRetrospective: [],
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
