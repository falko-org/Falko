<template>
  <div class="">
    <div class="text-center">
      <button type="button" class="btn btn-info btn-md falko-button" id="addButton" data-toggle="modal" data-target="#addReleaseModal">
        Add Release
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
          <div class=" row modal-body">
            <div class="col">
              <p><label>Name</label></p>
              <p><input type="text" v-model="name" id="releaseName"></input><br></p>
              <p><label>Description</label></p>
              <input type="text" v-model="description" placeholder="Release description..."></input><br>
            </div>
            <div class="col">
              <p><label>Initial Date</label></p>
              <p><input type="date" v-model="initialDate"></input><br></p>
              <p><label>Final Date</label></p>
              <p><input type="date" v-model="finalDate"></input><br></p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info btn-md falko-button" v-on:click="addRelease()" data-dismiss="modal">Save</button>
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
      name: 'New Release',
      description: '',
      initialDate: '',
      finalDate: '',
      amount_of_sprints: 0,
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },
  methods: {
    addRelease() {
      const headers = { Authorization: this.token };

      HTTP.post(`/projects/${this.$route.params.id}/releases`, {
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
          EventBus.$emit('added-release', 1);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },

};
</script>

<style scoped>
#releaseName {
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
