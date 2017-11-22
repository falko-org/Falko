<template lang="html">
  <div>
    <vue-chart type="bar" :width="15" :height="4" :data="datacollection"></vue-chart>
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
      datacollection: {
        display: false,
        labels: [],
        datasets: [  
          {label:'Vazio'},    
          {
            label: 'Velocity',
            borderColor: "blue",
            lineTension: 0,
            fill: false,            
            type: 'line',
            data: []
          }, 
          {
            label: 'Total Points',
            backgroundColor: 'pink',
            borderColor: "black",
            borderWidth: 2,            
            data: []
          },
          {
            label: 'Completed Points',
            backgroundColor: '#f87979',
            borderColor: "black",
            borderWidth: 2,
            data: []
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
          this.datacollection.labels = response.data.names 
          this.datacollection.datasets[1].data = response.data.velocities
          this.datacollection.datasets[2].data = response.data.total_points
          this.datacollection.datasets[3].data = response.data.completed_points

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
