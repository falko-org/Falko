<template >
  <div class="delusers">
		<button type="button" class="btn btn-info btn-md falko-button-danger" id="deletebutton" data-toggle="modal" data-target="#myModal">
			Delete
		</button>
		<div class="modal fade" id ="myModal" role="dialog">
			<div class="modal-dialog">
		    	<div class="modal-content">
			        <div class="modal-header">
									<div>
			            	<h4 class="modal-title">Delete Profile?</h4>
									</div>
			          	<button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
			              <span aria-hidden="true">&times;</span>
			            </button>
			        </div>
			        <div class="modal-body">
			          <p><label> Are you sure?</label></p>
			        </div>
			        <div class="modal-footer">
            			<button v-on:click="deleteUser" type="button" class="btn btn-primary" data-dismiss="modal" >Yes</button>
		        	  <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
			        </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import {HTTP} from '../http-common.js';

  export default {
    methods:{
      deleteUser(){
        var raw_token = localStorage.getItem('token');
				var token = raw_token.replace(/"/, "").replace(/"/, "");

				var headers = { 'Authorization':token };

	      var user_id = localStorage.getItem('user_id');

        HTTP.delete("users/"+user_id, { headers: headers })
        .then((response) => {
          this.$router.push({ path : '/' })
        })
        .catch((e) => {
          this.errors.push(e);
        })
      }
    }
}
</script>

<style >
</style>
