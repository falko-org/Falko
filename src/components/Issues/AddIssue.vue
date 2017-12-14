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
                <p><input type="text" v-model="name" id="issueName" placeholder="Issue Title" name="name" v-validate="'required'">
									<p class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
								</input><br></p>
                <p><label>Body</label></p>
                <input type="text" v-model="body" placeholder="Issue Body..." name="body" v-validate="'required'">
								<p class="text-danger" v-if="errors.has('body')">{{ errors.first('body') }}</p>
							</input><br>
              </div>
						</div>
						<div class="modal-footer">
							<button type="button" :disabled="errors.has('name') || errors.has('body')" class="btn btn-primary" v-on:click="addIssue()" data-dismiss="modal">Save</button>
							<button type="button" class="btn btn-secondary" data-dismiss="modal" >Close</button>
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
      body : ''
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
