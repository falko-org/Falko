<template>
	<div class = "editproject">
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
			          <h4 class="modal-title">Edit Project</h4>
			        </div>
			        <div class="modal-body">
								<p><label > Name </label></p>
								<p><input type = "text" v-model="name"></input><br></p>
								<p><label> Description </label></p>
								<input type = "text" v-model="description"></input><br>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-primary" v-on:click="editProject" data-dismiss="modal">Save</button>
		        	  <button type="button" class="btn btn-secondary" data-dismiss="modal" >Close</button>
			        </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { EventBus } from '../event-bus.js';
	import {HTTP} from '../http-common.js';
  import { mapState } from 'vuex';

	export default{
		name: 'editProj',
		data(){
			return {
				name: "",
				description: ""
			}
		},
    computed: {
      ...mapState({
        token: state => state.auth.token,
      })
    },
		methods: {
			editProject(){
        var headers = { 'Authorization':this.token };

				HTTP.put("projects/"+this.$route.params.id, {
					name: this.name,
					description: this.description
				}, { headers })
				.then((response)=>{
					this.$emit('edited-project', this.$route.params.id)
				})
				.catch(e=>{
					this.errors.push(e)
				});
			}
		}
	}
</script>

<style scoped>
</style>
