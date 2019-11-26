<template>
  <div>
    <div class="row release-card align-content-center buttons pointer-cursor" v-bind:id="release[1]" v-on:click="select($event)">
      <div class="col-5" align="center">
        <div class="number-circle-selected">
          <p>R{{this.amountOfReleases - this.release[1]}}</p>
        </div>
      </div>
      <div class="col-7">
        <div align="center">
          <edit-release v-bind:release="release"></edit-release>
          <delete-release v-bind:parentRelease="release[0]"></delete-release>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { EventBus } from '../../event-bus';
import EditRelease from './EditRelease.vue';
import DeleteRelease from './DeleteRelease.vue';

export default {
  components: {
    'edit-release': EditRelease,
    'delete-release': DeleteRelease,
  },

  props: ['release'],

  computed: {
    ...mapState({
      amountOfReleases: state => state.clientStatus.amountOfReleases,
    }),
  },

  methods: {
    select: (event) => {
      const releaseIndex = event.currentTarget.id;
      EventBus.$emit('selected-release', releaseIndex);
    },
  },
};
</script>

<style scoped>
.buttons {
  padding: 2em 0;
}

.release-card {
  background-color: #F4F7F7;
  border-bottom: 2px solid #637074;
}

.release-card-selected {
  background-color: #637074;
  border-bottom: 2px solid #637074;
}

</style>
