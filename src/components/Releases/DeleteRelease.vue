<template>
  <div>
    <v-btn  type="button" 
            class="danger falko-button-danger white--text" 
            :id="`deleteButton${this.parentRelease}`" 
            data-toggle="modal" 
            :data-target="`#deleteReleaseModal${this.parentRelease}`" 
            color="#AA0000"
    >
      Delete
    </v-btn>
    <div class="modal fade" v-bind:id="`deleteReleaseModal${this.parentRelease}`" role="dialog">
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
            <v-btn type="button"
                   v-on:click="deleteRelease"  
                   class="primary falko-button" 
                   data-dismiss="modal" 
            >
              Yes
            </v-btn>
            <v-btn type="button" 
                   class="secondary falko-button-grey" 
                   data-dismiss="modal" 
            >
              No
            </v-btn>
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
