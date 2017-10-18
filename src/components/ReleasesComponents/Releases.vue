<template>
  <div class="">
    <div class="row justify-content-around" v-for="i in Math.ceil(releases.length / 2)">
      <div v-for="release in releases.slice((i-1) * 2,i*2)" class="col-5">
        <div align="center">

          <div class="card" id="releaseCard">
            <div class="card-header" id="releaseHeader">
              <div class="row align-itens-around" id="releaseTitle">
                <div class="col">
                  <h4 class="no-margin float-left">{{release.name}}</h4>
                </div>
                <div class="col">
                  <!-- <img src="../../assets/dateicon.png" width="25em" alt="Date icon"/> -->
                  <h5 class="no-margin float-right">
                    {{release.initial_date}}
                    -
                    {{release.final_date}}
                  </h5>
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
          </div>
          <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},

  data () {
    return {
      releases:
              [
          {
              "id": 3,
              "name": "R1",
              "description": "RUP Release",
              "amount_of_sprints": 3,
              "created_at": "2017-10-12T18:30:27.223Z",
              "updated_at": "2017-10-12T18:30:27.223Z",
              "initial_date": "2016-08-01",
              "final_date": "2016-10-01",
              "project_id": 5
          },
          {
              "id": 4,
              "name": "R2",
              "description": "Agile Release",
              "amount_of_sprints": 3,
              "created_at": "2017-10-12T18:30:27.266Z",
              "updated_at": "2017-10-12T18:30:27.266Z",
              "initial_date": "2016-10-01",
              "final_date": "2016-12-01",
              "project_id": 5
          },
          {
              "id": 5,
              "name": "Release 02",
              "description": "Second Release",
              "amount_of_sprints": 3,
              "created_at": "2017-10-12T19:31:51.647Z",
              "updated_at": "2017-10-12T19:31:51.647Z",
              "initial_date": "2018-01-01",
              "final_date": "2019-01-01",
              "project_id": 6
          },
          {
              "id": 7,
              "name": "Release 02",
              "description": "Agile Release",
              "amount_of_sprints": 3,
              "created_at": "2017-10-12T19:41:05.936Z",
              "updated_at": "2017-10-12T19:41:16.198Z",
              "initial_date": "2018-01-01",
              "final_date": "2019-01-01",
              "project_id": 6
          },
          {
              "id": 8,
              "name": "R1",
              "description": "RUP Release",
              "amount_of_sprints": 10,
              "created_at": "2017-10-13T14:53:28.882Z",
              "updated_at": "2017-10-13T14:53:28.882Z",
              "initial_date": "2016-08-01",
              "final_date": "2016-10-01",
              "project_id": 5
          },
          {
              "id": 9,
              "name": "R2",
              "description": "Agile Release",
              "amount_of_sprints": 4,
              "created_at": "2017-10-13T14:53:28.905Z",
              "updated_at": "2017-10-13T14:53:28.905Z",
              "initial_date": "2016-10-01",
              "final_date": "2016-12-01",
              "project_id": 5
          }
      ]

    }
  },

  methods: {
    getReleases() {
      HTTP.get(`projects/${this.$route.params.id}/releases`)
        .then((response) => {
          this.releases = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    }
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
</style>
