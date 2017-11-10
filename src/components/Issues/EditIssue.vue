<template>
  <div class="edit-sprint">
    <button type="button" class="btn btn-info btn-md falko-button" id="editIssue" data-toggle="modal" data-target="#editIssueModal" v-on:click="choseIssue()">
      Editar Issue
    </button>

    <div class="modal fade" id="editIssueModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit Issue</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            <p><label > Name </label></p>
            <p><input type = "text" v-model="name" v-bind:placeholder="selected_issue.name"></input><br></p>
            <p><label> Description </label></p>
            <input type = "text" v-model="body" v-bind:placeholder="selected_issue.body"></input><br>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info btn-md falko-button" v-on:click="editIssue(), reload()" data-dismiss="modal">Save</button>
            <button type="button" class="btn btn-info btn-md falko-button-grey" data-dismiss="modal" >Close</button>
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
    }
  },

  props: ["selected_issue"],

  methods: {
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
        this.reload();
      })
      .catch(e=>{
        this.errors.push(e)
      });
    },

    choseIssue() {
      this.name = this.selected_issue.name,
      this.body = this.selected_issue.body,
      this.number = this.selected_issue.number
    },

    reload() {
      this.$parent.getIssues();
    }
  }
}

</script>

<style scoped>
</style>
