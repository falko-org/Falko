<template>
	<div class="delproject">
		<button type="button" class="btn btn-info btn-md falko-button-danger" id="deletebutton" data-toggle="modal" data-target="#closeIssueModal">
			Close
		</button>
    <div class="modal fade" id ="closeIssueModal" role="dialog">
			<div class="modal-dialog">
		    	<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title">Close Issue</h4>
								<button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
									<span aria-hidden="true">&times;</span>
								</button>
						</div>
						<div class=" row modal-body">
              <div class="col">
                <p><label>Number</label></p>
                <p><input type="date" v-model="number"></input><br></p>
              </div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" v-on:click="closeIssue()" data-dismiss="modal">Close</button>
							<button type="button" class="btn btn-secondary" data-dismiss="modal" >Exit</button>
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
      number: ''
    }
  },
  methods:{
  	closeIssue(){
      var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var header = { 'Authorization': tokenSimple2 };

      HTTP.delete(`/projects/${this.$route.params.id}/issues`, {
        issue: {
          number: this.number
        }
	    }, { headers: header })
			.then(response =>{
        this.number = "";
        // Go to the previous page
				this.$router.go(-1);
			})
			.catch(e =>{
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

</style>
