<template>
  <div class="edit-user-profile">
    <button type="button" class="btn btn-info btn-md falko-button" id="editbutton" data-toggle="modal" data-target="#editModal">
      Edit
    </button>

		<div class="modal fade" id ="editModal" role="dialog">
			<div class="modal-dialog">
		    	<div class="modal-content">
			        <div class="modal-header">
			          	<button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
			          	<button type="button" class="btn btn-info btn-md falko-button" v-on:click="editUser" data-dismiss="modal">Save</button>
		        	  	<button type="button" class="btn btn-info btn-md falko-button-grey" data-dismiss="modal" >Close</button>
			        </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { HTTP } from '../../http-common';
	import { EventBus } from '../../event-bus.js';

  export default {
    name: 'edit-user-profile',
    data() {
      return {
        name: '',
        email: '',
        github: '',
        // is_github_authenticated: false,
      };
    },
    methods: {
      editUser() {
        var token = localStorage.getItem('token');
        var tokenSimple = token.replace(/"/, "");
        var tokenSimple2 = tokenSimple.replace(/"/, "");
        var headers = { 'Authorization': tokenSimple2 };
        var userId = localStorage.getItem('user_id');

        HTTP.put(`users/${userId}`, {
          user: {
            name: this.name,
            email: this.email,
            github: this.github,
          },
        }, { headers: headers })
          .then(() => {
            EventBus.$emit('edited-user-profile', 1);
          })
          .catch((e) => {
            this.errors.push(e);
          });
      },

      getUserInformation() {
        var token = localStorage.getItem('token');
        var tokenSimple = token.replace(/"/, "");
        var tokenSimple2 = tokenSimple.replace(/"/, "");
        var headers = { 'Authorization': tokenSimple2 };
        var userId = localStorage.getItem('user_id');


        HTTP.get(`users/${userId}`, { headers: headers })
          .then((response) => {
            this.name = response.data.name;
            this.email = response.data.email;
            this.github = response.data.github;
          })
          .catch((e) => {
            this.errors.push(e);
          });
      },
    },
    created() {
      this.getUserInformation();
    },
  };
</script>

<style scoped>

</style>
