<template>
  <div class="col">
    <div class="row">
      <div class="card mx-auto">
        <div class="card-body project">
          <div class="col">
            <div class="row">
              <h4 class="card-title"> User Profile </h4>
            </div>
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
    </div>
    <div class="row justify-content-center">
      <div class="col-md-2">
        <edit-user-profile></edit-user-profile>
      </div>
      <div class="col-md-2">
        <delete-user-profile></delete-user-profile>
      </div>
      <div v-if="!isGitHubLinked()" class="col-md-2">
        <button v-bind:class="buttonLinkClass()" v-on:click="link()">
          Link to Github
        </button>
      </div>
      <div v-else class="col-md-2">
        <button v-bind:class="buttonRemoveLinkClass()" v-on:click="removeToken()">
          Remove link with Github
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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
  methods: {
    getUser() {
      this.isGitHubLinked();

      const rawToken = localStorage.getItem('token');
      const token = rawToken.replace(/"/, '').replace(/"/, '');
      const headers = { Authorization: token };
      const userId = localStorage.getItem('user_id');

      HTTP.get(`users/${userId}`, { headers })
        .then((response) => {
          this.name = response.data.name;
          this.email = response.data.email;
          this.github = response.data.github;
          if (response.data.access_token != null) {
            localStorage.setItem('is_github_authenticated', true);
          } else {
            localStorage.setItem('is_github_authenticated', false);
          }
          this.is_github_authenticated = (localStorage.getItem('is_github_authenticated') === 'true');
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    link() {
      if (!this.isGitHubLinked()) {
        location.replace('https://github.com/login/oauth/authorize?scope=repo&client_id=cbd5f91719282354f09b');
        localStorage.setItem('is_github_authenticated', true);
      }
    },

    removeToken() {
      const rawToken = localStorage.getItem('token');
      const token = rawToken.replace(/"/, '').replace(/"/, '');
      const headers = { Authorization: token };
      const userId = localStorage.getItem('user_id');

      HTTP.post('remove_github_token', {
        id: userId,
      }, { headers })
        .then(() => {
          localStorage.setItem('is_github_authenticated', false);
          location.reload();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    isGitHubLinked() {
      return (localStorage.getItem('is_github_authenticated') === 'true');
    },

    buttonLinkClass() {
      if (this.isGitHubLinked()) {
        return 'btn btn-info btn-md falko-button-grey disabled-cursor';
      }
      return 'falko-button btn btn-primary';
    },

    buttonRemoveLinkClass() {
      if (!this.isGitHubLinked()) {
        return 'btn btn-info btn-md falko-button-grey disabled-cursor';
      }
      return 'falko-button btn btn-primary';
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
