<template>
  <nav class="navbar sticky-top navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img src="logo.png" width="50"/>
        <img src="../assets/falko-text.png" height="50"/>
      </a>
      <div>
      <router-link to="/user">
        <button class="falko-button btn btn-primary" v-if="this.$route.path != '/'">User Profile</button>
      </router-link>
      <router-link to="/projects">
        <button class="falko-button btn btn-primary" v-if="this.$route.path != '/'">Create Project</button>
      </router-link>
        <button v-on:click="logout()" class="btn btn-primary falko-button" v-if="this.$route.path != '/'">Log Out</button>
      </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout(){
        localStorage.setItem('token', JSON.stringify(null));
        this.$router.push('/');
    }
  }
}
</script>

<style scoped>
</style>
