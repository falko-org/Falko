<template>
  <div>
    <li class="row no-margin">
      <div class="col-11">
        {{title}}
      </div>
      <div class="col-1 align-self-center">
        <button v-on:click="$emit('remove')" class="float-right" >X</button>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped>
li {
  max-width: 40em;
  padding: 0.8em 0em;
  border-bottom: 1px solid #E0E8EB;
}

li div {
  word-wrap: break-word;
}

button {
  background-color: transparent;
  border: none;
  font-weight: bold;
  cursor: pointer;
  color: #7799B9;
  outline: none;
}

button:hover {
  color: #0C2C39;
}
</style>
