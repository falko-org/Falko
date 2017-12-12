<template>
  <div>
    <button type="button" class="btn btn-info btn-md falko-button-danger" v-bind:id="`deleteButton${this.parentReleaseId}`" data-toggle="modal" v-bind:data-target="`#deleteReleaseModal${this.parentReleaseId}`">
      Delete
    </button>
    <div class="modal fade" v-bind:id="`deleteReleaseModal${this.parentReleaseId}`" role="dialog">
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
            <p><label>Are you sure?</label></p>
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
  props: ['parentReleaseId'],

  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },

  methods: {
    deleteRelease() {
      const headers = { Authorization: this.token };

      HTTP.delete(`releases/${this.parentReleaseId}`, { headers })
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
