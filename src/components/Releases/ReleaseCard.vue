<template>
  <div>
    <div class="row release-card align-content-center buttons pointer-cursor" v-bind:id="release.id" v-on:click="select($event)">
      <div class="col-5" align="center">
        <div class="number-circle">
          <p>{{release[0].name}}</p>
        </div>
      </div>
      <div class="col-7">
        <div align="center">
          <edit-release v-bind:releaseId="release[0].id"></edit-release>
          <delete-release v-bind:releaseId="release[0].id"></delete-release>
        </div>
      </div>
    </div>

    <!-- <div class="row release-card-selected align-content-center" id="buttons">
      <div class="col-5" align="center">
        <div class="number-circle-selected">
          <p>R2</p>
        </div>
      </div>
      <div class="col-7">
        <div align="center">
          <edit-release ></edit-release>
          <delete-release></delete-release>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { EventBus } from '../../event-bus';
import EditRelease from './EditRelease.vue';
import DeleteRelease from './DeleteRelease.vue';

export default {
  components: {
    'edit-release': EditRelease,
    'delete-release': DeleteRelease,
  },

  props: ['release'],

  methods: {
    select: (event) => {
      const targetId = event.currentTarget.id;
      EventBus.$emit('selected-release', targetId);
    },
  },
};
</script>

<style scoped>
.buttons {
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
