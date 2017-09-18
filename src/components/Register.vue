<template>
  <div class="card" id="register">
    <div class="card-body tab-pane fade show active" id="registerPanel" role="tabpanel" aria-labelledby="pills-home-tab">
      <img src="../assets/logo.png" class="rounded mx-auto d-block" id="falkoLogoRegister">

      <form id="registerForm">
        <div class="form-group">
          <input type="text" class="form-control" id="exampleInputText" aria-describedby="userHelp" placeholder="Username">
        </div>
        <div class="form-group">
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" id="confirm-password" placeholder="Confirm Password">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" id="exampleInputGit" aria-describedby="gitHelp" placeholder="GitHub">
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary" id="registerButton">Register</button>
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
      password: '',
      username: '',
      github: ''
    }
  }
}
</script>

<style>
#register {
  max-width: 20em;
}

#registerForm input {
  border: none;
  border-radius: 0;
  border-bottom: solid #c0c0c0 thin;
}

#falkoLogoRegister {
  width: 11em;
  margin: 2.5em 0;
}
#registerButton {
  align-self: center;
  margin: 0.5em 0;
  border-radius: 2em;
  padding: 0.5em 2em;
  cursor: pointer;
  background-color: #86B1B1;
  border-width: 0;
  font-weight: bold;
}
</style>
