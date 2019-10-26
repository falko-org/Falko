<template>
	<div class="">
		<div class="text-center">
			<v-btn 	type="button" 
					class="primary falko-button white--text" 
					data-toggle="modal" 
					data-target="#addIssueModal"
			>
				Add Issue
			</v-btn>
		</div>

		<div class="modal fade" id ="addIssueModal" role="dialog">
			<div class="modal-dialog">
		    	<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title">Add Issue</h4>
								<v-btn text icon type="button" class="close" data-dismiss="modal" aria-label="Close">
              						<span aria-hidden="true">&times;</span>
            					</v-btn>
						</div>
						<div class=" row modal-body">
              <div class="col">
				<v-text-field
					label="Name"
					v-model="name"
					:rules="[rules.required]"
				></v-text-field>
				<p class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
				<br>
				
				<v-textarea
					name="input-7-4"
					v-model="body"
					label="Issue Body"
					rows="2"
					row-height="20"
					:rules="[rules.required]"
				></v-textarea>
				<p class="text-danger" v-if="errors.has('body')">{{ errors.first('body') }}</p>
				<br>
              </div>
						</div>
						<div class="modal-footer">
							<v-btn 	type="button" 
									:disabled="errors.has('name') || errors.has('body')" 
									class="primary falko-button white--text" 
									v-on:click="addIssue()" 
									data-dismiss="modal" 
									id="saveButton"
							>
								Save
							</v-btn>
							<v-btn	type="button" 
									class="secondary falko-button white--text" 
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
import { EventBus } from '../../event-bus.js';
import { HTTP } from '../../http-common.js';
import { mapState } from 'vuex';

export default {
  data () {
    return {
      name: '',
	  body : '',
	  rules: {
        required: value => !!value || 'Required.',
      }
    }
	},

	computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
	},

	methods: {
  	addIssue() {
			const headers = { Authorization: this.token };

      HTTP.post(`/projects/${this.$route.params.id}/issues`,  {
        issue: {
          name: this.name,
          body: this.body
        }
	    }, { headers })
	    .then(response => {
	    	this.name = "";
	    	this.body = "";
        this.$emit('added');
				this.$parent.getIssues();
	    })
	    .catch(e => {
	      this.errors.push(e)
	    });
		}
  }

}
</script>

<style scoped>

#issueName {
  color: #777;
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
