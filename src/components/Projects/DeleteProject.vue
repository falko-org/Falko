<template>
  <div class="delproject">
    <v-btn  type="button" 
            class="danger falko-button-danger white--text" 
            data-toggle="modal" 
            data-target="#myModal"
    >
      Delete
    </v-btn>
    <div class="modal fade" id ="myModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <h4 class="modal-title">Delete Project?</h4>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p><label> Are you sure?</label></p>
          </div>
          <div class="modal-footer" id="deleteFooterModal">
            <v-btn  type="button" 
                    v-on:click="deleteProject" 
                    class="primary falko-button white--text" 
                    data-dismiss="modal" 
            >
              Yes
            </v-btn>
            <v-btn type="button" 
                   class="secondary falko-button white--text" 
                   data-dismiss="modal" 
            >
              No
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

export default {
  name: 'delproject',
  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },
  methods: {
    deleteProject() {
      const headers = { Authorization: this.token };

      HTTP.delete(`projects/${this.$route.params.id}`, { headers })
        .then(() => {
          this.$router.push({ path: '/projects' });
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>

<style scoped>

#noButton {
  background-color: #868e96;
}
</style>
