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
              {{converted_initial_date}}
              |
              {{converted_final_date}}
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
import { mapState } from 'vuex';
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
      converted_initial_date: "",
      converted_final_date: ""
    };
  },

  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },

  mixins: [dateConvert],

  methods: {
    getRelease() {
      const headers = { Authorization: this.token };

      HTTP.get(`releases/${this.$route.params.id}`, { headers })
        .then((response) => {
          this.release = response.data;
          this.converted_initial_date = this.dateConvert(this.release.initial_date);
          this.converted_final_date = this.dateConvert(this.release.final_date)
          this.setReleaseDates();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    setReleaseDates() {
      this.$store.dispatch('setReleaseInitialDate', this.release.initial_date);
      this.$store.dispatch('setReleaseFinalDate', this.release.final_date);
    },

    refreshRelease() {
      this.getRelease();
    },
  },

  created() {
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
