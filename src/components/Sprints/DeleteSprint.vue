<template>
  <div class="delsprint">
    <button type="button" class="btn btn-info btn-md falko-button-danger" id="deletebutton" data-toggle="modal" data-target="#deleteSprintModal">
      Delete
    </button>
    <div class="modal fade" id ="deleteSprintModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <h4 class="modal-title">Delete Sprint?</h4>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p><label> Are you sure?</label></p>
          </div>
          <div class="modal-footer">
            <button v-on:click="deleteSprint" type="button" class="btn btn-info btn-md falko-button" data-dismiss="modal" >Yes</button>
            <button type="button" class="btn btn-info btn-md falko-button-grey" data-dismiss="modal">No</button>
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
  name: 'delsprint',
  computed: {
    ...mapState({
      token: state => state.auth.token,
      projectId: state => state.clientStatus.projectId,
    }),
  },
  methods: {
    async deleteSprint() {
      const headers = { Authorization: this.token };

      try {
        const response = await HTTP.get(`sprints/${this.$route.params.id}`, { headers });
        await HTTP.delete(`sprints/${this.$route.params.id}`, { headers });
        this.$router.push({ name: 'Releases', params: { id: this.projectId } });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
</style>
