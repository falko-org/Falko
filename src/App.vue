<template>
  <div id="app">
    <router-view>
    </router-view>
    <nav class="navbar static-top fixed-top navbar-expand-lg navbar-fixed-top">
      <div class = "navbar-header">
        <a class="navbar-brand" href="#"><img src="assets/Falko-Final.png" width="40" height="40"/></a>
      </div>
      <div class="collapse navbar-collapse">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <ul class= "nav navbar-nav navbar-right">
          <li><a href="#" toggle="modal" id = "addp"><button type="button" class="btn btn-default navbar-btn bnt-primary">Adicionar </button></a></li>
          <li><a href="#" toggle="modal" id = "editp"><button type="button" class="btn btn-default navbar-btn">Editar</button></a></li>
        </ul>
      </div>
    </nav>

    <div class="modal fade" role="dialog" id="add">
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Adicionar/Editar Projeto</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body ">

            <div class = "column-3 column label">
              <label class="name"> Nome </label>
            </div>
            <div class = "column-9 column input">
              <input type = "text" id = "nameproject"></input><br>
            </div>
            <div class = "column-3 column label">
              <label> Descrição </label>
            </div>
            <div class = "column-9 column input">
              <input type = "text" id= "descriptionproject"></input>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">Salvar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'app'
}
$(document).ready(function(){
    $("#addp").click(function(){
        $("#add").modal();
    });
});

$(document).ready(function(){
    $("#editp").click(function(){
        $("#add").modal();
    });
});

</script>

<style scoped>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 110px;
}
.navbar{
  padding: 0.2%;
  width: 100%;
  background-color: #46555B;
}

.nav{
    position: absolute;
    width: 100%;
    left: 85%;
    text-align: center;
    margin:0 auto;
}

.form-group{
  position: absolute;
  left: 42%;
  top : 20%;
}

.btn{
  margin-right: 10px;
}

.navbar-brand{
  padding-left: 50px;
  height: 100%;
}
.modal-body{
  position: relative;
  top: 5px;

}
.modal{
  position: absolute;
  top: 100px;
}
.column-3 {
    width: 25%;
}

.column-9 {
    width: 75%;
}

.label {
    padding-top: 7px;
    text-align: right;
}

.label:after {
    content: ':';
    padding-right: 5px;
}

.column {
    float: left;
    height: 41px;
}

.input input {
    width: 100%;
    height: 34px;
    padding-left: 5px;
    box-sizing: border-box;
}

</style>
