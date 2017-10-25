<template>
  <nav class="navbar sticky-top navbar-light bg-light row justify-content-around no-margin">
    <!-- <div class="row justify-content-around"> -->
      <div class="col">
        <a class="navbar-brand falko-brand" v-on:click="isLogged()">
          <img src="logo.png" width="50"/>
          <img src="../assets/falko-text.png" height="50"/>
        </a>
      </div>
      <div class="col-4" align="center">
        <div class="align-self-center">
          <searchbar></searchbar>
        </div>
      </div>
      <div class="col" align="end" v-if="this.$route.path != '/'">
        <router-link to="/user">
          <button class="falko-button btn btn-primary small-float-left">User Profile</button>
        </router-link>
          <button v-on:click="logout()" class="btn btn-primary falko-button falko-button-danger">Log Out</button>
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
    },
    isLogged(){
        if (localStorage.getItem('token') != "null") {
          this.$router.push('/projects');
        } else {
          this.$router.push('/');
        }
    }
  }
}
</script>

<style scoped>

.falko-brand:hover {
  cursor: pointer;
}

</style>
