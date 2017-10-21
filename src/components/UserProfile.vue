<template>
	<div class="col">
		<div class="row">
			<div class="card mx-auto">
	      <div class="card-body project">
	      	<h4 class="card-title"> User Profile </h4>
	      	<div class="row">
		      	<label> Name: </label>
		        <p class="card-text text-muted">{{name}}</p>
		      </div>
		      <div class="row">
		        <label> E-mail: </label>
		        <p class="card-text text-muted">{{email}}</p>
		      </div>
		      <div class="row">
		        <label> GitHub Account: </label>
		        <p class="card-text text-muted">{{github}}</p>
		      </div>
	     	</div>
	    </div>
	  </div>
	  <div class="row justify-content-center">
	  	<div class="col-md-2">
				<edit-user-profile></edit-user-profile>
			</div>
			<div class="col-md-2">
		    <delete-user-profile></delete-user-profile>
		  </div>
	  </div>
	</div>
</template>

<script>
	import {HTTP} from '../http-common.js';
	import { EventBus } from '../event-bus.js';
	import EditUserProfile from '@/components/EditUserProfile'
	import DeleteUserProfile from '@/components/DeleteUserProfile'

	export default {
		name: "user_profile",
		components: {
			'edit-user-profile': EditUserProfile,
			'delete-user-profile': DeleteUserProfile
		},
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
	      console.log(user_id);

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
			var _this = this

			EventBus.$on('edited-user-profile', function (id) {
				_this.getUser();
    	});
		}
	}
</script>

<style scoped>
	label {
		margin-right: 5px;
	}

	#buttons {
  	margin-top: 1em;
	}
</style>
