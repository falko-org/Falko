<template>
	<div class = "editproject">		
		<button type="button" class="btn btn-info btn-md " id="editbutton" data-toggle="modal" data-target="#myModal">
			Editar
		</button>
		
		<div class="modal fade" id ="myModal" role="dialog">
			<div class="modal-dialog">	
		    	<div class="modal-content">
			        <div class="modal-header">
			          	<button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
			              <span aria-hidden="true">&times;</span>
			            </button>
			          <h4 class="modal-title">Editar projeto</h4>
			        </div>
			        <div class="modal-body">
			              <p><label > Nome </label></p>
			              <p><input type = "text" v-model="name"></input><br></p>
			              <p><label> Descrição </label></p>
			              <input type = "text" v-model="description"></input><br>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-primary" v-on:click="EditProject" data-dismiss="modal">Salvar</button>
		        	  <button type="button" class="btn btn-secondary" data-dismiss="modal" >Fechar</button>	
			        </div>
				</div>
			</div>
		</div>	
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		name: 'editProj',
		data(){
			return {
			project: {}
			}	
		},
		methods: {
			editProject(){
				axios.get("http://localhost:3000/projects/"+this.$route.params.id, {
					name: this.name,
					description: this.description
				})
				.then(response=>{
					this.project = response.data
					this.$router.push({ path : '/inproject/'+this.$route.params.id});
				})
				.catch(e=>{
					this.errors.push(e)
				});
			}
		}
	}
</script>
	
<style scoped>
	#editbutton{
		position: fixed;
		top: 40%;
		resize: both;

	}
</style>