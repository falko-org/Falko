<template>
  <div>
    <button type="button" class="btn btn-info btn-md falko-button-danger" id="deletebutton" data-toggle="modal" data-target="#deleteRetrospectiveModal">
      Delete
    </button>

    <div class="modal fade" id ="deleteRetrospectiveModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <h4 class="modal-title">Delete Retrospective?</h4>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p><label> Are you sure?</label></p>
          </div>
          <div class="modal-footer">
            <button v-on:click="deleteRetrospective()" type="button" class="btn btn-primary" data-dismiss="modal" >Yes</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from '../../http-common';

export default {
  name: 'deleteRetrospective',
  data() {
    return {

    };
  },
  methods: {

    async deleteRetrospective() {
      const token = localStorage.getItem('token');
      const tokenSimple = token.replace(/"/, '');
      const tokenSimple2 = tokenSimple.replace(/"/, '');
      const headers = { Authorization: tokenSimple2 };

      try {
        const response = await HTTP.get(`/retrospectives/${this.$route.params.id}`, { headers });
        const id = response.data.sprint_id;

        await HTTP.delete(`/retrospectives/${this.$route.params.id}`, { headers });
        this.$router.push({ path: `/Sprints/${id}` });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>

</style>
