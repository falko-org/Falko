<template>
  <div>
    <div align="center">
      <button type="button" class="btn btn-info btn-md falko-button" id="addReleaseButton" data-toggle="modal" data-target="#addReleaseModal" align="center">
        <div class="row justify-content-center">
          <div class="col-">
            <i class="fa fa-lg fa-plus-circle"></i>
          </div>
          <div class="col-5">
            Add Release
          </div>
        </div>
      </button>
    </div>

    <div class="modal fade" id ="addReleaseModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Add Release</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="row modal-body align-content-end">
            <div class="col-6">
              <label>Name</label>
              <input type="text" v-model="name" id="releaseName" placeholder="Release Name" name="name" v-validate="'required'">
                <p class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
              </input>
              <br>

              <label>Description</label>
              <input type="text" v-model="description" placeholder="Release description..." name="description" v-validate="'required'">
              <p class="text-danger" v-if="errors.has('description')">{{ errors.first('description') }}</p>
            </input><br>
            </div>
            <div class="col-6">
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="initialDate"
                    label="Initial Date"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="initialDate" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="finalDate"
                    label="Final Date"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="finalDate" :min="this.initialDate" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
              <label>Final Date</label>
              <input type="date" v-model="finalDate" v-bind:min="this.initialDate" name="Final Date" v-validate="'date_format:YYYY-MM-DD|after:Initial Date'">
              <p class="text-danger" v-if="errors.has('Final Date')">{{ errors.first('Final Date') }}</p>
              </input><br>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" :disabled="errors.has('name') || errors.has('description') || errors.has('Final Date')" class="btn btn-info btn-md falko-button" v-on:click="addRelease()" data-dismiss="modal">Save</button>
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
  data() {
    return {
      name: '',
      description: '',
      initialDate: '',
      finalDate: '',
      amount_of_sprints: 0,
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
      projectId: state => state.clientStatus.projectId,
    }),
  },
  methods: {
    addRelease() {
      const headers = { Authorization: this.token };

      HTTP.post(`/projects/${this.projectId}/releases`, {
        release: {
          name: this.name,
          description: this.description,
          initial_date: this.initialDate,
          final_date: this.finalDate,
          amount_of_sprints: this.amount_of_sprints,
        },
      }, { headers })
        .then(() => {
          this.name = '';
          this.description = '';
          this.initialDate = '';
          this.finalDate = '';

          EventBus.$emit('added-release');
        })
        .catch((e) => {
          this.errors.add('wrong-credentials', 'Problem with credentials');
        });
    },
  },

};
</script>

<style scoped>
input {
  margin-bottom: 0.5em;
}

#releaseName {
  color: #777;
}
#addReleaseButton {
  width: 100%;
  border-radius: 0;
  padding: 0.9em;
  margin: 0;
  background-color: #326579;
}

#addReleaseButton:hover {
  background-color: #124559;
}

.modal-body{
  position: relative;
  top: 5px;
}

.small-float-left {
  margin-right: .5em;
}
</style>
