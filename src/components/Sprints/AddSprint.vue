<template>
  <div class="addsprintBody">
    <div class="text-center">
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
          <div class="row modal-body">
            <div class="col">
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
            <div class="col">
              <p><label>Initial Date</label></p>
              <p><input type="date"
                        v-model="initialDate"
                        name="initialDate"
                        min="2"
                        8="2"
                        v-validate="'date_format:YYYY-MM-DD'">
              <br></p>
              <p><label>Final Date</label></p>
              <p><input type="date"
                        v-model="finalDate"
                        name="finalDate"
                        v-validate="'date_format:YYYY-MM-DD|after:initialDate'">
              <p class="text-danger" v-if="errors.has('finalDate')">{{ errors.first('finalDate') }}</p>

              <br></p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" :disabled="errors.has('name') || errors.has('description') || erros.has('finalDate')" class="btn btn-info btn-md falko-button" v-on:click="addSprint" data-dismiss="modal">Save</button>
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
    addSprint() {
      const _this = this;
      const headers = { Authorization: this.token };

      HTTP.post(`releases/${this.$route.params.id}/sprints`, {
        sprint: {
          name: this.name,
          description: this.description,
          initial_date: this.initialDate,
          final_date: this.finalDate,
          release_id: this.$route.params.id,
        },
      }, { headers })
        .then(() => {
          this.name = '';
          this.description = '';
          this.initialDate = '';
          this.finalDate = '';
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
