<template>
  <div>
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import {HTTP} from './http-common.js';

export default {
  name: 'app',

   components: {
    navbar: Navbar
  },
}
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

input {
  border: none;
  border-radius: 0;
  border-bottom: solid #c0c0c0 thin;
  padding-left: 0;
}

input:focus {
  outline: 0;
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
  background-color: #6E9191;
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

.small-float-left {
  margin-right: 1em;
}

.no-margin {
  margin: 0;
}
</style>