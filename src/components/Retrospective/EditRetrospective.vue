<template>
  <div>
    <div>
      <button type="button" class="btn btn-info btn-md falko-button" id="addButton"
              data-toggle="modal" data-target="#editRetrospectiveModal">
        Edit Retrospective
      </button>
    </div>

    <div class="row no-margin justify-content-center modal fade" id="editRetrospectiveModal">
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
            <button class="btn btn-info btn-md falko-button" v-on:click="editRetrospective()" data-dismiss="modal">Save</button>
            <button class="btn btn-info btn-md falko-button-grey" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from '@/components/Retrospective/List'
import {HTTP} from '../../http-common.js';


export default {
  components: {
    'list': List
  },

  data() {
    return {
      sprintReport: '',
      positivePoints: [],
      negativePoints: [],
      improvements: []
    }
  },

  methods: {
    editRetrospective() {
      var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var headers = { 'Authorization':tokenSimple2 };

      HTTP.patch(`retrospectives/${this.$route.params.id}`, {
        sprint_report: this.sprintReport,
        positive_points: this.positivePoints,
        negative_points: this.negativePoints,
        improvements: this.improvements
      }, { headers: headers })
      .then(() => {
        this.$emit('retrospectiveCreated')
      })
      .catch((e) => {
        this.errors.push(e)
      });
    },

    updateList (items, parent) {
      if (parent == "PositivePoints") {
        this.positivePoints = []
        for(var i = 0; i < items.length; i++) {
          this.positivePoints.push(items[i].title)
        }
      }

      else if (parent == "NegativePoints") {
        this.negativePoints = []
        for(var i = 0; i < items.length; i++) {
          this.negativePoints.push(items[i].title)
        }
      }

      else if (parent == "Improvements") {
        this.improvements = []
        for(var i = 0; i < items.length; i++) {
          this.improvements.push(items[i].title)
        }
      }
    }
  }
}
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
