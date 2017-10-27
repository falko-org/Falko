<template>
  <div>
    <div>
      <input 
        v-model="newPositivePointText"
        placeholder="Add an Went Well..." 
        v-on:keyup.enter="addNewPositivePoint">
    </div>
    <ul>
      <li
        is="went-well-component"
        v-for="(positivePoint, index) in positivePoints"
        v-bind:key="positivePoint.id" v-bind:title="positivePoint.title"
        v-on:remove="positivePoints.splice(index, 1)"
      >
      </li>
    </ul>
  </div>
</template>

<script>
import WentWellItem from './WentWellItem';

export default {
  components: {
    'went-well-component': WentWellItem
  },

  data () {
    return {
      newPositivePointText: '',
      positivePoints: [],
      nextPositivePointId: 0
    }
  },

  methods: {
    addNewPositivePoint() {
      this.positivePoints.push({
        id: this.nextPositivePointId++,
        title: this.newPositivePointText
      })
      this.newPositivePointText = ''
      console.log(this.positivePoints)
    }
  }
}
</script>

<style scoped>
input {
  width: 40em;
  padding: 1em;
  background-color: #7799B9;
  border: none;
  color: white;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}


ul {
  padding: 0;
}
</style>
