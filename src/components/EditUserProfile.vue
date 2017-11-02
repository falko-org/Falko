<template>
	<div class="edit-user-profile">
		<button type="button" class="btn btn-info btn-md falko-button" id="editbutton" data-toggle="modal" data-target="#editModal">
			Edit
		</button>

		<div class="modal fade" id ="editModal" role="dialog">
			<div class="modal-dialog">
		    	<div class="modal-content">
			        <div class="modal-header">
			          	<button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
			            	<span aria-hidden="true">&times;</span>
			            </button>
			          	<h4 class="modal-title">Edit User Profile</h4>
			        </div>
			        <div class="modal-body">
						<p><label > Name </label></p>
						<p><input type = "text" v-model="name"></input><br></p>
						<p><label> E-mail </label></p>
						<p><input type = "text" v-model="email"></input><br></p>
						<p><label> GitHub Account </label></p>
						<p><input type = "text" v-model="github"></input><br></p>
			        </div>
			        <div class="modal-footer">
			          	<button type="button" class="btn btn-primary" v-on:click="editUser" data-dismiss="modal">Save</button>
		        	  	<button type="button" class="btn btn-secondary" data-dismiss="modal" >Close</button>
			        </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { HTTP } from '../http-common';
	import { EventBus } from '../event-bus.js';
  import { mapState } from 'vuex';

	export default {
		name: "edit-user-profile",
		data() {
			return {
				name: "",
				email: "",
				github: ""
				//is_github_authenticated: false
			}
		},
    computed: {
      ...mapState({
        token: state => state.auth.token,
        userId: state => state.auth.userId
      })
    },
		methods: {
			editUser() {
        var headers = { 'Authorization':this.token };

				HTTP.put("users/"+this.userId, {
					user: {
							name: this.name,
							email: this.email,
							github: this.github
					}
				}, { headers })
				.then((response) => {
					EventBus.$emit('edited-user-profile', 1)
				})
				.catch((e) => {
					this.errors.push(e);
				})
			}
		}
	}
</script>

<style scoped>

</style>
