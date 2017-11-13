<template>
  <div class="edit-sprint">
    <button type="button" class="btn btn-info btn-sm falko-button" id="editIssue" data-toggle="modal" v-bind:data-target="`#editIssueModal${selected_issue.number}`" v-on:click="getIssuesInformation()">
      Edit
    </button>

    <div class="modal fade" v-bind:id="`editIssueModal${selected_issue.number}`" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit Issue</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body row">
            <div class="col">
              <p><label> Name </label></p>
              <input type = "text" v-model="name" placeholder="Name"></input><br>
              <p><label> Description </label></p>
              <input type = "text" v-model="body" placeholder="Description"></input><br>
            </div>
            <div class="col">
              <p><label> Assignees </label></p>
              <div class="col" id="colContribs">
                <label class="custom-control custom-checkbox" v-for="contributor in contributors">
                  <input type="checkbox" class="custom-control-input">
                    <span class="custom-control-indicator"></span>
                    <span class="custom-control-description">{{contributor}}</span>
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info btn-md falko-button" v-on:click="editIssue()" data-dismiss="modal">Save</button>
            <button type="button" class="btn btn-info btn-md falko-button-grey" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {HTTP} from '../../http-common.js';
export default {
  data () {
    return {
      name: "",
      body: "",
      number: "",
      contributors: []
    }
  },

  props: ["selected_issue"],

  methods: {

    getContributors() {
      var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var header = { 'Authorization': tokenSimple2 };

      HTTP.get(`projects/${this.$route.params.id}/contributors`, { headers: header })
        .then((response) => {
          this.contributors = response.data
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    editIssue() {

      var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var headers = { 'Authorization': tokenSimple2 };

      HTTP.put(`projects/${this.$route.params.id}/issues`, {
        issue: {
          number: this.number,
          name: this.name,
          body: this.body
        }
      }, { headers: headers })
      .then((response)=>{
        this.$emit('updated-issue', this.$route.params.id);
        this.$parent.getIssues();
      })
      .catch(e=>{
        this.errors.push(e)
      });
    },

    getIssuesInformation() {
      this.name = this.selected_issue.name,
      this.body = this.selected_issue.body,
      this.number = this.selected_issue.number
    }
  },

  mounted() {
    this.getContributors();
  }
}

</script>

<style scoped>
#colContribs {
  width: 90px;

}
</style>
