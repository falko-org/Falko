<template>
  <div id="login">
    <div class="card-body">
      <img src="../../assets/logo.png" class="rounded mx-auto d-block img-fluid" id="falkoLogoLogin">

      <div v-if="this.alert" class="alert alert-danger fade show" role="alert">
        <div class="row">
          <div class="column alert-column-left">
            {{ errors.first('invalid-credentials') }}
          </div>
          <div class="column">
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
              v-on:click="closeAlert()"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>

      <form id="loginForm"  @submit.prevent="() => login()" name="wrong-credentials">
        <div class="form-group">
          <input  type="email"
          class="form-control"
          placeholder="Email"
          name="email"
          v-model="email"
          v-validate="'email'" >
          <p class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</p>
        </div>

        <div class="form-group">
          <input  type="password"
          class="form-control"
          placeholder="Password"
          name="password"
          v-model="password"
          v-validate="'required|min:6'">
          <p class="text-danger" v-if="errors.has('password')">{{ errors.first('password') }}</p>
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary falko-button" id="loginButton" >Log In</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { HTTP } from '../../http-common';

export default {
  data() {
    return {
      email: '',
      password: '',
      alert: false
    };
  },

  methods: {
    login() {
      const thisOne = this;
      this.$store.dispatch('login', { email: this.email, password: this.password })
      .then((res) => {
        this.$router.push({ name: 'Projects' });
      })
      .catch((err) => {
        const resp_error = err.response.data['error']['user_authentication'];
        if(resp_error.includes('invalid credentials')) {
          thisOne.errors.add({
            field: 'invalid-credentials',
            msg: 'Incorrect email or password'
          });
          thisOne.alert = true;
        }
      });
    },
    closeAlert() {
      this.alert = false;
    },
  },
};
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

.alert-column-left {
  width: 90%;
  font-size: 14px;
  padding-top: 1px;
}
</style>
