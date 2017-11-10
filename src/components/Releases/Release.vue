<template>
  <div>
    <div class="row justify-content-around" id="releaseData">
      <div class="col-md-8">
        <ul class="list-inline">
          <li class="list-inline-item vertical-center">
            <h1>{{release.name}}</h1>
          </li>
          <li class="list-inline-item vertical-center small-float-right">
            <h5 class="float-left">
              {{release.initial_date}}
              |
              {{release.final_date}}
            </h5>
          </li>
          <p class="text-justify text-muted">
            {{release.description}}
          </p>
        </ul>
      </div>
      <div class="col-md-3">
        <ul class="list-inline">
          <li class="list-inline-item">
            <edit-release v-on:edited-release="refreshRelease()"></edit-release>
          </li>
          <li class="list-inline-item">
            <delete-release></delete-release>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md" align="center">
      <router-link v-bind:to="'/releases/'+release.id+'/sprints'">
        <button type="button" class="btn btn-info btn-md falko-button" id="sprints">
          Sprints
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import EditRelease from './EditRelease.vue';
import DeleteRelease from './DeleteRelease.vue';
import dateConvert from '../../mixins/dateConvert';
import { HTTP } from '../../http-common';

export default {
  components: {
    'edit-release': EditRelease,
    'delete-release': DeleteRelease,
  },

  data() {
    return {
      release: {},
    };
  },

  mixins: [dateConvert],

  methods: {
    getRelease() {
      const token = localStorage.getItem('token');
      const tokenSimple = token.replace(/"/, '');
      const tokenSimple2 = tokenSimple.replace(/"/, '');
      const headers = { Authorization: tokenSimple2 };

      HTTP.get(`releases/${this.$route.params.id}`, { headers })
        .then((response) => {
          this.release = response.data;

          this.release.initial_date = this.dateConvert(this.release.initial_date);
          this.release.final_date = this.dateConvert(this.release.final_date);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    refreshRelease() {
      this.getRelease();
    },
  },

  ready() {
    this.dateConvert();
  },

  mounted() {
    this.getRelease();
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

#releaseData {
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
