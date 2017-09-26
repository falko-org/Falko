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
			              <p><label class="name"> Nome </label></p>
			              <p><input type = "text"></input><br></p>
			              <p><label> Descrição </label></p>
			              <input type = "text"></input><br>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-primary">Salvar</button>
		        	  <button type="button" class="btn btn-secondary" data-dismiss="modal" >Fechar</button>	
			        </div>
				</div>
			</div>
		</div>																	
    </div>
</template>

<script>	
export default {
  name: 'addProj',
  data () {
    return {      
      nameproject: '',
      description : ''
    }
  }
}
</script>

<style >
.modal-body{
  position: relative;
  top: 5px;
}
#addbutton{
  position: fixed;
  top: 12%;
  width: 7em;
  right: 5px;
  resize: both;
}

</style>