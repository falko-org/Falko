<template>
	<div class = "addproj">		
		<button type="button" class="btn btn-info btn-md " id="addbutton" data-toggle="modal" data-target="#myModal">
			Adicionar
		</button>

		<div class="modal fade" id ="myModal" role="dialog">
			<div class="modal-dialog">	
		    	<div class="modal-content">
			        <div class="modal-header">
			          	<button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
			              <span aria-hidden="true">&times;</span>
			            </button>
			          <h4 class="modal-title">Adicionar projeto</h4>
			        </div>
			        <div class="modal-body">
			              <p><label > Nome </label></p>
			              <p><input type = "text" v-model="name"></input><br></p>
			              <p><label> Descrição </label></p>
			              <input type = "text" v-model="description"></input><br>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-primary" v-on:click="addProject" data-dismiss="modal">Salvar</button>
		        	  <button type="button" class="btn btn-secondary" data-dismiss="modal" >Fechar</button>	
			        </div>
				</div>
			</div>
		</div>																	
    </div>
</template>

<script>
import { EventBus } from '../event-bus.js';
import {HTTP} from '../http-common';
export default {
  name: 'addProj',
  data () {
    return {      
      name: '',
      description : ''
    }
  },
  methods: {
  	addProject() {
	    HTTP.post(`projects`, {
	    	name: this.name,
	    	description: this.description
	    })
	    .then(response => {
	    	this.name = "";
	    	this.description = "";
	    	EventBus.$emit('added-project', 1)
	    })
	    .catch(e => {
	      this.errors.push(e)
	    });
	}
  }

}
</script>

<style >
.modal-body{
  position: relative;
  top: 5px;
}

</style>