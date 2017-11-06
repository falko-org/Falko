<template>
  <div id="register">
    <div class="card-body">
      <img src="../../assets/logo.png" class="rounded mx-auto d-block" id="falkoLogoRegister">

      <form id="registerForm" @submit.prevent="register()">
        <div class="form-group">
          <input type="text" class="form-control" aria-describedby="userHelp" placeholder="Username" v-model="username">
        </div>
        <div class="form-group">
          <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Password" v-model="password">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Confirm Password" v-model="password_confirmation">
        </div>
        <div class="form-group">
          <input type="text" class="form-control" aria-describedby="gitHelp" placeholder="GitHub" v-model="github">
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary falko-button" id="">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { HTTP } from '../../http-common';

export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      password_confirmation: '',
      github: '',
    };
  },

  methods: {
    login() {
      HTTP.post('authenticate', {
        email: this.email,
        password: this.password,
      })
        .then((response) => {
          this.$router.push({ name: 'Projects' });
          localStorage.setItem('token', JSON.stringify(response.data.auth_token));
          localStorage.setItem('user_id', JSON.stringify(response.data.user.id));
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    register() {
      HTTP.post('users', {
        user: {
          email: this.email,
          name: this.username,
          password: this.password,
          password_confirmation: this.password_confirmation,
          github: this.github,
        },
      })
        .then(() => {
          this.login();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>

<style>
#register {
  max-width: 20em;
}

#registerForm input {
  border: none;
  border-radius: 0;
  border-bottom: solid #c0c0c0 thin;
  padding-left: 0;
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
