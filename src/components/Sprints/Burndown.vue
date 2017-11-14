<template>
  <svg width="500" height="270">
    <g class="x axis" id="xAxis" transform="translate(50, 234)"></g>
    <g class="y axis" id="yAxis" transform="translate(50, 20)"></g>
    <g transform="translate(50, 20)">
      <path v-bind:d="line" />
    </g>
  </svg>
</template>
<script>
import * as d3 from 'd3';
export default {
  name: 'vue-line-chart',
  data() {
    return {
    lineData: [{
    'x': 1,
    'y': 5
  }, {
    'x': 20,
    'y': 20
  }, {
    'x': 40,
    'y': 10
  }, {
    'x': 60,
    'y': 40
  }, {
    'x': 80,
    'y': 5
  }, {
    'x': 100,
    'y': 60
  }],
      line: '',
    };
  },
  mounted() {
    this.drawAxis();
    this.drawLine();
  },
  methods: {
    getXRange() {
      var xRange = d3.scaleLinear().range([0, 430])
        .domain([d3.min(this.lineData, (d) => d.x),
                 d3.max(this.lineData, (d) => d.x)]);
      return xRange;
    },
    getYRange() {
      var yRange =  d3.scaleLinear().range([210, 0])
        .domain([d3.min(this.lineData, (d) => d.y),
                 d3.max(this.lineData, (d) => d.y)])
      return yRange;
    },

    getXAxis() {
      console.log();
      var xAxis = d3.axisBottom(this.getXRange())
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
</style>
