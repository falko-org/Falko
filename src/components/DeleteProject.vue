<template>
	<div class="delproject">
		<button type="button" class="btn btn-info btn-md falko-button-danger" id="deletebutton" data-toggle="modal" data-target="#myModal">
			Delete
		</button>
		<div class="modal fade" id ="myModal" role="dialog">
			<div class="modal-dialog">
		    	<div class="modal-content">
			        <div class="modal-header">
									<div>
			            	<h4 class="modal-title">Delete Project?</h4>
									</div>
			          	<button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
			              <span aria-hidden="true">&times;</span>
			            </button>
			        </div>
			        <div class="modal-body">
			          <p><label> Are you sure?</label></p>
			        </div>
			        <div class="modal-footer">
            			<button v-on:click="delproje" type="button" class="btn btn-primary" data-dismiss="modal" >Yes</button>
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
	name: 'delproject',
  data () {
    return {

    }
  },
  methods:{
  	delproje(){

			var token = localStorage.getItem('token');
			var tokenSimple = token.replace(/"/, "");
			var tokenSimple2 = tokenSimple.replace(/"/, "");
			var headers = { 'Authorization':tokenSimple2 };

			HTTP.delete("projects/"+this.$route.params.id, { headers: headers })
			.then(response =>{
				this.$router.push({ path : '/projects'});
			})
			.catch(e =>{
				this.errors.push(e)
			});
  	}
  }
}
</script>

<style scoped>

</style>
