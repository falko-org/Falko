<template>
  <div class="">
    <div class="row justify-content-around" v-for="i in Math.ceil(releases.length / 2)">
      <div v-for="release in releases.slice((i-1) * 2,i*2)" class="col-5">
        <div align="center">
          <div class="card" id="releaseCard">
            <router-link v-bind:to="'/inproject/'+release.project_id+'/releases/'+release.id">
              <div class="card-header" id="releaseHeader">
                <div class="row align-itens-around" id="releaseTitle">
                  <div class="col">
                    <h4 class="no-margin float-left">{{release.name}}</h4>
                  </div>
                  <div class="col">
                    <!-- <img src="../../assets/dateicon.png" width="25em" alt="Date icon"/> -->
                    <h6 class="no-margin float-right">
                      {{release.initial_date}}
                      -
                      {{release.final_date}}
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
    <add-release></add-release>
  </div>
</template>

<script>
import { HTTP } from '../../http-common.js';
import AddRelease from '@/components/ReleasesComponents/AddRelease';

export default {
  components: {
    'add-release': AddRelease
  },

  data () {
    return {
      releases: []

    }
  },

  methods: {
    getReleases() {
      var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var header = { 'Authorization': tokenSimple2 };

      HTTP.get(`projects/${this.$route.params.id}/releases`, { headers: header })
        .then((response) => {
          this.releases = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    }
  },

  mounted() {
    this.getReleases();
  }
}
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

.no-margin {
  margin: 0;
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

div a:hover {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
}
</style>
