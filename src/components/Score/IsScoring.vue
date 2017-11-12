<template>
  <div>
    <div id="isScoring">
      <div class="row">
        <div class="col">
          Is this project scoring?
        </div>
        <div class="col">
          <toggle-button class="pointer-cursor" v-on:change="toggleButtonChanged($event)"
          :value="false"
          color="#AEC3B0"
          :labels="true" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          Setted as:
        </div>
        <div class="col">
          {{is_scoring}}
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

  mounted() {
    this.getScoreInformation();
  },
};
</script>

<style scoped>
  .pointer-cursor {
    cursor: pointer;
  }
</style>
