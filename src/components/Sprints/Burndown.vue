<template>
  <svg width="700" height="270">
    <g class="x axis" id="xAxis" transform="translate(50, 230)"></g>
    <g class="y axis" id="yAxis" transform="translate(50, 20)"></g>
    <g transform="translate(50, 20)">
      <path v-bind:d="line" />
      <path class="cor" v-bind:d="line1" />
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
    lineData: [],
    line: '',
    line1Data: [],
    line1: ''
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
          this.lineData = response.data;
          this.lineData.forEach((d) => d.x = parseTime(d.x))
          this.getIdealLine();
          this.drawAxis();
          this.drawLine();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getXRange() {
      var xRange = d3.scaleTime().range([0, 500])
        .domain([d3.min(this.lineData, (d) => d.x),
                 d3.max(this.lineData, (d) => d.x)]);
      return xRange;
    },
    getIdealLine () {
      var xMin = d3.min(this.lineData, (d) => d.x);
      var yMax = d3.max(this.lineData, (d) => d.y);
      var xMax = d3.max(this.lineData, (d) => d.x);
      var yMin = d3.min(this.lineData, (d) => d.y);
      var minPoint = {x: xMin, y: yMax};
      var maxPoint = {x: xMax, y: yMin};
      var idealLine = [minPoint, maxPoint];
      this.line1Data = idealLine;
    },
    getYRange() {
      var yRange =  d3.scaleLinear().range([210, 0])
        .domain([d3.min(this.lineData, (d) => d.y),
                 d3.max(this.lineData, (d) => d.y)])
      return yRange;
    },
    getX1Range() {
      var xRange = d3.scaleTime().range([0, 500])
        .domain([d3.min(this.line1Data, (d) => d.x),
                 d3.max(this.line1Data, (d) => d.x)]);
      return xRange;
    },
    getY1Range() {
      var yRange =  d3.scaleLinear().range([210, 0])
        .domain([d3.min(this.line1Data, (d) => d.y),
                 d3.max(this.line1Data, (d) => d.y)])
      return yRange;
    },
    getXAxis() {
      var xAxis = d3.axisBottom(this.getXRange()).tickValues(this.lineData.map((d) => d.x)).tickFormat(d3.timeFormat("%d-%m"))
      return xAxis;
    },

    getYAxis() {
      var yAxis = d3.axisLeft(this.getYRange())
      return yAxis;
    },
    drawAxis() {
      d3.select("#xAxis").call(this.getXAxis())
      d3.select("#yAxis").call(this.getYAxis())
    },
    drawLine() {
      var xRange = this.getXRange();
      var yRange = this.getYRange();
      var path = d3.line()
      .x((d) => xRange(d.x))
      .y((d) => yRange(d.y));
      this.line = path(this.lineData)


        var x1Range = this.getX1Range();
        var y1Range = this.getY1Range();
        var path1 = d3.line()
        .x((d) => x1Range(d.x))
        .y((d) => y1Range(d.y));
      this.line1 = path1(this.line1Data)
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
