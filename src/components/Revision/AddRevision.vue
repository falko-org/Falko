<template>
  <div>
    <div>
      <button type="button" class="btn btn-info btn-md falko-button" id="addButton"
              data-toggle="modal" data-target="#addRevisionModal">
        Add Revision
      </button>
    </div>

    <div class="row no-margin justify-content-center modal fade" id="addRevisionModal">
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
            <list parent="DoneReport" v-on:listUpdated="updateList"></list>
            <list parent="UndoneReport" v-on:listUpdated="updateList"></list>
          </div>
          <div class="modal-footer">
            <button class="btn btn-info btn-md falko-button"
                    v-bind:disabled="FieldsNotFilled" v-on:click="addRevision"
                    data-dismiss="modal"
            >
              Save
            </button>
            <button class="btn btn-info btn-md falko-button-grey" data-dismiss="modal">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from '@/components/Revision/List'
import {HTTP} from '../../http-common.js';

export default {
  components: {
    'list': List
  },

  data() {
    return {
      doneReport: [],
      undoneReport: [],
      resivionId: '',
    }
  },

  methods: {
    addRevision() {
			var token = localStorage.getItem('token');
			var tokenSimple = token.replace(/"/, "");
			var tokenSimple2 = tokenSimple.replace(/"/, "");
			var headers = { 'Authorization': tokenSimple2 };

      HTTP.post(`sprints/${this.$route.params.id}/revisions`, {
        done_report: this.doneReport,
        undone_report: this.undoneReport,
      }, { headers: headers })
        .then((response) => {
          this.$emit('revisionCreated')
          this.revisionId = response.data.id
          this.$router.push({ path: `/revisions/${this.revisionId}`});
        })
        .catch((e) => {
          this.errors.push(e)
        });
    },

    updateList(items, parent) {
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
  },

  computed: {
    FieldsNotFilled() {
      return this.undoneReport.length == 0 ||
             this.doneReport.length == 0
    }
  }
}
</script>

<style scoped>
input::placeholder {
  color: #777;
}
</style>
