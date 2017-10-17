<template>
  <div class="card" id="releaseCard">
    <div class="card-header" id="releaseHeader">  
      <div class="row align-itens-around" id="releaseTitle">
        <div class="col">
          <h4 class="no-margin">{{releaseName}}</h4>
        </div>
        <div class="col">
          <h5 class="no-margin float-right">
          {{releaseInitalDate}}
          {{releaseFinalDate}}
          </h5>
        </div>
      </div>
    </div>
    <div class="card-body">
      <p class="card-text">
        {{releaseDescription}}
      </p>
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
      releaseAmountOfSprints: "7"
    }
  }
}
</script>

<style scoped>
#releaseCard {
  width: 30em;
}

#releaseHeader {
  background-color: white;
}

#releaseTitle {
  margin: 0;
}

.no-margin {
  margin: 0;
}

</style>
