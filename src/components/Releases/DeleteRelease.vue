<template>
  <div class="delproject">
    <button type="button" class="btn btn-info btn-md falko-button-danger" id="deletebutton" data-toggle="modal" data-target="#deleteReleaseModal">
      Delete
    </button>
    <div class="modal fade" id ="deleteReleaseModal" role="dialog">
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
            <button v-on:click="deleteRelease" type="button" class="btn btn-info btn-md falko-button" data-dismiss="modal" >Yes</button>
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
import { EventBus } from '../../event-bus';

export default {
  props: ['releaseId'],

  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },
  methods: {
    deleteRelease() {
      const headers = { Authorization: this.token };

      HTTP.delete(`releases/${this.releaseId}`, { headers })
        .then(() => {
          EventBus.$emit('deleted-release');
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>

<style scoped>

</style>
