<template>
  <div>
    <div  id="sectionBlue">
      <div class="row justify-content-around">
        <div class="col-sm-6 align-self-center" id="loginComponent">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>

        <div class="col-sm-4" id="loginComponent">
          <login></login>
        </div>
      </div>
    </div>

    <div class="" id="sectionLight">
      <div class="row justify-content-around">
        <div class="col-sm-4" id="registerComponent">
          <register></register>
        </div>

        <div class="col-sm-6 align-self-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Login from './Login.vue'
import Register from './Register.vue'

export default {
  components: {
    'login': Login,
    'register': Register
  },

  data () {
    return {

    }
  }
}
</script>

<style scoped>
#loginComponent {
  padding-top: 2em;
  padding-bottom: 2em;
}

#registerComponent {
  padding-top: 4em;
  padding-bottom: 4em;
}

#sectionBlue {
  background-color: #598392;
}

#sectionLight {
  background-color: #124559;
}
</style>
