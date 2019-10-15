<template>
  <div class="delsprint">
    <v-btn  type="button" 
            class="info falko-button-danger" 
            id="deletebutton" 
            data-toggle="modal" 
            data-target="#deleteSprintModal" 
            color="#AA0000"
    >
      Delete
    </v-btn>
    <div class="modal fade" id ="deleteSprintModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <h4 class="modal-title">Delete Sprint?</h4>
            </div>
            <v-btn text icon type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </v-btn>
          </div>
          <div class="modal-body">
            <p><label> Are you sure?</label></p>
          </div>
          <div class="modal-footer">
            <v-btn  v-on:click="deleteSprint" 
                    type="button" 
                    class="info btn-md falko-button" 
                    data-dismiss="modal" 
                    color="#86B1B1"
            >
              Yes
            </v-btn>
            <v-btn type="button" class="info btn-md falko-button-grey" data-dismiss="modal" color="#868e96">No</v-btn>
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
