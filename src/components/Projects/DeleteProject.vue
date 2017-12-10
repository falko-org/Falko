<template>
  <div class="delproject">
    <button type="button" class="btn btn-info btn-md falko-button-danger" id="deletebutton" data-toggle="modal" data-target="#myModal">
      Delete
    </button>
    <div class="modal fade" id ="myModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <h4 class="modal-title">Delete Project?</h4>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p><label> Are you sure?</label></p>
          </div>
          <div class="modal-footer">
            <button v-on:click="deleteProject" type="button" class="btn btn-info btn-md falko-button" data-dismiss="modal" >Yes</button>
            <button type="button" class="btn btn-info btn-md falko-button-grey" data-dismiss="modal">No</button>
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
  name: 'delproject',
  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },
  methods: {
    deleteProject() {
      const headers = { Authorization: this.token };

      HTTP.delete(`projects/${this.$route.params.id}`, { headers })
        .then(() => {
          this.$router.push({ path: '/projects' });
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>

<style scoped>
#deletebutton {
  width: 120px;
}
</style>
