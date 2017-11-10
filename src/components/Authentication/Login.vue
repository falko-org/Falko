<template>
  <div id="login">
    <div class="card-body">
      <img src="../../assets/logo.png" class="rounded mx-auto d-block img-fluid" id="falkoLogoLogin">

      <form id="loginForm"  @submit.prevent="login()" name="wrong-credentials">
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
          <button type="submit" class="btn btn-primary falko-button" >Log In</button>
        </div>
        <p class="text-danger" v-if="errors.has('wrong-credentials')">{{ errors.first('wrong-credentials') }}</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
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
          console.log(err); // It goes here!
        });
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
</style>
