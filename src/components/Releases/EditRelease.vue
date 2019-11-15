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
          <div class="row modal-body">
            <div class="col-6">
              <v-text-field
                label="Release Name"
                v-model="name"
                :rules="[rules.required]"
              ></v-text-field>
              <p class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
              <br>
              <v-text-field
                label="Release Description"
                v-model="description"
                :rules="[rules.required]"
              ></v-text-field>
              <p class="text-danger" v-if="errors.has('description')">{{ errors.first('description') }}</p>
              <br>
            </div>
            <div class="col-6">
              
              <label>Initial Date</label>
              <input type="date" v-model="initialDate" name="Initial Date" ref="Initial Date" min="2" v-validate="'date_format:YYYY-MM-DD'"/><br>
              <label>Final Date</label>
              <input type="date" v-model="finalDate" v-bind:min="this.initialDate" name="Final Date" v-validate="'date_format:YYYY-MM-DD|after:Initial Date'">
              <p class="text-danger" v-if="errors.has('Final Date')">{{ errors.first('Final Date') }}</p>
              <br>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" :disabled="errors.has('name') || errors.has('description') || errors.has('Final Date')" class="btn btn-info btn-md falko-button" v-on:click="editRelease()" data-dismiss="modal">Save</button>
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
  props: ['release'],

  data() {
    return {
      name: '',
      description: '',
      initialDate: '',
      finalDate: '',
      rules: {
        required: value => !!value || 'Required.',
      }
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
      releaseId: state => state.clientStatus.releaseId,
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
input {
  margin-bottom: 0.5em;
}
</style>
