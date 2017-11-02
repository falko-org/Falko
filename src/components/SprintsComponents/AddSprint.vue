<template>
	<div class="addsprintBody">
		<div class="text-center">
			<button type="button" class="btn btn-info btn-md falko-button" id="addButton" data-toggle="modal" data-target="#addSprintModal">
				Add a Sprint
			</button>
		</div>

		<div class="modal fade" id ="addSprintModal" role="dialog">
			<div class="modal-dialog">
		    	<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title">Add a Sprint</h4>
								<button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
									<span aria-hidden="true">&times;</span>
								</button>
						</div>
						<div class="modal-body">
							<p><label>Name</label></p>
							<p><input type = "text" v-model="name"></input><br></p>
							<p><label>Description</label></p>
							<input type = "text" v-model="description"></input><br>
							<p><label>Start Date</label></p>
							<input type = "date" v-model="startDate"></input><br>
							<p><label>End Date</label></p>
							<input type = "date" v-model="endDate"></input><br>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" v-on:click="addSprint" data-dismiss="modal">Save</button>
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
import AddProject from '@/components/AddProject';

export default {
  name: 'addSprintBody',
  data () {
    return {
      name: '',
      description : '',
			startDate : '',
			endDate : ''
    }
  },
  methods: {
  	addSprint() {

			var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var headers = { 'Authorization':tokenSimple2 };


				HTTP.post(`releases/${this.$route.params.id}/sprints`, { sprint: {
				    name: this.name,
				    description: this.description,
				    start_date: this.startDate,
				    end_date: this.endDate
				  }
				  }, { headers: headers })
				    .then(response => {
				      this.name = "";
				      this.description = "";
				      this.startDate = "";
				      this.endDate = "";
				      this.id = "";
				      EventBus.$emit('added-sprint', 1)
				  })
				    .catch(e => {
				      this.errors.push(e)
				  });
		}
  }

}
</script>

<style scoped>
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
