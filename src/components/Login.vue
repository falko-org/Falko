<template>
  <div id="login">
    <div class="card-body">
      <img src="../assets/logo.png" class="rounded mx-auto d-block" id="falkoLogoLogin">

      <form id="loginForm">
        <div class="form-group">
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary falko-button">Log In</button>
        </div>
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
#login {
  max-width: 20em;
}

#loginForm input {
  border: none;
  border-radius: 0;
  border-bottom: solid #c0c0c0 thin;
  padding-left: 0;
}

#falkoLogoLogin {
  width: 11em;
  margin: 2.5em 0;
}

.falko-button {
  align-self: center;
  margin: 0.5em 0;
  border-radius: 2em;
  padding: 0.5em 2em;
  cursor: pointer;
  background-color: #86B1B1;
  border-width: 0;
  font-weight: bold;
}

.falko-button:hover {
  background-color: #86B1ED;
}
</style>
