<template>
  <div>
    <button type="button" class="btn btn-info btn-md falko-button" id="IssuesGraphic" data-toggle="modal" data-target="#issuesGraphicModal">
      Issues
    </button>
    <div class="modal fade" id ="issuesGraphicModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Set a interval</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="row modal-body">
            <div class="col">
              <div class="row">
                <div class="col">
                  <p><label > Initial Date </label></p>
                  <p><input type = "date" v-model="initialDate"></input><br></p>
                </div>
                <div class="col">
                  <p><label> Final Date </label></p>
                  <input type = "date" v-model="finalDate"></input><br>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info btn-md falko-button" v-on:click="getIssuesGraphicData" data-dismiss="modal">Save</button>
            <button type="button" class="btn btn-info btn-md falko-button-grey" data-dismiss="modal" >Close</button>
          </div>
        </div>
      </div>
    </div class="col-8" >
      <vue-chart type="bar" v-bind:width="15" v-bind:height="4" v-bind:options="datacollection.options" v-bind:data="datacollection"></vue-chart>
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chart-js'
import { HTTP } from '../../http-common';
import { mapState } from 'vuex';

export default {
  extends: Bar,
  data () {
    return {
      initialDate: '',
      finalDate: '',
      escuta: '',
      datacollection: {
        options: {
          scales: {
            yAxes: [
              {
                stacked: true,
                display: true,
              }
            ],
            xAxes: [
              {
                stacked: true,
                display: true,
              }
            ]
          },
        },
        display: false,
        labels: [],
        datasets: [
          {
            label: 'Closed Issues',
            backgroundColor: "rgba(100, 150, 150, 10)",
            borderColor: "black",
            borderWidth: 2,
            data: []
          },
          {
            label: 'Opened Issues',
            backgroundColor: "rgba(100, 150, 150, 0.3)",
            borderColor: "black",
            borderWidth: 2,
            data: []
          },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },
  methods: {
    fillChart(response) {
      this.datacollection.labels = response.data.datesFirstRange;
      this.datacollection.datasets[0].data = response.data.closed_issues;
      this.datacollection.datasets[1].data = response.data.open_issues;
    },
    getIssuesGraphicData() {
      const headers = { Authorization: this.token };
      HTTP.post(`projects/${this.$route.params.id}/issues/graphic`, {
          initial_date: this.initialDate,
          final_date: this.finalDate
      }, { headers })
      .then((response)=>{
        console.log(response)
        this.fillChart(response);
      })
      .catch(e=>{
        this.errors.push(e)
      });
    }
  }
}
</script>
<style>
</style>
