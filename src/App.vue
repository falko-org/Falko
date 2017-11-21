<template>
  <div>
    <navbar></navbar>
    <div class="row">
      <div class="col limit-sidebar" v-if="this.$route.path != '/' && isLogged()">
        <sidebar></sidebar>
      </div>
      <div class="col no-white-bar">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import store from './store';
import { mapState } from 'vuex';

export default {
  name: 'app',
  store,
  components: {
    navbar: Navbar,
    sidebar: Sidebar,
  },

  methods: {
    isLogged() {
      return this.token != null;
    },
  },

  computed: {
    ...mapState({
      token: state => state.auth.token,
     }),
  },
};
</script>

<style>
input {
  border: none;
  border-radius: 0;
  border-bottom: solid #c0c0c0 thin;
  padding-left: 0;
}

input:focus {
  outline: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
}

.limit-sidebar {
  max-width: 4em;
}

.no-overflow {
  overflow-x: hidden !important;
}

.navbar-brand{
  margin-left: 1em;
}

.falko-button, .falko-button-danger, .falko-button-grey {
  align-self: center;
  margin: 0.5em 0;
  border-radius: 2em;
  padding: 0.5em 2em;
  cursor: pointer;
  background-color: #86B1B1;
  border-width: 0;
  font-weight: bold;
}

.falko-button-danger
{
  background-color: #AA0000;
}

.falko-button-grey
{
  background-color: #868e96;
}

.falko-button:enabled:hover {
  background-color: #6E9191;
}

.falko-button:disabled {
  background-color: #86B1B1;
  cursor: inherit;
}

.falko-button-danger:enabled:hover {
  background-color: #660000;
}

.falko-button-grey:hover {
  background-color: #565e66;
}

.small-float-left {
  margin-right: 1em;
}

.no-margin {
  margin: 0;
}

/* Modifing Bootstrap Classes */
.col {
  padding-left: 0;
  padding-right: 0;
}

.row {
  margin-left: 0;
  margin-right: 0;
}

.modal-title {
  font-weight: bold;
  color: #6E9191;
  margin: 0;
}

.no-white-bar {
  margin-bottom: -2%;
}

.disabled-cursor {
  cursor: inherit;
}

.pointer-cursor {
  cursor: pointer;
}

.number-circle, .number-circle-selected {
  font: 32px Arial, sans-serif;

  width: 2.5em;
  height: 2.5em;
  box-sizing: initial;

  background: transparent;
  border: 0.2em solid #7799A5;
  border-style: solid;
  color: #7799A5;
  text-align: center;
  border-radius: 50%;

  line-height: 2.5em;
  box-sizing: content-box;
  top: 50%;
  left: 50%;
}

</style>
