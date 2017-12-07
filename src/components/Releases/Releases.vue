<template>
  <div>
    <div v-if="isReleasesEmpty()">
      <no-content parent ="Release"></no-content>
    </div>
    <div class="row">
      <div class="col-3 align-self-start no-padding" id="releases">
          <add-release></add-release>
        <div class="ScrollStyle">
          <div v-for="release in releases">
            <release-card v-bind:release="[release.id, releases.indexOf(release)]"></release-card>
          </div>
        </div>
      </div>

      <div class="col-8">
        <div class="row">
          <div class="col">
            <div class="row">
              <h1>{{this.releases[this.releaseIndex].name}}</h1>
            </div>
            <div class="row text-muted">
              <p>{{this.releases[this.releaseIndex].description}}</p>
            </div>
          </div>
          <div class="col">
            <div class="row">
              <h5>
                {{dateConvert(this.releases[this.releaseIndex].initial_date)}}
                |
                {{dateConvert(this.releases[this.releaseIndex].final_date)}}
              </h5>
            </div>
            <div class="row text-muted">
              <div class="col">
                <p>{{this.releases[this.releaseIndex].amount_of_sprints}} Sprints</p>
              </div>
            </div>
          </div>
        </div>

        <div class="row align-content-center">
          <div class="col" align="center">
            <add-sprint v-bind:release="[
                this.releases[this.releaseIndex].id,
                dateConvert(this.releases[this.releaseIndex].initial_date),
                dateConvert(this.releases[this.releaseIndex].final_date)
            ]">
            </add-sprint>
          </div>
        </div>
        <div>
          <div v-if="this.sprints.length == 0">
            <no-content parent = "Sprint"></no-content>
          </div>
          <div v-else class="row">
            <div class="col">
              <div v-for="sprint in sprints">
                <sprint-card v-bind:sprint="sprint"></sprint-card>
              </div>
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
    setReleaseId() {
      this.$store.dispatch('setRelease', this.releases[this.releaseIndex].id);
    },

    setReleaseIndex(releaseIndex) {
      this.$store.dispatch('setReleaseIndex', releaseIndex);
    },

    setAmountOfReleases() {
      const releaseAmount = this.releases.length;

      this.$store.dispatch('setReleaseAmount', releaseAmount);
    },

    getReleases() {
      const headers = { Authorization: this.token };

      HTTP.get(`projects/${this.$route.params.id}/releases`, { headers })
        .then((response) => {
          this.releases = response.data;

          this.setAmountOfReleases();
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
    this.getReleases();
    this.getSprints();

    EventBus.$on('added-release', () => this.getReleases());

    EventBus.$on('selected-release', (ReleaseId) => {
      this.setReleaseIndex(ReleaseId);
      this.setReleaseId();
      this.getSprints();
    });

    EventBus.$on('edited-release', () => this.getReleases());

    EventBus.$on('deleted-release', () => this.getReleases());

    EventBus.$on('added-sprint', () => this.getSprints());

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

h1 {
  color: #688E9B;
  font-weight: bold;
}
h5 {
  color: rgba(1, 22, 30, 0.75);
  font-weight: lighter;
}


#releases {
  background-color: #d0d4da;
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

.ScrollStyle {
  max-height: calc(100vh - 8em);
  overflow-y: auto;
}
</style>
