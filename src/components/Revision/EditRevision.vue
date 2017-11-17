<template>
  <div>
    <div>
      <button type="button" class="btn btn-info btn-md falko-button" id="addButton"
              data-toggle="modal" data-target="#editRevisionModal">
        Edit Revision
      </button>
    </div>

    <div class="row no-margin justify-content-center modal fade" id="editRevisionModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">
              Add Sprint Revision
            </h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <listRevision parent="DoneReport" v-on:listUpdated="updateList"></listRevision>
            <listRevision parent="UndoneReport" v-on:listUpdated="updateList"></listRevision>
          </div>
          <div class="modal-footer">
            <button class="btn btn-info btn-md falko-button" v-on:click="editRevision()" data-dismiss="modal">Save</button>
            <button class="btn btn-info btn-md falko-button-grey" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListRevision from '@/components/Revision/ListRevision';
import { HTTP } from '../../http-common.js';


export default {
  components: {
    'listRevision': ListRevision
  },

  data() {
    return {
      doneReport: [],
      undoneReport: [],
    }
  },

  methods: {
    editRevision() {
      var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var headers = { 'Authorization':tokenSimple2 };

      HTTP.patch(`revisions/${this.$route.params.id}`, {
        done_report: this.doneReport,
        undone_report: this.undoneReport,
      }, { headers: headers })
      .then(() => {
        this.$emit('revisionCreated')
      })
      .catch((e) => {
        this.errors.push(e)
      });
    },

    updateList (items, parent) {
      if (parent == "DoneReport") {
        this.doneReport = []
        for(var i = 0; i < items.length; i++) {
          this.doneReport.push(items[i].title)
        }
      } else if (parent == "UndoneReport") {
        this.undoneReport = []
        for(var i = 0; i < items.length; i++) {
          this.undoneReport.push(items[i].title)
        }
      }
    }
  }
}
</script>

<style scoped>
input::placeholder {
  color: #777;
}
</style>
