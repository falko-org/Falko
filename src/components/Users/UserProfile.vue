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
            </div>
          </div>
          <div class="card-text">
            <div class="row justify-content-center">
              <div class="col-md-7">
                <button class="falko-button btn btn-primary" v-on:click="setGitHubButtonAction()">
                  {{this.gitHubButtonLabel}}
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
      gitHubButtonLabel: '',
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
      userId: state => state.auth.userId,
      isGitHubAuthenticated: state => state.auth.isGitHubAuthenticated,
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
          const isGithubLinked = response.data.access_token;

          if (isGithubLinked != null) {
            this.setGithubAuthentication(true);
          } else {
            this.setGithubAuthentication(false);
          }

          this.setGitHubButtonLabel();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    setGithubAuthentication(authenticated) {
      if (authenticated) {
        this.$store.dispatch('linkedGitHub');
      } else {
        this.$store.dispatch('unlinkedGitHub');
      }
    },

    link() {
      location.replace(`https://github.com/login/oauth/authorize?scope=repo&client_id=${GITHUB_CLIENT_ID}`);

      const headers = { Authorization: this.token };
      const id = this.userId;
      const code = window.location.search.split('=')[1];

      this.$store.dispatch('linkGithub', { headers, id, code })
        .then(() => {
          this.$router.push({ name: 'UserProfile' });
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    unlink() {
      const headers = { Authorization: this.token };

      HTTP.post('remove_github_token', {
        id: this.userId,
      }, { headers })
        .then(() => {
          this.$store.dispatch('unlinkedGitHub');
          this.setGitHubButtonLabel();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    isGitHubLinked() {
      return this.isGitHubAuthenticated;
    },

    setGitHubButtonLabel() {
      if (this.isGitHubLinked()) {
        this.gitHubButtonLabel = 'Remove link with Github';
      } else {
        this.gitHubButtonLabel = 'Link to Github';
      }
    },

    setGitHubButtonAction() {
      if (this.isGitHubLinked()) {
        this.unlink();
      } else {
        this.link();
      }
    },
  },

  mounted() {
    this.getUser();

    EventBus.$on('edited-user-profile', () => this.getUser());
  },
};
</script>

<style scoped>
  .card {
    box-shadow: 0em 0.12em 0.01em 0em #ddd;
  }

  label {
    margin-right: .3em;
  }
</style>
