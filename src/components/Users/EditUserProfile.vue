<template>
  <div class="edit-user-profile">
    <button type="button" class="btn btn-info btn-md falko-button" id="editbutton" data-toggle="modal" data-target="#editModal">
      Edit
    </button>

    <div class="modal fade" id ="editModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit User Profile</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="row modal-body">
            <div class="col-md-6">
              <v-text-field
                label="Username"
                v-model="name"
                :rules="[rules.required]"
              ></v-text-field>
            </div>
            <div class="col-md-6">
              <v-text-field
                label="Email"
                v-model="email"
                :rules="[rules.required, rules.validEmail]"
              ></v-text-field>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info btn-md falko-button" v-on:click="editUser" data-dismiss="modal">Save</button>
            <button type="button" class="btn btn-info btn-md falko-button-grey" data-dismiss="modal" >Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { HTTP } from '../../http-common';
import { EventBus } from '../../event-bus';

export default {
  name: 'edit-user-profile',
  data() {
    return {
      name: '',
      email: '',
      is_github_authenticated: false,
      rules: {
        required: value => !!value || 'Required.',
        validEmail: v => /.+@.+/.test(v) || 'E-mail must be valid',
      }
    };
  },

  computed: {
    ...mapState({
      token: state => state.auth.token,
      userId: state => state.auth.userId,
    }),
  },

  methods: {
    editUser() {
      const headers = { Authorization: this.token };

      HTTP.put(`users/${this.userId}`, {
        user: {
          name: this.name,
          email: this.email,
        },
      }, { headers })
        .then(() => {
          EventBus.$emit('edited-user-profile', 1);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    getUserInformation() {
      const headers = { Authorization: this.token };

      HTTP.get(`users/${this.userId}`, { headers })
        .then((response) => {
          this.name = response.data.name;
          this.email = response.data.email;
          if (response.data.access_token != null) {
            this.is_github_authenticated = true;
          } else {
            this.is_github_authenticated = false;
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },

  created() {
    this.getUserInformation();
  },
};
</script>

<style scoped>

</style>
