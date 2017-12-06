<template>
  <div class = "editproject">
    <button type="button" class="btn btn-info btn-md falko-button-grey" v-bind:id="`editButton${this.release[1]}`" data-toggle="modal" v-bind:data-target="`#editReleaseModal${this.release[1]}`" v-on:click="getReleaseInformation()">
      Edit
    </button>

    <div class="modal fade" v-bind:id="`editReleaseModal${this.release[1]}`" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit Release</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class=" row modal-body">
            <div class="col">
              <p><label>Name</label></p>
              <p><input type="text" v-model="name" id="releaseName"></input><br></p>
              <p><label>Description</label></p>
              <input type="text" v-model="description"></input><br>
            </div>
            <div class="col">
              <p><label>Initial Date</label></p>
              <p><input type="date" v-model="initialDate"></input><br></p>
              <p><label>Final Date</label></p>
              <p><input type="date" v-model="finalDate"></input><br></p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info btn-md falko-button" v-on:click="editRelease()" data-dismiss="modal">Save</button>
            <button type="button" class="btn btn-info btn-md falko-button-grey" data-dismiss="modal">Close</button>
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
  props: ['release'],

  data() {
    return {
      name: '',
      description: '',
      initialDate: '',
      finalDate: '',
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },
  methods: {
    editRelease() {
      const headers = { Authorization: this.token };

      HTTP.patch(`releases/${this.release[0]}`, {
        name: this.name,
        description: this.description,
        initial_date: this.initialDate,
        final_date: this.finalDate,
      }, { headers })
        .then(() => {
          EventBus.$emit('edited-release');
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    getReleaseInformation() {
      const headers = { Authorization: this.token };
      HTTP.get(`releases/${this.release[0]}`, { headers })
        .then((response) => {
          this.name = response.data.name;
          this.description = response.data.description;
          this.initialDate = response.data.initial_date;
          this.finalDate = response.data.final_date;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  created() {
    this.getReleaseInformation();
  },
};
</script>

<style scoped>
</style>
