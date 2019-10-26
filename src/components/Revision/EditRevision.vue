<template>
  <div>
    <div>
      <v-btn type="button" 
             class="primary falko-button" 
             id="addButton"
             data-toggle="modal" 
             data-target="#editRevisionModal"
      >
        Edit Revision
      </v-btn>
    </div>

    <div class="row no-margin justify-content-center modal fade" id="editRevisionModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">
              Add Sprint Revision
            </h3>
            <v-btn type="button" 
                   class="close" 
                   data-dismiss="modal" 
                   aria-label="Fechar"
            >
              <span aria-hidden="true">&times;</span>
            </v-btn>
          </div>
          <div class="modal-body">
            <list-revision parent="DoneReport" v-on:listUpdated="updateList"></list-revision>
            <list-revision parent="UndoneReport" v-on:listUpdated="updateList"></list-revision>
          </div>
          <div class="modal-footer">
            <v-btn class="primary falko-button" 
                   v-on:click="editRevision()" 
                   data-dismiss="modal"
            >
              Save
            </v-btn>
            <v-btn class="secondary falko-button-grey" 
                   data-dismiss="modal"
            >
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
    'list-revision': ListRevision,
  },

  data() {
    return {
      doneReport: [],
      undoneReport: [],
    };
  },

  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },

  methods: {
    editRevision() {
      const headers = { Authorization: this.token };

      HTTP.patch(`revisions/${this.$route.params.id}`, {
        done_report: this.doneReport,
        undone_report: this.undoneReport,
      }, { headers })
        .then(() => {
          this.$emit('revisionCreated');
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
