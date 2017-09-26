<template>
	<div class = "delproject">		
		<button type="button" class="btn btn-info btn-md " id="deletebutton" data-toggle="modal" data-target="#myModal">
			Deletar
		</button>	
		<div class="modal fade" id ="myModal" role="dialog">
				<div class="modal-dialog">	
		    	<div class="modal-content">
			        <div class="modal-header">
			          	<button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
			              <span aria-hidden="true">&times;</span>
			            </button>
			          <h4 class="modal-title">Apagar Projeto</h4>
			        </div>
			        <div class="modal-body">
			              <p><label > Você tem certeza que deseja fazer isso?</label></p>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-primary" data-dismiss="modal">Sim</button>
		        	  <button type="button" class="btn btn-secondary" data-dismiss="modal">Não</button>	
			        </div>
					</div>
				</div>
			</div>
	</div>
</template>

<script>

import axios from 'axios';

export default {	
	name: 'DeleteProject',
  data () {
    return {      
      
    }
  },
  methods:{
  	delproje(){
  		axios.delete("http://localhost:3000/projects/"+this.$route.params.id)
			.then(response =>{
				this.project = response.data
			})
			.catch(e =>{
				this.errors.push(e)
			});
  	}
  }
}
</script>

<style scoped>
#deletebtn{
  position: fixed;
  top: 12%;
  width: 7em;
  right: 5px;
  resize: both;
}
</style>