<template>
  <div id="register">
    <div class="card-body">
      <img src="../../assets/logo.png" class="rounded mx-auto d-block img-fluid" id="falkoLogoRegister">
      <form id="registerForm" @submit.prevent="register()"  data-vv-scope="form-register">
        <div class="form-group">
          <v-text-field
            label="Username"
            v-model="username"
            :rules="[rules.required, rules.minName]"
          ></v-text-field>
          <p class="text-danger" v-if="errors.has('name-taken')">{{ errors.first('name-taken') }}</p>
        </div>
        <div class="form-group">
          <v-text-field
            label="Enter Email"
            v-model="email"
            :rules="[rules.required, rules.validEmail]"
          ></v-text-field>
          <p class="text-danger" v-if="errors.has('email-taken')">{{ errors.first('email-taken') }}</p>
        </div>
        <div class="form-group">
          <v-text-field
            label="Password"
            v-model="password"
            :type="'password'"
            :rules="[rules.required, rules.minPassword]"
          ></v-text-field>
        </div>
        <div class="form-group">
          <v-text-field
            label="Confirm Password"
            v-model="password_confirmation"
            :type="'password'"
            :rules="[rules.required, rules.minPassword, rules.confirmPasswordMatch]"
          ></v-text-field>
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
      rules: {
        required: value => !!value || 'Required.',
        minPassword: v => v.length >= 6 || 'Min 6 characters',
        minName: v => v.length >= 3 || 'Min 3 characters',
        emailMatch: () => ('Incorrect email or password'),
        validEmail: v => /.+@.+/.test(v) || 'E-mail must be valid',
        confirmPasswordMatch: () => (this.password === this.password_confirmation) || "Passwords doesn't match"
      }
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
          const resp_error = err.response.data;
      
          this.errorHandler(resp_error);
        });
    },

    errorHandler(resp_error){
          if(resp_error['email']) {
            this.errors.add({
              field: 'email-taken',
              msg: 'has already been taken'
            });
          }

          if(resp_error['name']) {
            this.errors.add({
              field: 'name-taken',
              msg: 'has already been taken'
            });
          }
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
