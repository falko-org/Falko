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
              <p><input type = "text" v-model="name"></input><br></p>
              <p><label> Description </label></p>
              <input type = "text" v-model="description"></input><br>
            </div>
            <div class="col">
              <p><label>Inital Date</label></p>
              <p></p><input type = "date" v-model="initialDate"></input><br></p>
              <p><label>Final Date</label></p>
              <p></p><input type = "date" v-model="finalDate"></input><br></p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info btn-md falko-button" v-on:click="editSprint" data-dismiss="modal">Save</button>
            <button type="button" class="btn btn-info btn-md falko-button-grey" data-dismiss="modal" >Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from '../../http-common';

export default{
  name: 'editSprintBody',
  data() {
    return {
      name: '',
      description: '',
      initialDate: '',
      finalDate: '',
    };
  },

  methods: {
    editSprint() {
      const token = localStorage.getItem('token');
      const tokenSimple = token.replace(/"/, '');
      const tokenSimple2 = tokenSimple.replace(/"/, '');
      const headers = { Authorization: tokenSimple2 };

      HTTP.put(`sprints/${this.$route.params.id}`, {
        name: this.name,
        description: this.description,
        initial_date: this.initialDate,
        final_date: this.finalDate,
      }, { headers })
        .then(() => {
          this.$emit('edited-sprint');
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    getSprintInformation() {
      const token = localStorage.getItem('token');
      const tokenSimple = token.replace(/"/, '');
      const tokenSimple2 = tokenSimple.replace(/"/, '');
      const headers = { Authorization: tokenSimple2 };

      HTTP.get(`sprints/${this.$route.params.id}`, { headers })
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
    this.getSprintInformation();
  },
};
</script>

<style scoped>
</style>
