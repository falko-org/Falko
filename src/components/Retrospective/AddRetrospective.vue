<template>
  <div>
    <div>
      <button type="button" class="btn btn-info btn-md falko-button" id="addButton"
      data-toggle="modal" data-target="#addRetrospectiveModal">
      Add Retrospective
      </button>
    </div>

    <div class="row no-margin justify-content-center modal fade" id="addRetrospectiveModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">
              Add Sprint Retrospective
            </h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <list parent="PositivePoints" v-on:listUpdated="updateList"></list>
            <list parent="NegativePoints" v-on:listUpdated="updateList"></list>
            <list parent="Improvements" v-on:listUpdated="updateList"></list>
            <textarea class="text-justify"
            placeholder="Input your sprint report..."
            v-model="sprintReport"
            />
          </div>
          <div class="modal-footer">
            <button class="btn btn-info btn-md falko-button"
            v-bind:disabled="FieldsNotFilled" v-on:click="addRetrospective"
            data-dismiss="modal"
            >
            Save
          </button>
          <button class="btn btn-info btn-md falko-button-grey" data-dismiss="modal">
            Cancel
          </button>
        </div>
        <div class="row no-margin justify-content-center modal fade" id="addRetrospectiveModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h3 class="modal-title">
                  Add Sprint Retrospective
                </h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <list parent="PositivePoints" v-on:listUpdated="updateList"></list>
                <list parent="NegativePoints" v-on:listUpdated="updateList"></list>
                <list parent="Improvements" v-on:listUpdated="updateList"></list>
                <textarea class="text-justify"
                placeholder="Input your sprint report..."
                v-model="sprintReport"
                />
              </div>
              <div class="modal-footer">
                <button class="btn btn-info btn-md falko-button"
                v-bind:disabled="FieldsNotFilled" v-on:click="addRetrospective"
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import List from './List.vue';
import { HTTP } from '../../http-common';

export default {
  components: {
    list: List,
  },

  data() {
    return {
      sprintReport: '',
      positivePoints: [],
      negativePoints: [],
      improvements: [],
      retrospectiveId: '',
    };
  },

  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),

    FieldsNotFilled() {
      return this.positivePoints.length === 0 ||
      this.negativePoints.length === 0 ||
      this.improvements.length === 0;
    },
  },

  methods: {
    addRetrospective() {
      const headers = { Authorization: this.token };

      HTTP.post(`sprints/${this.$route.params.id}/retrospectives`, {
        sprint_report: this.sprintReport,
        positive_points: this.positivePoints,
        negative_points: this.negativePoints,
        improvements: this.improvements,
      }, { headers })
        .then((response) => {
          this.$emit('retrospectiveCreated');
          this.retrospectiveId = response.data.id;

          this.$router.push({ path: `/retrospectives/${this.retrospectiveId}` });
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    updateList(items, parent) {
      if (parent === 'PositivePoints') {
        this.positivePoints = [];
        for (let i = 0; i < items.length; i += 1) {
          this.positivePoints.push(items[i].title);
        }
      } else if (parent === 'NegativePoints') {
        this.negativePoints = [];
        for (let i = 0; i < items.length; i += 1) {
          this.negativePoints.push(items[i].title);
        }
      } else if (parent === 'Improvements') {
        this.improvements = [];
        for (let i = 0; i < items.length; i += 1) {
          this.improvements.push(items[i].title);
        }
      }
    },
  },
};
</script>

<style scoped>

textarea {
  width: 100%;
  height: 15em;
  padding: 1em;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.25);
  color: #444;
}

input::placeholder {
  color: #777;
}

</style>
