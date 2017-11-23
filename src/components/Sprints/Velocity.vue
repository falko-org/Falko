<template lang="html">
  <div>
    <vue-chart type="bar" v-bind:width="15" v-bind:height="4" v-bind:options="datacollection.options" v-bind:data="datacollection"></vue-chart>
  </div>
</template>

<script>
import { Bar } from 'vue-chart-js'
import { Line } from 'vue-chart-js'
import { HTTP } from '../../http-common';
import { mapState } from 'vuex';
import Sprint from './Sprint.vue';

export default {
  extends: Bar,
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
            yAxes: [
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
            label: 'Velocity',
            borderColor: "rgba(0, 0, 0, 1)",
            lineTension: 0,
            fill: false,
            type: 'line',
            data: []
          },
          {
            label: 'Total Points',
            backgroundColor: "rgba(100, 150, 150, 10)",
            borderColor: "black",
            borderWidth: 2,
            data: []
          },
          {
            label: 'Completed Points',
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
      this.datacollection.labels = response.data.names;
      this.datacollection.datasets[0].data = response.data.velocities;
      this.datacollection.datasets[1].data = response.data.total_points;
      this.datacollection.datasets[2].data = response.data.completed_points;
    },
    getVelocityData() {
      const headers = { Authorization: this.token };

      HTTP.get(`sprints/${this.$route.params.id}/velocity`, { headers })
        .then((response) => {
          this.fillChart(response);
        })
        .catch((e) => {
          this.errors.push(e);
      });
    }
  },
  mounted() {
     this.getVelocityData()
  },
};
</script>

<style lang="css">
</style>
