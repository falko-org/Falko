<template>  
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card mx-auto"> 
        <div class="card-body project" id="userProfile">
          <h4 class="row justify-content-center card-title"> User Profile </h4>
          <div class="image-circle row justify-content-center">
            <img src="../../assets/user.png" height="60" />
          </div>
          <div class="row justify-content-center">
            <div class="card-body">
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
              <div class="row">
                <label> GitHub Authenticated: </label>
                <p class="card-text text-muted">{{is_github_authenticated}}</p>
              </div>
            </div>
          </div>    
          <div class="card-text">
            <div class="row justify-content-center">
              <div class="col-md-7">
                <button v-bind:class="buttonClass()" v-on:click="link()">
                  Link to Github
                </button>
              </div>            
              <div class="col">
                <edit-user-profile></edit-user-profile>
              </div>
              <div class="col">
                <delete-user-profile></delete-user-profile>
              </div>
            </div>
          </div>
        </div>
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
      is_github_authenticated: '',
    };
  },
  methods: {
    getUser() {
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
            this.is_github_authenticated = true;
          } else {
            this.is_github_authenticated = false;
          }
          this.is_github_authenticated = (localStorage.getItem('is_github_authenticated') === 'true');
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    link() {
      if (!this.isGitHubLinked()) {
        window.location.replace('https://github.com/login/oauth/authorize?scope=repo&client_id=cbd5f91719282354f09b');
      }
    },
    isGitHubLinked() {
      return this.is_github_authenticated;
    },
    buttonClass() {
      if (this.isGitHubLinked()) {
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
  .card {
    box-shadow: 0 0.2em 0.7em -0.1em #999999;
  }
  label {
    margin-right: .3em;
  }   
</style>
