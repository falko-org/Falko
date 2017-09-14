<template>
  <div class="card">
    <div class="card-header">
      <ul class="nav nav-fill">
        <li class="nav-item">
          <a class="nav-link">Active</a>
        </li>
        <li class="nav-item">
          <a class="nav-link">Disabled</a>
        </li>
      </ul>
    </div>
    <div class="card-body">
      <img src="../assets/twitter.png" class="rounded mx-auto d-block" id="falkoLogoLogin">

      <form id="login">
        <div class="form-group">
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary">Log In</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<style>
#login input {
  border: none;
  border-radius: 0;
  border-bottom: solid #c0c0c0 thin;
}

#falkoLogoLogin {
  width: 11em;
}
</style>
