<template>
  <div class = "editSprintBody">
    <v-btn  type="button" 
            class="primary falko-button" 
            data-toggle="modal" 
            data-target="#editSprintModal" 
    >
      Edit
    </v-btn>

    <div class="modal fade" id="editSprintModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit Sprint</h4>
            <v-btn type="button" 
                   text icon class="close" 
                   data-dismiss="modal" 
                   aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </v-btn>
          </div>
          <div class="row modal-body">
            <div class="col-6">
              <v-text-field
                label="Name"
                type="text"
                v-model="name"
                name="name"
                :rules="[rules.required]"
              />

              <v-text-field label="Description" type="text" v-model="description" />
            </div>

            <div class="col-6">
              <label>Initial Date</label>
              <input
                type="date"
                name="Initial Date"
                ref="Initial Date"
                v-model="sprintInitialDate"
                v-bind:min="this.releaseInitialDate"
                v-bind:max="this.releaseFinalDate"
                v-validate="'required|date_format:YYYY-MM-DD|'"
              />

              <label>Final Date</label>
              <input
                type="date"
                name="Final Date"
                v-model="sprintFinalDate"
                v-bind:min="this.sprintInitialDate"
                v-bind:max="this.releaseFinalDate"
                required
                v-validate="'date_format:YYYY-MM-DD|after:Initial Date'"
              />
              <p
                class="text-danger"
                v-if="errors.has('Final Date')"
              >{{ errors.first('Final Date') }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <v-btn  type="button" 
                    :disabled="errors.has('name') || errors.has('Initial Date') || errors.has('Final Date')" 
                    class="primary btn-md falko-button" 
                    v-on:click="editSprint" 
                    data-dismiss="modal" 
            >
              Save
            </v-btn>
            <v-btn type="button" 
                   class="secondary btn-md falko-button-grey" 
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
import { mapState } from "vuex";
import { HTTP } from "../../http-common";

export default {
  name: "editSprintBody",
  data() {
    return {
      rules: {
        required: value => !!value || "Required."
      },
      name: "",
      description: "",
      sprintInitialDate: "",
      sprintFinalDate: ""
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
      releaseInitialDate: state => state.clientStatus.releaseInitialDate,
      releaseFinalDate: state => state.clientStatus.releaseFinalDate
    })
  },
  methods: {
    editSprint() {
      const _this = this;
      const headers = { Authorization: this.token };

      HTTP.put(
        `sprints/${this.$route.params.id}`,
        {
          name: this.name,
          description: this.description,
          initial_date: this.sprintInitialDate,
          final_date: this.sprintFinalDate
        },
        { headers }
      )
        .then(() => {
          this.$emit("edited-sprint");
        })
        .catch(e => {
          _this.errors.add("wrong-credentials", "Problem with credentials");
        });
    },

    getSprintInformation() {
      const headers = { Authorization: this.token };

      HTTP.get(`sprints/${this.$route.params.id}`, { headers })
        .then(response => {
          this.name = response.data.name;
          this.description = response.data.description;
          this.sprintInitialDate = response.data.initial_date;
          this.sprintFinalDate = response.data.final_date;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  created() {
    this.getSprintInformation();
  }
};
</script>

<style scoped>
input {
  margin-bottom: 0.5em;
}
</style>
