<template lang="html">
  <div>
    <vue-chart type="bar" :width="10" :height="4" :data="datacollection"></vue-chart>
    <!-- <vue-chart type="line" :data="datacollection"></vue-chart> -->
  </div>
</template>

<script>
import { Bar } from 'vue-chart-js'
import { Line } from 'vue-chart-js'
import { HTTP } from '../../http-common';
import { mapState } from 'vuex';

export default {
  extends: Bar,
  extends: Line,
  data () {
    return {
      storyData: {},
      datacollection: {
        display: false,
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Date two',
            borderColor: "blue",
            lineTension: 0,
            fill: false,
            data: [30, 13, 13, 19, 18, 20],
            type: 'line',
          },
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            borderColor: "black",
            borderWidth: 2,
            data: [30, 30, 24, 16, 32, 20]
          },
          {
            label: 'Data One',
            backgroundColor: 'pink',
            borderColor: "black",
            borderWidth: 2,
            data: [18, 15, 15, 16, 20, 14]
          },
        ],
      }
    }
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },
  methods: {
    getVelocityData() {
      const headers = { Authorization: this.token };

      HTTP.get(`sprints/${this.$route.params.id}/velocity`, { headers })
        .then((response) => {
          console.log(response)
          this.storyData = response.data
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
