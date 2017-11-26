<template>
  <div>
    <button type="button" class="btn btn-info btn-md falko-button-danger" id="deletebutton" data-toggle="modal" data-target="#deleteRevisionModal">
      Delete
    </button>

    <div class="modal fade" id ="deleteRevisionModal" role="dialog">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <div>
                    <h4 class="modal-title">Delete Revision?</h4>
                  </div>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                <p><label> Are you sure?</label></p>
              </div>
              <div class="modal-footer">
                  <button v-on:click="deleteRevision()" type="button" class="btn btn-primary" data-dismiss="modal" >Yes</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
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
  name: 'deleteRevision',
  data() {
    return {

    };
  },

  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },

  methods: {
    async deleteRevision() {
      const headers = { Authorization: this.token };

      try {
        const response = await HTTP.get(`/revisions/${this.$route.params.id}`, { headers });
        const id = response.data.sprint_id;

        await HTTP.delete(`/revisions/${this.$route.params.id}`, { headers });
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
