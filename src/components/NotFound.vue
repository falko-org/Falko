<template lang="html">
  <div class= "row justify-content-around" id="notfound">
    <div class="col-md-8" align="center">
        <img src="../assets/bw-logo.png" class="img-fluid" id="logo"/>
        <h1 class="no-margin">404</h1>
        <h2 class="no-margin">Oops!</h2>
        <h3 class="text-muted no-margin"> Requested page not found!</h3><br>
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
    padding-top: 0.6em;
    padding-bottom: 0.5em;
    font-size: 3.5em;
}
h2 {
    color: #0E3341;
    font-style: italic;
    padding-bottom: 0.2em;
}
h3 {
    font-size: 1.2em;
}

#notfound{
    margin: 9em 0;
}

@media (max-width: 480px) {
     .img-fluid {
       width: 10em;
     }
 }

@media (max-width: 767px) {
  .img-fluid {
    width: 15em;
  }
}

@media (min-width: 768px) and (max-width: 979px) {
  .img-fluid {
    width: 24em;
  }
}

@media (min-width: 1200px) {
  .img-fluid {
    width: 23em;
  }
}

</style>
