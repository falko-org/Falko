<template>
  <div>
    <div v-if="isReleasesEmpty()">
      <no-content parent ="Release"></no-content>
    </div>
    <div class="row">
      <div class="col">
        <add-release v-on:added="getReleases()"></add-release>
      </div>
    </div>

    <div class="row justify-content-around" v-for="i in Math.ceil(releases.length / 2)">
      <div v-for="release in releases.slice((i-1) * 2,i*2)" class="col-5">
        <div align="center">
          <div class="card" id="releaseCard">
            <router-link v-bind:to="'/releases/'+release.id">
              <div class="card-header" id="releaseHeader">
                <div class="row align-itens-around" id="releaseTitle">
                  <div class="col">
                    <h4 class="no-margin float-left">{{release.name}}</h4>
                  </div>
                  <div class="col">
                    <!-- <img src="../../assets/dateicon.png" width="25em" alt="Date icon"/> -->
                    <h6 class="no-margin float-right">
                      {{dateConvert(release.initial_date)}}
                      -
                      {{dateConvert(release.final_date)}}
                    </h6>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="row align-itens-arround">
                  <div class="col-5 align-content-center">
                    <p class="card-text">
                      <div class="number-circle">
                        <div id="amountSprintsFont">
                          {{release.amount_of_sprints}}
                        </div>
                      </div>
                      <h5><br>Sprints</h5>
                    </p>
                  </div>
                  <div class="col">
                    <p class="card-text text-justify">
                      {{release.description}}
                    </p>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { HTTP } from '../../http-common';
import AddRelease from './AddRelease.vue';
import NoContent from '../NoContent.vue';
import dateConvert from '../../mixins/dateConvert';

export default {

  components: {
    'add-release': AddRelease,
    'no-content': NoContent,
  },

  data() {
    return {
      releases: [],
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },

  mixins: [dateConvert],

  methods: {
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
    isReleasesEmpty() {
      return this.releases.length === 0;
    },

  },

  mounted() {
    this.getReleases();
  },
};
</script>

<style scoped>
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

div a {
  text-decoration: none;
  color: inherit;
}

#releaseCard:hover {
  /* box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15); */
  border-color: #7799A5;
}
</style>
