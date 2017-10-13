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
import axios from 'axios';
import {HTTP} from '../http-common.js';

export default {
	methods: {
		link() {
			window.location.replace("https://github.com/login/oauth/authorize?scope=repo&client_id=cbd5f91719282354f09b");
		}
	},
	mounted() {
		var code = window.location.search.split("=")[1];
		HTTP.post('',{
			code: this.code
		})
		.then((response) => {
		})
		.catch()

	}	
}
</script>

<style scoped>
</style>
