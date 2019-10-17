<template>
  <v-card
    color="grey lighten-4"
    flat
    height="200px"
    tile 
  >
  <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">

    <v-toolbar dense height="80">
      <div class="col" id="logo">
        <a class="navbar-brand falko-brand" v-on:click="goToHome()">
          <img src="logo.png" width="50">
          <img src="../assets/falko-text.png" height="50"/>
        </a>
      </div>
      <div class="col-4" align="center" v-if="isLogged()">
      </div>
      <div class="col" align=right v-if="this.$route.path != '/' && isLogged()">
        <v-btn icon
          v-on:click="logout()"
          id="logout"
        >
          <v-icon class="fa fa-sign-out-alt"></v-icon>
        </v-btn> 
      </div>
    </v-toolbar>
  </v-card>
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

#logout:focus::before { opacity: 0 !important; }

#logout:enabled:hover {
  background-color: #3E5361;
  cursor: pointer;
  color: white;
}

#logo{
  cursor: pointer;
}

</style>
