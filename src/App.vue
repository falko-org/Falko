<template>
  <div id="app">
  	<nav class="navbar topo static-top fixed-top navbar-expand-lg container.fluid">
        <div class = "navbar-header">
          <a class="navbar-brand" href="#">
            <img src = "./assets/Falko - Final .png" width="50" height="40"/>
            <img src = "./assets/Falko - Texto.png" width="50" height="40"/>
          </a>
        </div>
        <div class="form-inline pesquisa my-2 my-lg-0">
          <input type="text" class="form-control" placeholder="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">OK</button>
        </div>
    </nav>
    <div class="container"><router-view></router-view></div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
}

.topo{
  padding: 0.2%;
  width: 100%;
  background-color: #E8E8E8;
}

.navbar-brand{
  left: 30em;
  margin-left: 0.5em;
  height: 100%;
}

.pesquisa{
  position: fixed;
  left: 40%;
  right: 20%;
  top : 0.45em;
}
</style>