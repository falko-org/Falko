<template>
  <div>
    <div v-if="isReleasesEmpty()">
      <no-content parent ="Release"></no-content>
    </div>
    <div class="row">
      <div class="col-3">
        <div class="row">
          <add-release></add-release>
        </div>
        <div class="row">
          <div v-for="release in releases">
            <release-card v-bind:release="[release, releases.indexOf(release)]"></release-card>
          </div>
        </div>
      </div>

      <div class="col-8">
        <div class="row">
          <div class="col">
            <div class="row">
              <h4>{{this.releases[this.releaseIndex].name}}</h4>
            </div>
            <div class="row text-muted">
              <p>{{this.releases[this.releaseIndex].description}}</p>
            </div>
          </div>
          <div class="col">
            <div class="row">
              {{dateConvert(this.releases[this.releaseIndex].initial_date)}}
              |
              {{dateConvert(this.releases[this.releaseIndex].final_date)}}
            </div>
            <div class="row text-muted">
              <div class="col">
                <p>Amount of Sprints</p>
              </div>
              <div class="col">
                <p>{{this.releases[this.releaseIndex].amount_of_sprints}}</p>
              </div>
            </div>
          </div>
          <!-- {{this.getSprints(this.releases[this.releaseIndex].id)}} -->
        </div>

        <div class="row">
          <add-sprint v-bind:release="[
            this.releases[this.releaseIndex].id,
            dateConvert(this.releases[this.releaseIndex].initial_date),
            dateConvert(this.releases[this.releaseIndex].final_date)]">
          </add-sprint>
        </div>
        <div class="row">
          <div class="col">
            <div v-for="sprint in sprints">
              <sprint-card v-bind:sprint="sprint"></sprint-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { HTTP } from '../../http-common';
import { EventBus } from '../../event-bus';
import AddRelease from './AddRelease.vue';
import NoContent from '../NoContent.vue';
import ReleaseCard from './ReleaseCard.vue';
import SprintCard from '../Sprints/SprintCard.vue';
import AddSprint from '../Sprints/AddSprint.vue';
import dateConvert from '../../mixins/dateConvert';

export default {
  components: {
    'add-release': AddRelease,
    'no-content': NoContent,
    'release-card': ReleaseCard,
    'sprint-card': SprintCard,
    'add-sprint': AddSprint,
  },

  data() {
    return {
      releases: [],
      indexOfRelease: '',
      sprints: [],
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
      releaseId: state => state.clientStatus.releaseId,
      releaseIndex: state => state.clientStatus.releaseIndex,
    }),
  },

  mixins: [dateConvert],

  methods: {
    setProjetId() {
      this.$store.dispatch('setProject', this.$route.params.id);
    },

    setReleaseId() {
      this.$store.dispatch('setRelease', this.releases[this.releaseIndex].id);
    },

    setReleaseIndex(releaseIndex) {
      this.$store.dispatch('setReleaseIndex', releaseIndex);
    },

    getReleases() {
      const headers = { Authorization: this.token };

      HTTP.get(`projects/${this.$route.params.id}/releases`, { headers })
        .then((response) => {
          this.releases = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    getSprints() {
      const headers = { Authorization: this.token };

      HTTP.get(`releases/${this.releaseId}/sprints`, { headers })
        .then((response) => {
          if (response.data !== 0) {
            this.sprints = response.data;
          } else {
            this.sprint = 0;
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    isReleasesEmpty() {
      return this.releases.length === 0;
    },
  },

  ready() {
    this.dateConvert();
  },

  mounted() {
    this.setProjetId();

    this.getReleases();

    EventBus.$on('selected-release', (event) => {
      this.setReleaseIndex(event);
      this.setReleaseId();
      this.getSprints();
    });

    EventBus.$on('edited-release', () => {
      this.getReleases();
    });

    EventBus.$on('selected-sprint', (event) => {
      this.$router.push({ name: 'Sprint', params: { id: event } });
    });
  },
};
</script>

<style scoped>
div a {
  text-decoration: none;
  color: inherit;
}

#releaseCard {
  width: 30em;
}

#releaseHeader {
  background-color: #7799A5;
}

#releaseTitle {
  margin: 0;
  color: white;
}

#numberSprints {
  margin-left: -10;
}

#amountSprintsFont {
  font-weight:bolder;
  font-size:1.4em;
}

#releaseCard:hover {
  /* box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15); */
  border-color: #7799A5;
}

.number-circle {
  font: 32px Arial, sans-serif;

  width: 2.5em;
  height: 2.5em;
  box-sizing: initial;

  background: #fff;
  border: 0.2em solid #7799A5;
  border-style: solid;
  color: #7799A5;
  text-align: center;
  border-radius: 50%;

  line-height: 2.5em;
  box-sizing: content-box;
  top: 50%;
  left: 50%;
}
</style>
