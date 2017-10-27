<template>
  <div>
    <li class="row no-margin">
      <div class="col-11 text-justify">
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
h3 {
  margin-bottom: 4em;
}

li {
  max-width: 40em;
  padding: 0.8em 0em;
  border-bottom: 1px solid #E0E8EB;
  color: #677;
}

li div {
  word-wrap: break-word;
}

button {
  background-color: transparent;
  border: none;
  font-weight: bold;
  cursor: pointer;
  color: #5E8181;
  outline: none;
}

button:hover {
  color: #2E5151;
}
</style>
