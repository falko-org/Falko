<template>
	<div class="delsprint">
		<button type="button" class="btn btn-info btn-md falko-button-danger" id="deletebutton" data-toggle="modal" data-target="#delSprintModal">
			Delete
		</button>
		<div class="modal fade" id ="delSprintModal" role="dialog">
			<div class="modal-dialog">
		    	<div class="modal-content">
			        <div class="modal-header">
									<div>
			            	<h4 class="modal-title">Delete Sprint?</h4>
									</div>
			          	<button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
			              <span aria-hidden="true">&times;</span>
			            </button>
			        </div>
			        <div class="modal-body">
			          <p><label> Are you sure?</label></p>
			        </div>
			        <div class="modal-footer">
            			<button v-on:click="delsprint" type="button" class="btn btn-primary" data-dismiss="modal" >Yes</button>
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
	name: 'delsprint',
  data () {
    return {

    }
  },
  methods:{
  	delproje(){
			var headers = {'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1MDgwNjk5NDB9.z6-SzacTPbJNIbVtperIsNUvDlS5vJCl4pcIsRv4K4o'}
  		HTTP.delete("projects/1/sprints"+this.$route.params.id, { headers: headers })
			.then(response =>{
				this.$router.push({ path : '/projects/1/sprints'});
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
