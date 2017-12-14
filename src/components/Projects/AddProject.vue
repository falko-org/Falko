<template>
  <div class="addproj">
    <div class="text-center">
      <button type="button" class="btn btn-info btn-md falko-button" id="addButton" data-toggle="modal" data-target="#addProjectModal">
        Add a Project
      </button>
    </div>
    <div class="modal fade" id ="addProjectModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Add a Project</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="row modal-body">
            <div class="col-md-6">
              <p><label>Name</label></p>
              <p><input type = "text" placeholder="Project name..." v-model="name"></input><br></p>
            </div>
            <div class="col-md-6">
              <p><label>Description</label></p>
              <input type = "text" placeholder="Project description..." v-model="description"></input><br>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info btn-md falko-button" v-on:click="addProject" data-dismiss="modal">Save</button>
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

export default {
  name: 'addProject',

  data() {
    return {
      name: '',
      description: '',
    };
  },

  computed: {
    ...mapState({
      token: state => state.auth.token,
      userId: state => state.auth.userId,
    }),
  },

  methods: {
    addProject() {
      const headers = { Authorization: this.token };

      HTTP.post(`users/${this.userId}/projects`, {
        project: {
          name: this.name,
          description: this.description,
          is_project_from_github: false,
          github_slug: null,
          is_scoring: false,
        },
      }, { headers })
        .then(() => {
          this.name = '';
          this.description = '';
          this.$emit('added');
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>

<style scoped>

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
