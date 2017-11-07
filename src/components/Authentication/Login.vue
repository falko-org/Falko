<template>
  <div id="login">
    <div class="card-body">
      <img src="../../assets/logo.png" class="rounded mx-auto d-block img-fluid" id="falkoLogoLogin">

      <form id="loginForm"  @submit.prevent="login()">
        <div class="form-group">
          <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Email" v-model="email">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Password" v-model="password">
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary falko-button" >Log In</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {HTTP} from '../../http-common.js';

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    login () {
      HTTP.post('authenticate', {
        email: this.email,
        password: this.password
      })
      .then((response) => {
        localStorage.setItem('token', JSON.stringify(response.data.auth_token));
        localStorage.setItem('user_id', JSON.stringify(response.data.user.id));
        this.$router.push({ name: 'Projects' });
      })
      .catch (e => {
        this.errors.push(e)
      });
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
</style>
