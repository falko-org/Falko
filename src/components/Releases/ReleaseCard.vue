<template>
  <div>
    <div class="row release-card align-content-center" id="buttons">
      <div class="col-6" align="center">
        <div class="number-circle">
          <p>R1</p>
        </div>
      </div>
      <div class="col-6">
        <div align="center">
          <edit-release ></edit-release>
          <delete-release></delete-release>
        </div>
      </div>
    </div>

    <div class="row release-card-selected align-content-center" id="buttons">
      <div class="col-6" align="center">
        <div class="number-circle-selected">
          <p>R2</p>
        </div>
      </div>
      <div class="col-6">
        <div align="center">
          <edit-release ></edit-release>
          <delete-release></delete-release>
        </div>
      </div>
    </div>

    <div class="row release-card align-content-center" id="buttons">
      <div class="col-6" align="center">
        <div class="number-circle">
          <p>R3</p>
        </div>
      </div>
      <div class="col-6">
        <div align="center">
          <edit-release ></edit-release>
          <delete-release></delete-release>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditRelease from './EditRelease.vue';
import DeleteRelease from './DeleteRelease.vue';

export default {
  components: {
    'edit-release': EditRelease,
    'delete-release': DeleteRelease,
  },

};
</script>

<style scoped>
#buttons {
  padding: 2em 0;
}

.release-card {
  background-color: #D0D4DA;
  border-bottom: 2px solid #637074;
}

.release-card-selected {
  background-color: #637074;
  border-bottom: 2px solid #637074;
}

.falko-button-grey {
  background-color: rgba(134, 142, 150, 0.5);
}

.number-circle {
  border: 0.2em solid rgba(98, 104, 110, 0.8);
  color: rgba(98, 104, 110, 0.8);
}

.number-circle-selected {
  border: 0.2em solid #CCC;
  color: #CCC;
}

</style>
