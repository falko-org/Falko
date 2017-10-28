<template>
  <div>
    <li class="row no-margin">
      <div class="col-11 text-justify align-self-center">
        {{title}}
      </div>
      <div class="col-1 align-self-center">
        <button v-on:click="$emit('remove')" class="float-right" >
            <h4 class="no-margin">&times;</h4>
        </button>
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
