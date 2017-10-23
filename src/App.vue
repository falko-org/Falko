<template>
  <div>
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import store from './store';

export default {
  name: 'app',
  store,
  components: {
    navbar: Navbar
  },
};
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
}

.navbar-brand{
  margin-left: 1em;
}

.falko-button {
  align-self: center;
  margin: 0.5em 0;
  border-radius: 2em;
  padding: 0.5em 2em;
  cursor: pointer;
  background-color: #86B1B1;
  border-width: 0;
  font-weight: bold;
}

.falko-button:hover {
  background-color: #86B1ED;
}

.falko-button-danger {
  align-self: center;
  margin: 0.5em 0;
  border-radius: 2em;
  padding: 0.5em 2em;
  cursor: pointer;
  background-color: #AA0000;
  border-width: 0;
  font-weight: bold;
}

.falko-button-danger:hover {
  background-color: #660000;
}
</style>