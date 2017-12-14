<template>
  <div>
    <div>
      <button type="button" class="btn btn-info btn-md falko-button" id="addButton" data-toggle="modal" data-target="#addSprintModal">
        Add a Sprint
      </button>
    </div>
    <div class="modal fade" id ="addSprintModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Add a Sprint</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="row justify-content-center modal-body">
            <div class="col-6">
              <p><label>Name</label></p>
              <p><input type="text"
                        v-model="name"
                        id="sprintName"
                        name="name"
                        v-validate="'required'">
                  <br>
                  <p class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
              </p>
              <p><label>Description</label></p>
              <input type="text"
                     v-model="description"
                     name="description"
                     v-validate="'required'"></input>
              <p class="text-danger" v-if="errors.has('description')">{{ errors.first('description') }}</p>
              <br>
            </div>
            <div class="col-5">
              <p><label>Initial Date</label></p>
              <p><input type="date"
                        v-model="initialDate"
                        name="Initial Date"
                        min="2"
                        v-validate="'date_format:YYYY-MM-DD'">
              <br></p>
              <p><label>Final Date</label></p>
              <p><input type="date"
                        v-model="finalDate"
                        name="Final Date"
                        v-validate="'date_format:YYYY-MM-DD|after:Initial Date'">
              <p class="text-danger" v-if="errors.has('Final Date')">{{ errors.first('Final Date') }}</p>

              <br></p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" :disabled="errors.has('name') || errors.has('description') || errors.has('Final Date')" class="btn btn-info btn-md falko-button" v-on:click="addSprint" data-dismiss="modal">Save</button>
            <p class="text-danger" v-if="errors.has('wrong-credentials')">{{ errors.first('wrong-credentials') }}</p>
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
#sprintName {
  color: #777;
}

#addButton {
  margin-top: 2em;
}

.modal-body{
  position: relative;
  top: 5px;
}

p {
  margin-bottom: 0.5em;
}

label {
  margin-bottom: 0em;
}
</style>
