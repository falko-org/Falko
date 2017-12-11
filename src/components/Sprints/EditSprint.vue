<template>
  <div class = "editSprintBody">
    <button type="button" class="btn btn-info btn-md falko-button" id="editbutton" data-toggle="modal" data-target="#editSprintModal">
      Edit
    </button>

    <div class="modal fade" id ="editSprintModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">Edit Sprint</h4>
          </div>
          <div class="row modal-body">
            <div class="col">
              <p><label > Name </label></p>
              <p><input type="text"
                        v-model="name"
                        id="sprintName"
                        name="name"
                        v-validate="'required'">
                  <br>
                  <p class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
              </p>
              <p><label> Description </label></p>
              <input type="text"
                     v-model="description"
                     name="description"
                     v-validate="'required'"></input>
              <p class="text-danger" v-if="errors.has('description')">{{ errors.first('description') }}</p>
              <br>
            </div>
            <div class="col">
              <p><label>Inital Date</label></p>
              <p></p><input type = "date" v-model="initialDate" name="initialDate" min="2" v-validate="'date_format:YYYY-MM-DD'"></input><br></p>
              <p><label>Final Date</label></p>
              <p></p><input type = "date" v-model="finalDate" name="finalDate" v-validate="'date_format:YYYY-MM-DD|after:initialDate'"></input><br></p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" :disabled="errors.has('name') || errors.has('description') || errors.has('finalDate')" class="btn btn-info btn-md falko-button" v-on:click="editSprint" data-dismiss="modal">Save</button>
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

export default{
  name: 'editSprintBody',
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
      releaseInitialDate: state => state.clientStatus.releaseInitialDate,
      releaseFinalDate: state => state.clientStatus.releaseFinalDate,
    }),
  },
  methods: {
    editSprint() {
      const _this = this;
      const headers = { Authorization: this.token };

      HTTP.put(`sprints/${this.$route.params.id}`, {
        name: this.name,
        description: this.description,
        initial_date: this.sprintInitialDate,
        final_date: this.sprintFinalDate,
      }, { headers })
        .then(() => {
          this.$emit('edited-sprint');
        })
        .catch((e) => {
          _this.errors.add('wrong-credentials', 'Problem with credentials');
        });
    },

    getSprintInformation() {
      const headers = { Authorization: this.token };

      HTTP.get(`sprints/${this.$route.params.id}`, { headers })
        .then((response) => {
          this.name = response.data.name;
          this.description = response.data.description;
          this.sprintInitialDate = response.data.initial_date;
          this.sprintFinalDate = response.data.final_date;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  created() {
    this.getSprintInformation();
  },
};
</script>

<style scoped>
</style>
