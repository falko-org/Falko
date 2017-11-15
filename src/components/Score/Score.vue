<template>
  <div>
    <div class="float-right ">Points</div>
    <div class="float-right number-circle">
      <div id="pointsFont"> {{this.points}} </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['points']
  }
</script>

<style scoped>
  .number-circle {
    font: 32px Arial, sans-serif;

    width: 0.5em;
    height: 0.5em;

    background: #fff;
    border: 0.1em solid;
    margin-right: 0.3em;
    border-style: solid;
    color: #7799A5;
    border-radius: 50%;

    line-height: 0.5em;
    box-sizing: content-box;
    top: 50%;
    left: 50%;
  }

  #pointsFont {
    font-weight:bolder;
    font-size:0.4em;
  }
</style>
