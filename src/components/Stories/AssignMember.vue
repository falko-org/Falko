<template>
	<div class="assign">
    <div >
      <i class="fa fa-address-book" aria-hidden="true" data-toggle="modal" :data-target='"#assignMemberModal"+issueNumber' @click="loadData">
      </i>
    </div>
    <div class="modal fade" :id='"assignMemberModal"+issueNumber' role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Assign Member</h4>
            <v-btn text icon 
                   type="button" 
                   class="close" 
                   data-dismiss="modal" 
                   aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </v-btn>
          </div>
          <div class="modal-body text-center">
            <div v-if="loading">
              Loading...
            </div>
         		<ul class="list-group" v-else>
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
            <v-btn  type="button" 
                    class="primary btn-md falko-button" 
                    v-on:click="assignMembers; cleanData" 
                    data-dismiss="modal" 
            >
              Save
            </v-btn>
            <v-btn  type="button" 
                    class="secondary btn-md falko-button-grey" 
                    v-on:click="cleanData" 
                    data-dismiss="modal" 
            >
              Close
            </v-btn>
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
      selected: [],
      issuesAssignees: [],
      loading: false,
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
        this.loading = true;

      	const headers = { Authorization: this.token };
        HTTP.get(`projects/${this.projectId}/contributors`, { headers })
        .then((response) => {
          this.contributors = response.data
          this.getIssues();
          this.loading = false;

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

    	HTTP.post(`projects/${this.projectId}/issues/assignees`, { assignees: this.selected, issue_number: this.issueNumber}, { headers })
    	.then((response) => {
    		console.log(response);
    	})
    	.catch((e) => {

    	});
    },
    getIssues() {  
      const headers = { Authorization: this.token };

      HTTP.get(`projects/${this.projectId}/issues`, { headers })
        .then((response) => {
          console.log(response.data.issues_infos);
          this.issuesAssignees = response.data.issues_infos;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    loadData() {
      this.getContributors();
    },
    cleanData() {
      this.contributors = [];
      this.selected = [];
      this.issuesAssignees = [];
      this.loading = false;
    }   
  },
	

}
</script>

<style scoped>
</style>