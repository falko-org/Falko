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
            <v-btn  text icon
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    v-on:click="closeAlert()"
            >
              <span aria-hidden="true">&times;</span>
            </v-btn>
          </div>
        </div>
      </div>

      <form id="loginForm"  @submit.prevent="() => login()" name="wrong-credentials">
          <v-text-field
            label="Email"
            v-model="email"
            :rules="[rules.required, rules.validEmail]"
          ></v-text-field>

          <v-text-field
            label="Password"
            v-model="password"
            :type="'password'"
            :rules="[rules.required, rules.min]"
          ></v-text-field>

        <div class="text-center" left>
          <v-btn type="submit" class="primary falko-button white--text" id="loginButton">Log in</v-btn>
        </div>
        <div class="text-center">
          <router-link to="/users/forgotpassword"> Forgot your password?</router-link>
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
      alert: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters',
        emailMatch: () => ('Incorrect email or password'),
        validEmail: v => /.+@.+/.test(v) || 'E-mail must be valid',
      }
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

#falkoLogoLogin {
  width: 11em;
  margin: 2.5em 0;
}

.alert-column-left {
  width: 90%;
  font-size: 14px;
  padding-top: 1px;
}

.button-test {
  color: #ffffff;
}

#loginButton {
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
