<template>
  <div class="card" id="releaseCard">
    <div class="card-header" id="releaseHeader">
      <div class="row align-itens-around" id="releaseTitle">
        <div class="col">
          <h4 class="no-margin">{{releaseName}}</h4>
        </div>
        <div class="col">
          <img src="../../assets/dateicon.png" width="25em" alt="Date icon"/>
          <h5 class="no-margin float-right">
            {{releaseInitalDate}}
            {{releaseFinalDate}}
          </h5>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row align-itens-arround">
        <div class="col-5">
          <p class="card-text">
            <div class="number-circle"><div id="amountSprintsFont">{{releaseAmountOfSprints}}</div></div>
            <h5 style="text-align:center"><br>Sprints</h5>
          </p>
        </div>
        <div class="col">
          <p class="card-text text-justify">
            {{releaseDescription}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      releaseName: "Release 1",
      releaseDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et consequatur porro repellendus vero mollitia corrupti facilis in",
      releaseInitalDate: "10/10/10",
      releaseFinalDate: "13/10/12",
      releaseAmountOfSprints: "8"
    }
  }
}
</script>

<style scoped>
#releaseCard {
  width: 30em;
}

#releaseHeader {
  background-color: #7799A5;
}

#releaseTitle {
  margin: 0;
  color: white;
}

#numberSprints {
  margin-left: -10;
}

#amountSprintsFont {
  font-weight:bolder;
  font-size:1.4em;
}

.no-margin {
  margin: 0;
}

.number-circle {
  font: 32px Arial, sans-serif;

  width: 2.5em;
  height: 2.5em;
  box-sizing: initial;

  background: #fff;
  border: 0.2em solid #7799A5;
  border-style: solid;
  color: #7799A5;
  text-align: center;
  border-radius: 50%;

  line-height: 2.5em;
  box-sizing: content-box;
  top: 50%;
  left: 50%;
  margin-left: 40px;
  margin-top: -20px;
}


</style>
