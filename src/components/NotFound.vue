<template>
  <div class= "row justify-content-around no-margin" id="notfound">
    <div class="col-md-8 align-self-center" align="center">
      <img src="../assets/bw-logo.png" class="img-fluid align-self-center"/>
      <h1 class="no-margin align-self-center">404</h1>
      <h2 class="no-margin align-self-center">Oops!</h2>
      <h3 class="text-muted no-margin align-self-center"> Requested page not found!</h3>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
h1 {
    color: #182B32;
    font-weight: bold;
    padding-top: 0.5em;
    font-size: 3.5em;
}
h2 {
    color: #0E3341;
    font-style: italic;
}
h3 {
    font-size: 1.2em;
}

#notfound{
  height: 32.4em;
}

@media (max-width: 480px) {
     .img-fluid {
       width: 5em;
     }
 }

@media (max-width: 767px) {
  .img-fluid {
    width: 10em;
  }
}

@media (min-width: 768px) {
  .img-fluid {
    width: 12.5em;
  }
}

@media (min-width: 1200px) {
  .img-fluid {
    width: 15em;
  }
}

@media (min-width: 1500px) {
  .img-fluid {
    width: 20em;
  }
}

</style>
