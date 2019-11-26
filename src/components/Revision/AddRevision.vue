<template>
  <div>
    <div>
      <button
        type="button"
        class="btn btn-info btn-md falko-button"
        id="addButton"
        data-toggle="modal"
        data-target="#addRevisionModal"
      >Add Revision</button>
    </div>

    <div class="row no-margin justify-content-center modal fade" id="addRevisionModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Add Sprint Revision</h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <listRevision parent="DoneReport" v-on:listUpdated="updateList"></listRevision>
            <listRevision parent="UndoneReport" v-on:listUpdated="updateList"></listRevision>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-info btn-md falko-button"
              v-bind:disabled="FieldsNotFilled"
              v-on:click="addRevision"
              data-dismiss="modal"
            >Save</button>
            <button class="btn btn-info btn-md falko-button-grey" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListRevision from "./ListRevision.vue";
import { HTTP as api } from "../../http-common";

export default {
  components: {
    listRevision: ListRevision
  },

  data() {
    return {
      doneReport: [],
      undoneReport: [],
      resivionId: ""
    };
  },

  computed: {
    ...mapState({
      token: state => state.auth.token
    }),

    FieldsNotFilled() {
      return this.undoneReport.length === 0 || this.doneReport.length === 0;
    }
  },

  methods: {
    async addRevision() {
      const headers = { Authorization: this.token };

      try {
        const response = await api.post(
          `sprints/${this.$route.params.id}/revisions`,
          {
            done_report: this.doneReport,
            undone_report: this.undoneReport
          },
          { headers }
        );
        this.$emit("revisionCreated");
        this.revisionId = response.data.id;
        this.$router.push({ path: `/revisions/${this.revisionId}` });
      } catch (err) {
        this.errors.push(err);
      }
    },

    updateList(items, parent) {
      if (parent === "DoneReport") {
        this.doneReport = [];
        for (let i = 0; i < items.length; i += 1) {
          this.doneReport.push(items[i].title);
        }
      } else if (parent === "UndoneReport") {
        this.undoneReport = [];
        for (let i = 0; i < items.length; i += 1) {
          this.undoneReport.push(items[i].title);
        }
      }
    }
  }
};
</script>

<style scoped>
input::placeholder {
  color: #777;
}
</style>
