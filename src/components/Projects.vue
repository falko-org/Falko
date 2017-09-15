<template>
  <div class="container">
    <div class="row top-buffer" v-for="i in Math.ceil(projects.length / 2)">
      <div v-for="project in projects.slice((i-1) * 2,i*2)" class="col-md-6">
        <div  class="card">        
          <div class="card-body">
            <div class="card-title">{{project.name}}</div>
            <div class="card-text">{{project.description}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'projects',
  data(){
    return{
      projects: [{name: "projeto1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac lorem eros. Praesent gravida augue sit amet sem semper faucibus. Nulla convallis nunc odio, eu dapibus dui semper vel. Donec mi mi, rutrum sed venenatis id, auctor vitae nisi. Praesent bibendum eros vel orci lacinia ullamcorper."},{name: "projeto2", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac lorem eros. Praesent gravida augue sit amet sem semper faucibus. Nulla convallis nunc odio, eu dapibus dui semper vel. Donec mi mi, rutrum sed venenatis id, auctor vitae nisi. Praesent bibendum eros vel orci lacinia ullamcorper."},{name: "projeto3", description: "dipiscing elit. Maecenas ac lorem eros. Praesent gravida augue sit amet sem semper faucibus. Nulla convallis nunc odio, eu dapibus dui semper vel. Donec mi mi, rutrum sed venenatis id, auctor vitae nisi. Praesent bibendum eros vel orci lacinia ullamcorper."}, {name: "projeto4", description: "dipiscing elit. Maecenas ac lorem eros. Praesent gravida augue sit amet sem semper faucibus. Nulla convallis nunc odio, eu dapibus dui semper vel. Donec mi mi, rutrum sed venenatis id, auctor vitae nisi. Praesent bibendum eros vel orci lacinia ullamcorper."}, {name: "projeto5", description: "dipiscing elit. Maecenas ac lorem eros. Praesent gravida augue sit amet sem semper faucibus. Nulla convallis nunc odio, eu dapibus dui semper vel. Donec mi mi, rutrum sed venenatis id, auctor vitae nisi. Praesent bibendum eros vel orci lacinia ullamcorper."}]
    }
  }
}

</script>

<style scoped>
.top-buffer {
  margin-top:30px; 
}
</style>
