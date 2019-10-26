<template>
  <div>
    <div align="center">
      <v-btn  type="button" 
              class="release falko-button white--text" 
              id="addReleaseButton" 
              data-toggle="modal" 
              data-target="#addReleaseModal" 
              align="center"
      >
        <div class="row justify-content-center">
          <div class="col-1">
            <i class="fa fa-lg fa-plus-circle"></i>
          </div>
          <div class="col-5">
            Add Release
          </div>
        </div>
      </v-btn>
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
              <v-text-field
                label="Name"
                v-model="name"
                :rules="[rules.required]"
              ></v-text-field>
              <p class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
              <br>

              <v-text-field
                label="Release description"
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
              </input><br>
            </div>
          </div>
          <div class="modal-footer">
            <v-btn  type="button" 
                    :disabled="errors.has('name') || errors.has('description') || errors.has('Final Date')" 
                    class="primary falko-button white--text" 
                    v-on:click="addRelease()" 
                    data-dismiss="modal"
            >
              Save
            </v-btn>
            <v-btn type="submit"
                   class="secondary falko-button white--text" 
                   data-dismiss="modal"
            >
              Close
            </v-btn>
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
      rules: {
        required: value => !!value || 'Required.',
      }
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
