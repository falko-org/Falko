<template>
  <div>
    <div v-if="isReleasesEmpty()">
      <no-content parent ="Release"></no-content>
    </div>
    <div class="row justify-content-center">
      <div class="col-3 align-self-start no-padding" id="releases">
          <add-release></add-release>
        <div v-bind:class="this.hasNoReleasesId()">
          <div v-for="release in releases">
            <release-card v-bind:release="[release.id, releases.indexOf(release)]"></release-card>
          </div>
        </div>
      </div>

      <div class="col-9" v-if="isLoaded">
        <div class="row justify-content-between" id="releaseHeader">
          <div class="col-5 no-padding" align="center">
            <div class="row">
              <h1 :id="`release${releaseIndex}Name`">{{this.releases[this.releaseIndex].name}}</h1>
            </div>
            <div class="row text-muted" :id="`release${releaseIndex}Description`">
              <p>{{this.releases[this.releaseIndex].description}}</p>
            </div>
          </div>
          <div class="col-5 no-padding">
            <div class="row">
              <h5 id="releasePeriod">
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
            <div v-if="this.sprints.length == 0">
              <no-content parent="Sprint"></no-content>
            </div>

            <add-sprint v-bind:release="[
                this.releases[this.releaseIndex].id,
                dateConvert(this.releases[this.releaseIndex].initial_date),
                dateConvert(this.releases[this.releaseIndex].final_date)
            ]">
            </add-sprint>
          </div>
        </div>
        <div>
          <div v-if="this.sprints.length != 0" class="row align-content-center">
            <div class="col-12">
              <div class="scroll-style-sprints-cards">
                <div v-for="sprint in sprints">
                  <sprint-card v-bind:sprint="sprint"></sprint-card>
                </div>
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
      isLoaded: false,
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
      projectId: state => state.clientStatus.projectId,
      releaseId: state => state.clientStatus.releaseId,
      releaseIndex: state => state.clientStatus.releaseIndex,
    }),
  },

  mixins: [dateConvert],

  methods: {
    setReleaseIndex(releaseIndex) {
      this.$store.dispatch('setReleaseIndex', releaseIndex);
    },

    setReleaseId() {
      const releaseId = (this.releases[this.releaseIndex].id).toString(10);

      this.$store.dispatch('setRelease', releaseId);
    },

    setAmountOfReleases() {
      const releaseAmount = this.releases.length;

      this.$store.dispatch('setReleaseAmount', releaseAmount);
    },

    setReleaseDates() {
      this.$store.dispatch('setReleaseInitialDate', this.releases[this.releaseIndex].initial_date);
      this.$store.dispatch('setReleaseFinalDate', this.releases[this.releaseIndex].final_date);
    },

    getReleases() {
      const headers = { Authorization: this.token };

      HTTP.get(`projects/${this.projectId}/releases`, { headers })
        .then((response) => {
          this.isLoaded = true;
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

    hasNoReleasesId() {
      if (this.isReleasesEmpty()) {
        return 'scroll-style-releases-cards';
      }

      return 'scroll-style-releases-cards releasesBorder';
    },
  },

  created() {
    this.getReleases();
    this.getSprints();

    EventBus.$on('added-release', () => this.getReleases());

    EventBus.$on('selected-release', (releaseIndex) => {
      this.setReleaseIndex(releaseIndex);
      this.setReleaseId();
      this.setReleaseDates();
      this.getSprints();
    });

    EventBus.$on('edited-release', () => this.getReleases());

    EventBus.$on('deleted-release', (newReleaseIndex) => {
      this.getReleases();
      if (newReleaseIndex >= 0) {
        this.setReleaseIndex(newReleaseIndex);
      } else {
        location.reload();
      }
    });

    EventBus.$on('added-sprint', () => this.getSprints());

    EventBus.$on('selected-sprint', (sprintId) => {
      this.$router.push({ name: 'Sprint', params: { id: sprintId } });
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
  direction: ltr;
}

#releaseCard {
  width: 30em;
}

#releaseHeader {
  margin-top: 1em;
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

.releasesBorder {
  border-right:1px solid #c3c3c3;
}

.scroll-style-releases-cards::-webkit-scrollbar-thumb {
  background-color: #ababab;
}

.scroll-style-releases-cards::-webkit-scrollbar-track {
  background-color: #dfdfdf;
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
</style>
