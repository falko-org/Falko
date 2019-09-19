<template>
  <div class="addproj">
    <div class="text-center">
      <v-btn type="button" class="primary falko-button white--text" id="addButton" data-toggle="modal" data-target="#addProjectModal" color="#86B1B1">
        Add a Project</v-btn>
    </div>
    <div class="modal fade" id ="addProjectModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Add a Project</h4>
            <v-btn text icon type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </v-btn>
          </div>
          <div class="modal-body" data-vv-scope="modal-project">
            <p><label>Name</label></p>
            <p><input type = "text"
                      name="name"
                      v-validate="'required'"
                      v-model="name">
                <p class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
                <br>
            </p>
            <p><label>Description</label></p>
            <input type = "text"
                   name = "description"
                   v-validate="'required'"
                   v-model="description">
            <p class="text-danger" v-if="errors.has('description')">{{ errors.first('description') }}</p>
            <br>
          </div>
          <div class="modal-footer">
            <v-btn type="button" :disabled="errors.has('name') || errors.has('description')" class="primary falko-button white--text" v-on:click="addProject" data-dismiss="modal" color="#86B1B1">Save</v-btn>
            <v-btn type="button" class="primary falko-button-grey white--text" data-dismiss="modal" color="#868e96">Close</v-btn>
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
      const _this = this;
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
          _this.errors.add('wrong-credentials', 'Problem with credentials');
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
