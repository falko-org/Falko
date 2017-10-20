<template>
	<div>
		{{name}}
		<br>
		{{email}}
		<br>
		{{github}}
	</div>
</template>

<script>
	import {HTTP} from '../http-common.js';

	export default {
		data() {
			return {
				name: "",
				email: "",
				github: ""
				//is_github_authenticated: false
			}
		},
		methods: {			 
			getUser() {
				var raw_token = localStorage.getItem('token');
				var token = raw_token.replace(/"/, "").replace(/"/, "");

				var headers = { 'Authorization':token };

	      		var user_id = localStorage.getItem('user_id');

				HTTP.get("users/"+user_id, { headers: headers })
				.then((response) => {
					this.name = response.data.name;
					this.email = response.data.email;
					this.github = response.data.github;
					// if(response.data.access_token != null) {
					// 	this.is_github_authenticated = true;
					// }
				})
				.catch((e) => {
					this.errors.push(e);
				})
			}
		},
		mounted() {
			this.getUser();
		}
	}
</script>

<style scoped>
	
</style>