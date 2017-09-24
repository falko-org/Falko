<template>
  <div id="app">
  	<nav class="navbar topo static-top fixed-top navbar-expand-lg container.fluid">
        <div class = "navbar-header">
          <a class="navbar-brand" href="#">
            <img src = "./assets/Falko - Completo.png" width="70" height="50"/>
          </a>
        </div>
        <div class="form pesquisa my-2 my-lg-0">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <addProj id= "add"></addProj>
    </nav>
  <router-view></router-view>
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
  padding-left: 2%;
  height: 100%;
}

.pesquisa{
  position: fixed;
  left: 30%;
  right: 30%;
  top : 0.8em;
}

#add{
  position: fixed;
  margin-top: 20em;
}
</style>