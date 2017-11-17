<template>
  <svg width="700" height="270">
    <g class="x axis" id="xAxis" transform="translate(50, 230)"></g>
    <g class="y axis" id="yAxis" transform="translate(50, 20)"></g>
    <g transform="translate(50, 20)">
      <path v-bind:d="realLine" />
      <path class="cor" v-bind:d="idealLine" />
    </g>
  </svg>
</template>
<script>
import * as d3 from 'd3';
import { HTTP } from '../../http-common';

export default {
  name: 'vue-line-chart',
  data() {
    return {
    realLineData: [],
    realLine: '',
    idealLineData: [],
    idealLine: ''
    };
  },
  mounted() {
    this.getBurndown();
  },
  methods: {
    getBurndown() {
      const token = localStorage.getItem('token');
      const tokenSimple = token.replace(/"/, '');
      const tokenSimple2 = tokenSimple.replace(/"/, '');
      const headers = { Authorization: tokenSimple2 };
      var parseTime = d3.timeParse("%Y-%m-%d")
      HTTP.get(`sprints/${this.$route.params.id}/burndown`, { headers })
        .then((response) => {
          this.realLineData = response.data;
          this.realLineData.forEach((d) => d.x = parseTime(d.x))
          this.getIdealLineData();
          this.drawAxis();
          this.drawLine();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getIdealLineData () {
      var xMin = d3.min(this.realLineData, (d) => d.x);
      var yMax = d3.max(this.realLineData, (d) => d.y);
      var xMax = d3.max(this.realLineData, (d) => d.x);
      var yMin = d3.min(this.realLineData, (d) => d.y);
      var minPoint = {x: xMin, y: yMax};
      var maxPoint = {x: xMax, y: yMin};
      var idealLineData = [minPoint, maxPoint];
      this.idealLineData = idealLineData;
    },
    getRealXRange() {
      var xRange = d3.scaleTime().range([0, 500])
        .domain([d3.min(this.realLineData, (d) => d.x),
                 d3.max(this.realLineData, (d) => d.x)]);
      return xRange;
    },
    getRealYRange() {
      var yRange =  d3.scaleLinear().range([210, 0])
        .domain([d3.min(this.realLineData, (d) => d.y),
                 d3.max(this.realLineData, (d) => d.y)])
      return yRange;
    },
    getIdealXRange() {
      var xRange = d3.scaleTime().range([0, 500])
        .domain([d3.min(this.idealLineData, (d) => d.x),
                 d3.max(this.idealLineData, (d) => d.x)]);
      return xRange;
    },
    getIdealYRange() {
      var yRange =  d3.scaleLinear().range([210, 0])
        .domain([d3.min(this.idealLineData, (d) => d.y),
                 d3.max(this.idealLineData, (d) => d.y)])
      return yRange;
    },
    getXAxis() {
      var xAxis = d3.axisBottom(this.getRealXRange()).tickValues(this.realLineData.map((d) => d.x)).tickFormat(d3.timeFormat("%d-%m"))
      return xAxis;
    },

    getYAxis() {
      var yAxis = d3.axisLeft(this.getRealYRange())
      return yAxis;
    },
    drawAxis() {
      d3.select("#xAxis").call(this.getXAxis())
      d3.select("#yAxis").call(this.getYAxis())
    },
    drawLine() {
      var xRange = this.getRealXRange();
      var yRange = this.getRealYRange();
      var path = d3.line()
      .x((d) => xRange(d.x))
      .y((d) => yRange(d.y));
      this.realLine = path(this.realLineData)

      var idealXRange = this.getIdealXRange();
      var idealYRange = this.getIdealYRange();
      var idealPath = d3.line()
      .x((d) => idealXRange(d.x))
      .y((d) => idealYRange(d.y));
      this.idealLine = idealPath(this.idealLineData)
    }
  },
};
</script>
<style scoped>
  svg {
    margin: 25px;
  }

  path {
    fill: none;
    stroke: #76BF8A;
    stroke-width: 3px;
  }
  .cor {
    fill: none;
    stroke: red;
    stroke-width: 3px;
  }

</style>
