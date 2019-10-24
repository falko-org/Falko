<template lang="html">
  <div>
    <vue-chart type="line" v-bind:width="15" v-bind:height="4" v-bind:options="datacollection.options" v-bind:data="datacollection"></vue-chart>
  </div>
</template>

<script>
import { Line } from 'vue-chart-js'
import { HTTP } from '../../http-common';
import { mapState } from 'vuex';

export default {
  extends: Line,
  data () {
    return {
      datacollection: {
        options: {
          legend: {
            labels: {
              boxWidth: 2,
              fontSize: 18,
            },
          },
          scales: {
            yAxis: [
              {
                display: true,
                ticks: {
                  beginAtZero: true,
                  min: 0,
                  suggestedMin: 0
                }
              }
            ],
            xAxis: [
              {
                display: true,
                ticks: {
                  beginAtZero: true,
                  min: 0,
                  suggestedMin: 0
                }
              }
            ]
          },
        },
        display: false,
        labels: [],
        datasets: [
          {
            label: 'Actual Burndown',
            borderColor: "#688E9B",
            lineTension: 0,
            fill: false,
            type: 'line',
            data: []
          },
          {
            label: 'Ideal Burndown',
            borderColor: "#AEC3B0",
            lineTension: 0,
            fill: false,
            type: 'line',
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
      this.datacollection.datasets[0].data = response.data.y;
      this.datacollection.datasets[1].data = response.data.ideal_line;
      this.datacollection.labels = response.data.x;
    },
    getBurndownData() {
      const headers = { Authorization: this.token };

      HTTP.get(`sprints/${this.$route.params.id}/burndown`, { headers })
        .then((response) => {
          this.fillChart(response);
        })
        .catch((e) => {
          this.errors.push(e);
      });
    },
  },
  mounted() {
     this.getBurndownData()
  },
};
</script>

<style lang="css">
</style>
