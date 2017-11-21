<template>
  <div class="card" id="loginRegisterComponent">
    <ul class="nav justify-content-around" id="pills-tab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="pills-login-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-expanded="true">Log In</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-expanded="true">Register</a>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
        <login></login>
      </div>
      <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
        <register></register>
      </div>
    </div>
  </div>
</template>

<script>
import Login from './Login.vue';
import Register from './Register.vue';

export default {

  components: {
    login: Login,
    register: Register,
  },
};
</script>

<style>
#pills-tab {
  margin: 0;
}

#loginRegisterComponent {
  max-width: 22em;
}

.nav-link {
  color: #8B9598;
  padding-top: 1em;
  padding-bottom: 0.4em;
}

.nav-link:hover {
  color: #8B9598;
  border-bottom: 0.25em solid #CAD5D9;
  transition: border .3s ease;
}

.nav-link.active {
  color: #5D6A6F;
  border-bottom: 0.25em solid #86B1B1;
}


</style>
