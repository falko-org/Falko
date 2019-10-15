<template>
  <div class = "editproject">
    <v-btn  type="button" 
            class="info falko-button white--text" 
            color="#868e96" 
            :id="`editButton${this.release[1]}`" 
            data-toggle="modal" 
            :data-target="`#editReleaseModal${this.release[1]}`" 
            v-on:click="getReleaseInformation()"
    >
      Edit
    </v-btn>

    <div class="modal fade" v-bind:id="`editReleaseModal${this.release[1]}`" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit Release</h4>
            <v-btn text icon type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </v-btn>
          </div>
          <div class="row modal-body">
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
                    class="info falko-button white--text" 
                    v-on:click="editRelease()" 
                    data-dismiss="modal" 
                    id="saveButton"
            >
              Save
            </v-btn>
            <v-btn type="button" 
                   class="info falko-button-grey" 
                   data-dismiss="modal" 
                   id="closeButton"
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

#saveButton {
  background-color: #86B1B1;
}

#closeButton {
  background-color: #868e96;
}
</style>
