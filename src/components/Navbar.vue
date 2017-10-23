<template>
  <nav class="navbar sticky-top navbar-light bg-light row justify-content-around">
    <!-- <div class="row justify-content-around"> -->
      <div class="col">
        <a class="navbar-brand" href="#">
          <img src="logo.png" width="50"/>
          <img src="../assets/falko-text.png" height="50"/>
        </a>
      </div>
      <div class="col-4" align="center">
        <div class="align-self-center">
          <searchbar></searchbar>
        </div>
      </div>
      <div class="col" align="end" >
        <router-link to="/user">
          <button class="falko-button btn btn-primary small-float-left">User Profile</button>
        </router-link>
          <button v-on:click="logout()" class="btn btn-primary falko-button falko-button-danger" v-if="this.$route.path != '/'">Log Out</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import SearchBar from '@/components/SearchBar'
export default {
  
  components: {
    'searchbar': SearchBar
  },

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
