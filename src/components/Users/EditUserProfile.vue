<template>
  <div class="edit-user-profile">
    <v-btn type="button" class="info falko-button white--text" id="editbutton" color="#86B1B1" data-toggle="modal" data-target="#editModal">
      Edit
    </v-btn>

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
              <p><label > Name </label></p>
              <p><input type="text" placeholder="User name..." v-model="name"></input><br></p>
            </div>
            <div class="col-md-6">
              <p><label> E-mail </label></p>
              <p><input type="text" placeholder="Email..." v-model="email"></input><br></p>
            </div>
          </div>
          <div class="modal-footer">
            <v-btn type="button" class="info falko-button white--text" color="#86B1B1" v-on:click="editUser" data-dismiss="modal">Save</v-btn>
            <v-btn type="button" class="info falko-button white--text" color="#868e96" data-dismiss="modal">Close</v-btn>
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
