<template>
<div class="edit-sprint">
  <button type="button" class="btn btn-info btn-md falko-button" id="editIssue" data-toggle="modal" data-target="#editIssueModal">
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
              <p><label > {{selected_issue}} </label></p>
              <p><input type = "text" v-model="name"></input><br></p>
              <p><label> Description </label></p>
              <input type = "text" v-model="body"></input><br>
              <p><label> Assignee </label></p>
              <input type = "text" v-model="assignee"></input><br>
              <p><label> Labels </label></p>
              <input type = "text" v-model="labels"></input><br>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-info btn-md falko-button" data-dismiss="modal">Save</button>
              <button type="button" class="btn btn-info btn-md falko-button-grey" data-dismiss="modal" >Close</button>
            </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  data () {
    return {
      name: '',
      body : '',
      assignee: '',
      labels: ''
    }
  },

  props: ["selected_issue"],

  methods: {
    getIssueParams(){
      console.log(selected_issue.name);
      this.name = selected_issue.name;
    },
    created(){
      this.getIssueParams();
    },
  },
}

</script>

<style scoped>
</style>
