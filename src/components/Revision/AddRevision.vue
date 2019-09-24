<template>
  <div>
    <div>
      <v-btn type="button" class="info falko-button white--text" id="addButton"
        data-toggle="modal" data-target="#addRevisionModal" color="#86B1B1">
        Add Revision
      </v-btn>
    </div>

    <div class = "modal fade" id="addRevisionModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">
              Add Sprint Revision
            </h3>
            <v-btn text icon type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </v-btn>
          </div>
          <div class="modal-body">
            <listRevision parent="DoneReport" v-on:listUpdated="updateList"></listRevision>
            <listRevision parent="UndoneReport" v-on:listUpdated="updateList"></listRevision>
          </div>
          <div class="modal-footer">
            <v-btn class="info btn-md falko-button"
                    v-bind:disabled="FieldsNotFilled" v-on:click="addRevision"
                    data-dismiss="modal"
            >
              Save
            </v-btn>
            <v-btn class="info falko-button-grey" data-dismiss="modal" color="#868e96">
              Cancel
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ListRevision from './ListRevision.vue';
import { HTTP } from '../../http-common';

export default {
  components: {
    listRevision: ListRevision,
  },

  data() {
    return {
      doneReport: [],
      undoneReport: [],
      resivionId: '',
    };
  },

  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),

    FieldsNotFilled() {
      return this.undoneReport.length === 0 || this.doneReport.length === 0;
    },
  },

  methods: {
    addRevision() {
      const headers = { Authorization: this.token };

      HTTP.post(`sprints/${this.$route.params.id}/revisions`, {
        done_report: this.doneReport,
        undone_report: this.undoneReport,
      }, { headers })
        .then((response) => {
          this.$emit('revisionCreated');
          this.revisionId = response.data.id;
          this.$router.push({ path: `/revisions/${this.revisionId}` });
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    updateList(items, parent) {
      if (parent === 'DoneReport') {
        this.doneReport = [];
        for (let i = 0; i < items.length; i += 1) {
          this.doneReport.push(items[i].title);
        }
      } else if (parent === 'UndoneReport') {
        this.undoneReport = [];
        for (let i = 0; i < items.length; i += 1) {
          this.undoneReport.push(items[i].title);
        }
      }
    },
  },
};
</script>

<style scoped>
input::placeholder {
  color: #777;
}
</style>
