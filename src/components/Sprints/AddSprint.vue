<template>
  <div>
    <div>
      <button type="button" class="btn btn-info btn-md falko-button" id="addButton" data-toggle="modal" data-target="#addSprintModal">
        Add a Sprint
      </button>
    </div>

    <div class="modal fade" id="addSprintModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Add a Sprint</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="row modal-body">
            <div class="col-6">
              <label>Name</label>
              <input type="text" placeholder="Sprint name..." v-model="name" name="name" v-validate="'required'"/>

              <label>Description</label>
              <input type="text" placeholder="Sprint description..." v-model="description"/>
            </div>

            <div class="col-6">
              <v-dialog
                ref="initialDialog"
                v-model="modalInitialDate"
                :return-value.sync="date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="sprintInitialDate"
                    label="Initial Date"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="sprintInitialDate" :min="this.releaseInitialDate" :max="this.releaseFinalDate" scrollable @input="modalInitialDate = false">
                </v-date-picker>
              </v-dialog>

              <v-dialog
                ref="finalDialog"
                v-model="modalFinalDate"
                :return-value.sync="date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="sprintFinalDate"
                    label="Final Date"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="sprintFinalDate" :min="this.sprintInitialDate" :max="this.releaseFinalDate" scrollable @input="modalFinalDate = false">
                </v-date-picker>
              </v-dialog>
              <p class="text-danger" v-if="errors.has('Final Date')">{{ errors.first('Final Date') }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" :disabled="errors.has('name') || errors.has('Initial Date') || errors.has('Final Date')" 
                    class="btn btn-info btn-md falko-button" v-on:click="addSprint" data-dismiss="modal">
              Save
            </button>
            <button type="button" class="btn btn-info btn-md falko-button-grey" data-dismiss="modal" >Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { EventBus } from '../../event-bus';
import { HTTP } from '../../http-common';

export default {
  name: 'addSprintBody',

  data() {
    return {
      name: '',
      description: '',
      sprintInitialDate: '',
      sprintFinalDate: '',
    };
  },

  computed: {
    ...mapState({
      token: state => state.auth.token,
      releaseId: state => state.clientStatus.releaseId,
      releaseInitialDate: state => state.clientStatus.releaseInitialDate,
      releaseFinalDate: state => state.clientStatus.releaseFinalDate,
    }),
  },

  methods: {
    addSprint() {
      const _this = this;
      const headers = { Authorization: this.token };

      HTTP.post(`releases/${this.releaseId}/sprints`, {
        sprint: {
          name: this.name,
          description: this.description,
          initial_date: this.sprintInitialDate,
          final_date: this.sprintFinalDate,
          release_id: this.releaseId,
        },
      }, { headers })
        .then(() => {
          this.name = '';
          this.description = '';
          this.sprintInitialDate = '';
          this.sprintFinalDate = '';
          EventBus.$emit('added-sprint', 1);
        })
        .catch((e) => {
          _this.errors.add('wrong-credentials', 'Problem with credentials');
        });
    },
  },
};
</script>

<style scoped>
#addButton {
  margin-top: 2em;
}

.modal-body{
  position: relative;
  top: 5px;
}

input {
  margin-bottom: 0.5em;
}
</style>
