<template>
  <div class = "editproject">
    <button type="button" class="btn btn-info btn-md falko-button" id="editbutton" data-toggle="modal" data-target="#editModal">
      Edit
    </button>
    <div class="modal fade" id ="editModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit Project</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p><label > Name </label></p>
            <p><input type = "text" v-model="name"></input><br></p>
            <p><label> Description </label></p>
            <input type = "text" v-model="description"></input><br>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info btn-md falko-button" v-on:click="editProject" data-dismiss="modal">Save</button>
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
  name: 'editProj',
  data() {
    return {
      name: '',
      description: '',
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },
  methods: {
    editProject() {
      const headers = { Authorization: this.token };

      HTTP.put(`projects/${this.$route.params.id}`, {
        name: this.name,
        description: this.description,
      }, { headers })
        .then(() => {
          this.$emit('edited-project');
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getProjectInformation() {
      const headers = { Authorization: this.token };

      HTTP.get(`projects/${this.$route.params.id}`, { headers })
        .then((response) => {
          this.name = response.data.name;
          this.description = response.data.description;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  created() {
    this.getProjectInformation();
  },
};
</script>

<style scoped>
</style>
