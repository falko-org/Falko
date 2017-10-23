<template>
  <nav class="navbar sticky-top navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img src="logo.png" width="50"/>
        <img src="../assets/falko-text.png" height="50"/>
      </a>
      <router-link to="/user">
        <button class="falko-button btn btn-primary">User Profile</button>
      </router-link>
  </nav>
</template>

<script>
export default {
  methods: {
  }
}
</script>

<style scoped>
</style>
