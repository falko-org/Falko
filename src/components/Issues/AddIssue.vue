<template>
	<div class="">
		<div class="text-center">
			<button type="button" class="btn btn-info btn-md falko-button" id="addButton" data-toggle="modal" data-target="#addIssueModal">
				Add Issue
			</button>
		</div>

		<div class="modal fade" id ="addIssueModal" role="dialog">
			<div class="modal-dialog">
		    	<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title">Add Issue</h4>
								<button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
									<span aria-hidden="true">&times;</span>
								</button>
						</div>
						<div class=" row modal-body">
              <div class="col">
                <p><label>Name</label></p>
                <p><input type="text" v-model="name" id="issueName" placeholder="Issue Title"></input><br></p>
                <p><label>Body</label></p>
                <input type="text" v-model="body" placeholder="Issue Body..."></input><br>
              </div>
              <div class="col">
                <p><label>Assignee</label></p>
                <p><input type="text" v-model="assignee"></input><br></p>
                <p><label>Label</label></p>
                <p><input type="text" v-model="labels"></input><br></p>
              </div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" v-on:click="addIssue(), reload()" data-dismiss="modal">Save</button>
							<button type="button" class="btn btn-secondary" data-dismiss="modal" >Close</button>
						</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { EventBus } from '../../event-bus.js';
import {HTTP} from '../../http-common.js';

export default {
  data () {
    return {
      name: '',
      body : '',
      assignee: '',
      labels: ''
    }
  },
  methods: {

  	addIssue() {
      var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var header = { 'Authorization': tokenSimple2 };

      HTTP.post(`/projects/${this.$route.params.id}/issues`,  {
        issue: {
          name: this.name,
          body: this.body,
          assignee: this.assignee,
          labels: this.labels
        }
	    }, { headers: header })
	    .then(response => {
	    	this.name = "";
	    	this.body = "";
        this.assignee = "";
        this.labels = "";
        this.$emit('added');
	    })
	    .catch(e => {
	      this.errors.push(e)
	    });
	},

  reload() {
    this.$parent.getIssues();
  }

  }

}
</script>

<style scoped>
#issueName {
  color: #777;
}

#addButton {
	margin-top: 2em;
}

.modal-body{
  position: relative;
  top: 5px;
}

p {
	margin-bottom: 0.5em;
}

label {
	margin-bottom: 0em;
}
</style>
