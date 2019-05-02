<template>
  <div id="register">
    <div class="card-body">
      <img src="../../assets/logo.png" class="rounded mx-auto d-block img-fluid" id="falkoLogoRegister">
    
      <div v-if="this.email_alert" class="alert alert-danger fade show" role="alert">
        <div class="row">
          <div class="column alert-column-left">
            Email has already been taken
          </div>
          <div class="column">
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
              v-on:click="closeEmailAlert()"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>

      <form id="registerForm" @submit.prevent="register()"  data-vv-scope="form-register">
        <div class="form-group">
          <input  type="text"
                  class="form-control"
                  aria-describedby="userHelp"
                  placeholder="Username"
                  name="username"
                  v-validate="'required|min:3'"
                  v-model="username">
          <p class="text-danger" v-if="errors.has('form-register.username')">{{ errors.first('form-register.username') }}</p>
        </div>
        <div class="form-group">
          <input  type="email"
                  class="form-control"
                  aria-describedby="emailHelp"
                  name="email"
                  placeholder="Enter email"
                  v-model="email"
                  v-validate="'required|email'">
          <p class="text-danger" v-if="errors.has('form-register.email')">{{ errors.first('form-register.email') }}</p>
        </div>
        <div class="form-group">
          <input  type="password"
                  class="form-control"
                  placeholder="Password"
                  ref="password"
                  v-model="password"
                  name="password"
                  v-validate="'required|min:6'">
          <p class="text-danger" v-if="errors.has('form-register.password')">{{ errors.first('form-register.password') }}</p>
        </div>
        <div class="form-group">
          <input  type="password"
                  class="form-control"
                  placeholder="Confirm Password"
                  v-model="password_confirmation"
                  name="password"
                  v-validate="'confirmed:password'">
          <p class="text-danger" v-if="errors.has('form-register.password_confirmation')">{{ errors.first('form-register.password_confirmation') }}</p>
        </div>
        <div class="text-center">
          <button type="submit" :disabled="disableRegisterButton()" class="btn btn-primary falko-button" id="">Register</button>
          <p class="text-danger" v-if="errors.has('wrong-credentials')">{{ errors.first('wrong-credentials') }}</p>
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
      email_alert: false,
    };
  },

  methods: {
    login() {
      const thisOne = this;
      this.$store.dispatch('login', { email: this.email, password: this.password })
        .then(() => {
          this.$router.push({ name: 'Projects' });
        })
        .catch((err) => {
          thisOne.errors.add('wrong-credentials', 'Wrong Credentials');
          console.log(err.response.data); // It goes here!
        });
    },

    register() {
      const _this = this;

      HTTP.post('users', {
        user: {
          email: this.email,
          name: this.username,
          password: this.password,
          password_confirmation: this.password_confirmation,
        },
      })
        .then(() => {
          this.login();
        })
        .catch((err) => {
          if(err.response.data['email'].includes('has already been taken'))
            this.email_alert = true;
        });
    },

    closeEmailAlert() {
      this.email_alert = false;
    },

    disableRegisterButton() {
      if(this.errors.any('form-register'))
        return true;
      else if(this.email == '' || this.username == '' || this.password == '' || this.password_confirmation == '')
        return true;
      else
        return false;
    }
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
  margin: 1.3em 0;
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
