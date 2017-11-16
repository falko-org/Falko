<template>
  <div class="m">
    <li class="row no-margin">
      <div class="col-1 align-self-center">
        <button class="float-right" >
          <h4 class="no-margin">&times;</h4>
        </button>
      </div>
      <div class="col-11 text-justify align-self-center">
      </div>
    </li>
  </div>
</template>

<script>
export default {
  props: ['contributor'],
}
</script>

<style>
li {
  padding: 0;
}
.m {
  border: 1px solid black;
}
</style>
