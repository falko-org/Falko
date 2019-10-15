<template >
  <div class="delusers">
    <v-btn  type="button" 
            class="info falko-button-danger white--text" 
            id="deletebutton" 
            color="#AA0000" 
            data-toggle="modal" 
            data-target="#myModal"
    >
      Delete
    </v-btn>
    <div class="modal fade" id ="myModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <h4 class="modal-title">Delete Profile?</h4>
            </div>
            <v-btn text icon type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </v-btn>
          </div>
          <div class="modal-body">
            <p><label> Are you sure?</label></p>
          </div>
          <div class="modal-footer">
            <v-btn  type="button" 
                    v-on:click="deleteUser" 
                    class="info falko-button white--text" 
                    data-dismiss="modal" 
                    color="#86B1B1"
            >
              Yes
            </v-btn>
            <v-btn type="button" class="info falko-button white--text" data-dismiss="modal" color="#868e96">No</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { HTTP } from '../../http-common';

  export default {
    computed: {
      ...mapState({
        token: state => state.auth.token,
        userId: state => state.auth.userId,
      }),
    },
    methods: {
      deleteUser() {
        const headers = { Authorization: this.token };

        HTTP.delete(`users/${this.userId}`, { headers })
          .then(() => {
            this.$store.dispatch('logout', { email: this.email, password: this.password })
              .then(() => this.$router.push({ path: '/' }));
          })
          .catch((e) => {
            this.errors.push(e);
          });
      },
    },
};
</script>

<style>
</style>
