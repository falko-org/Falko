<template>
  <div class = "editSprintBody">
    <button type="button" class="btn btn-info btn-md falko-button" id="editbutton" data-toggle="modal" data-target="#editSprintModal">
      Edit
    </button>

    <div class="modal fade" id ="editSprintModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit Sprint</h4>
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
              <v-menu
                v-model="menu2Initial"
                :close-on-content-click="false"
                attach
                min-width="290px"
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
                <v-date-picker v-model="sprintInitialDate" :min="this.releaseInitialDate"
                               :max="this.releaseFinalDate" @input="menu2Initial = false">
                </v-date-picker>
              </v-menu>

              <v-menu
                v-model="menu2Final"
                :close-on-content-click="false"
                attach
                min-width="290px"
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
                <v-date-picker v-model="sprintFinalDate" :min="this.sprintInitialDate"
                               :max="this.releaseFinalDate" @input="menu2Final = false">
                </v-date-picker>
              </v-menu>
              <p class="text-danger" v-if="errors.has('Final Date')">{{ errors.first('Final Date') }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" :disabled="errors.has('name') || errors.has('Initial Date') || errors.has('Final Date')" 
                    class="btn btn-info btn-md falko-button" v-on:click="editSprint" data-dismiss="modal">
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
input {
  margin-bottom: 0.5em;
}
</style>
