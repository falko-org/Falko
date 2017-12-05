<template lang="html">
  <div>
    <vue-chart type="line" v-bind:width="15" v-bind:height="4" v-bind:options="datacollection.options" v-bind:data="datacollection"></vue-chart>
  </div>
</template>

<script>
import { Line } from 'vue-chart-js'
import { HTTP } from '../../http-common';
import { mapState } from 'vuex';
import Sprint from './Sprint.vue';

export default {
  extends: Line,
  data () {
    return {
      datacollection: {
        options: {
          scales: {
            yAxes: [
              {
                display: true,
                ticks: {
                  beginAtZero: true,
                  min: 0,
                  suggestedMin: 0
                }
              }
            ],
            xAxes: [
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
            label: 'Burndown',
            borderColor: "red",
            lineTension: 0,
            fill: false,
            type: 'line',
            data: []
          },
          {
            label: 'Ideal Burndown',
            borderColor: "rgba(0, 0, 0, 1)",
            lineTension: 0,
            fill: false,
            type: 'line',
            data: [13, 0]
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
      this.datacollection.labels = response.data.x;
      console.log(this.datacollection.datasets[0].data);
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
    }
  },
  mounted() {
     this.getBurndownData()
  },
};
</script>

<style lang="css">
</style>
