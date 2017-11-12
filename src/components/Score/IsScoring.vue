<template>
  <div v-on:edited-score="getScoreInformation()">
    <div id="isScoring">
      <div class="row">
        <div class="col">
          <p>This project uses Story Points?</p>
          <div class="row">
            <div class="col text-center">
              <toggle-button class="pointer-cursor" v-on:change="toggleButtonChanged($event)"
              :value="this.isScoring"
              :sync="true"
              color="#AEC3B0"
              :labels="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['is_scoring'],

  data() {
    return {
      isScoring: '',
    };
  },

  methods: {
    toggleButtonChanged(event) {
      if (event.value === true) {
        this.isScoring = true;
      } else {
        this.isScoring = false;
      }

      this.$emit('edited-score', this.isScoring);
    },

    getScoreInformation() {
      this.isScoring = this.is_scoring;
    },
  },
};
</script>

<style scoped>
  .pointer-cursor {
    cursor: pointer;
  }
</style>
