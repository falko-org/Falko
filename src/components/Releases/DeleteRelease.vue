<template>
  <div>
    <v-btn type="button" class="info falko-button-danger" v-bind:id="`deleteButton${this.parentRelease}`" data-toggle="modal" v-bind:data-target="`#deleteReleaseModal${this.parentRelease}`" color="#AA0000">
      Delete
    </v-btn>
    <div class="modal fade" v-bind:id="`deleteReleaseModal${this.parentRelease}`" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <h4 class="modal-title">Delete Project?</h4>
            </div>
            <v-btn text icon type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </v-btn>
          </div>
          <div class="modal-body">
            <p><label>Are you sure?</label></p>
          </div>
          <div class="modal-footer">
            <v-btn v-on:click="deleteRelease" type="button" class="info falko-button" data-dismiss="modal" color="#86B1B1">Yes</v-btn>
            <v-btn type="button" class="info falko-button-grey" data-dismiss="modal" color="#868e96">No</v-btn>
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
  props: ['parentRelease'],

  computed: {
    ...mapState({
      token: state => state.auth.token,
      releaseIndex: state => state.clientStatus.releaseIndex,
      amountOfReleases: state => state.clientStatus.amountOfReleases,
    }),
  },

  methods: {
    deleteRelease() {
      const headers = { Authorization: this.token };
      const index = parseInt(this.releaseIndex, 10);
      let previousIndex = index - 1;

      if (previousIndex < 0 && this.amountOfReleases > 1) {
        previousIndex = 0;
      }

      HTTP.delete(`releases/${this.parentRelease}`, { headers })
        .then(() => {
          EventBus.$emit('deleted-release', previousIndex);
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
