<template>
  <div class="col">
    <div class="row">
      <div class="card mx-auto">
        <div class="card-body project">
          <h4 class="card-title"> User Profile </h4>
          <div class="row">
            <label> Name: </label>
            <p class="card-text text-muted">{{name}}</p>
          </div>
          <div class="row">
            <label> E-mail: </label>
            <p class="card-text text-muted">{{email}}</p>
          </div>
          <div class="row">
            <label> GitHub Account: </label>
            <p class="card-text text-muted">{{github}}</p>
          </div>
         </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-2">
        <edit-user-profile></edit-user-profile>
      </div>
      <div class="col-md-2">
        <delete-user-profile></delete-user-profile>
      </div>
      <div class="col-md-2">
        <button class="falko-button btn btn-primary" v-on:click="link()">Link to Github</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EditUserProfile from './EditUserProfile.vue';
import DeleteUserProfile from './DeleteUserProfile.vue';
import { HTTP } from '../../http-common';
import { EventBus } from '../../event-bus';

export default {
  name: 'user_profile',
  components: {
    'edit-user-profile': EditUserProfile,
    'delete-user-profile': DeleteUserProfile,
  },
  data() {
    return {
      name: '',
      email: '',
      github: '',
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
      userId: state => state.auth.userId,
    }),
  },
  methods: {
    getUser() {
      const headers = { Authorization: this.token };

      HTTP.get(`users/${this.userId}`, { headers })
        .then((response) => {
          this.name = response.data.name;
          this.email = response.data.email;
          this.github = response.data.github;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    link() {
      window.location.replace('https://github.com/login/oauth/authorize?scope=repo&client_id=cbd5f91719282354f09b');
    },
  },
  mounted() {
    this.getUser();
    const thisOne = this;

    EventBus.$on('edited-user-profile', () => {
      thisOne.getUser();
    });
  },
};
</script>

<style scoped>
  label {
    margin-right: 5px;
  }

  #buttons {
    margin-top: 1em;
  }
</style>
