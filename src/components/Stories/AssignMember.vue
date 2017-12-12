<template>
	<div class="assign">
    <div class="text-center">
      <button type="button" class="btn btn-info btn-md falko-button" id="addButton" data-toggle="modal" data-target="#assignMemberModal">
        Assigned Member
      </button>
    </div>
    <div class="modal fade" id ="assignMemberModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Assign Member</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
         		<ul class="list-group">
              <li class="list-group-item" v-for="contributor in contributors" >
                {{contributor}}
                <toggle-button class="pointer-cursor" 
                		v-on:change="toggleButtonChanged(contributor, $event)"
		                :value="false"
		                color="#AEC3B0"
		                :labels="true" />
              </li>
             </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info btn-md falko-button" v-on:click="assignMembers" data-dismiss="modal">Save</button>
            <button type="button" class="btn btn-info btn-md falko-button-grey" data-dismiss="modal" >Close</button>
          </div>
        </div>
      </div>
    </div>
  	</div>
</template>

<script>
import { mapState } from 'vuex';
import { HTTP } from '../../http-common';

export default {
	data() {
    return {
      contributors: [],
      selected: []
    };
  },
  props: ['issueNumber'],
  computed: {
    ...mapState({
      token: state => state.auth.token,
      projectId: state => state.clientStatus.projectId,
    }),
  },
  methods: { 
  	
  	getContributors() {
      	const headers = { Authorization: this.token };
        HTTP.get(`projects/${this.projectId}/contributors`, { headers })
        .then((response) => {
          this.contributors = response.data
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    toggleButtonChanged(name, event) {
      if (event.value === true) {
        this.selected.push(name);
      } else {
        this.selected = this.selected.filter(item => item !== name);
      }
    },
    assignMembers() {
    	const headers = { Authorization: this.token };
    	console.log(this.issueNumber)
    	HTTP.post(`projects/${this.projectId}/issues/assignees`, { assignees: this.selected, issue_number: this.issueNumber}, { headers })
    	.then((response) => {
    		console.log(response);
    	})
    	.catch((e) => {

    	});
    }
  },
	created() {
		this.getContributors();
	}  

}
</script>

<style scoped>
	
</style>