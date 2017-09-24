<template>
	<div class = "addproj">		
		<button type="button" class="btn btn-info btn-md " id="addbutton">Adicionar</button>
	    <div class="modal fade" id ="addict" role="dialog">
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
		              <p><input type = "text" id = "nameproject"></input><br></p>
		              <p><label> Descrição </label></p>
		              <input type = "text" id= "descriptionproject"></input><br>
		        </div>
		        <div class="modal-footer">
		          <button type="button" class="btn btn-primary">Salvar</button>
            	  <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>	
		        </div>
		      </div>		      
		    </div>
		  </div>
	  </div>																	
    </div>
	

</template>

<script>

$(document).ready(function(){
    $("#addbutton").click(function(){
        $("#addict").modal({backdrop: false});
    });
});
	
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
#addict{
	position: fixed;
	top: 100px;
}

</style>