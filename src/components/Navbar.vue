<template>
  <nav class="navbar sticky-top navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img src="logo.png" width="50"/>
        <img src="../assets/falko-text.png" height="50"/>
      </a>

      <button v-on:click="link()">CLICK PARA LINKAR</button>

  </nav>
</template>

<script>
export default {
  methods: {
    link() {
      window.location.replace("https://github.com/login/oauth/authorize?scope=repo&client_id=cbd5f91719282354f09b");
    }
  }
}
</script>

<style scoped>
</style>
