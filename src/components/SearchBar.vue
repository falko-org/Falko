<template>
  <div class="container" v-if="this.$route.path != '/'">
    <form action="" class="search-form">
        <div class="form-group has-feedback">
        <label for="search" class="sr-only">Search</label>
          <i class="fa fa-search form-control-feedback"></i>
          <input type="text" class="form-control" name="search" id="search" placeholder="Search..." v-model="search">
          </input>
      </div>
    </form>
  </div>
</template>


<script>

export default {
  data() {
    return {
      search: ''
    }
  }
}

</script>


<style>


.search-form .form-group {
  transition: all 0.35s, border-radius 0s;
  width: 6.5em;
  background-color: #fff;
  border-radius: 1.563em;
  border: 0.063em solid #ccc;
  margin-bottom: 0;
}

.search-form .form-group input.form-control {
  border: 0 none;
  background: transparent;
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
