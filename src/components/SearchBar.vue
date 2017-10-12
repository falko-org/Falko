<template>
  <div class="container">
      <div class="row">
          <div class="col-md-4 col-md-offset-3">
              <form action="" class="search-form">
                  <div class="form-group has-feedback">
              		<label for="search" class="sr-only">Search</label>
              		<input type="text" class="form-control" name="search" id="search" placeholder="search">
                		<i class="fa fa-search form-control-feedback"></i>
              	</div>
              </form>
          </div>
      </div>
  </div>
</template>


<script>

</script>


<style>
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css");

.search-form .form-group {
  float: right;
  transition: all 0.35s, border-radius 0s;
  width: 6em;
  height: 2em;
  background-color: #fff;
  border-radius: 1.563em;
  border: 0.063em solid #ccc;
}
.search-form .form-group input.form-control {
  padding-right: 1.250em;
  border: 0 none;
  background: transparent;
  box-shadow: none;
  display:block;
}

.search-form .form-group:hover,
.search-form .form-group.hover {
  width: 100%;
  border-radius: 1.563em;
  max-width: 20em;
}
.search-form .form-group i.form-control-feedback {
  position: absolute;
  top: -0.0625em;
  right: 0.833333125em;
  z-index: 2;
  display: block;
  width: 2.125em;
  height: 2.125em;
  line-height: 2.125em;
  padding: none;
  text-align: center;
  color: #598392;
  left: initial;
  font-size: 1em;
}


</style>
