<template>
  <nav class="navbar sticky-top navbar-light bg-light row justify-content-around no-margin">
    <div class="col" id="logo">
      <a class="navbar-brand falko-brand" v-on:click="goToHome()">
        <img src="logo.png" width="50"/>
        <img src="../assets/falko-text.png" height="50"/>
      </a>
    </div>
    <div class="col-4" align="center" v-if="isLogged()">
    </div>
    <div class="col" align="end" v-if="this.$route.path != '/' && isLogged()">
      <button v-on:click="logout()" class="fa fa-power-off" id="logout"></button>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {

  computed: {
    ...mapState({
      authenticated: state => state.auth.authenticated,
    }),
  },
  methods: {
    logout() {
      if (confirm("Are you sure?")) {
        this.$store.dispatch('logout')
          .then(() => {
            this.$router.push({ path: '/' });
            localStorage.clear();
          });
      }
    },
    goToHome() {
      if (this.authenticated) {
        this.$router.push('/projects');
      } else {
        this.$router.push('/');
      }
    },
    isLogged() {
      if (this.authenticated) {
        return true;
      }
      else {
        return false;
      }
    }
  }
}
</script>

<style scoped>

.navbar {
  border-bottom: solid;
  border-width: thin;
  border-color: #ddd;
}

#logout {
  width: 3em;
  height: 3em;
  background-color: inherit;
  border: 2px solid #3E5361;
  color: #3E5361;
  border-radius: 50%;
}

#logout:enabled:hover {
  background-color: #3E5361;
  cursor: pointer;
  color: white;
}

#logo{
  cursor: pointer;
}

</style>
