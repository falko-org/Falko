<template>
  <div class = "editSprintBody">
    <button type="button" class="btn btn-info btn-md falko-button" id="editbutton" data-toggle="modal" data-target="#editSprintModal">
      Edit
    </button>

    <div class="modal fade" id ="editSprintModal" role="dialog">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                  </button>
                <h4 class="modal-title">Edit Sprint</h4>
              </div>
              <div class="modal-body">
                <p><label > Name </label></p>
                <p><input type = "text" v-model="name"></input><br></p>
                <p><label> Description </label></p>
                <input type = "text" v-model="description"></input><br>
                <p><label>Inital Date</label></p>
                <input type = "date" v-model="initialDate"></input><br>
                <p><label>Final Date</label></p>
                <input type = "date" v-model="finalDate"></input><br>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" v-on:click="editSprint" data-dismiss="modal">Save</button>
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
  import { mapState } from 'vuex';

	export default {
		name: 'editSprintBody',
		data() {
			return {
				name: "",
				description: "",
        initialDate: '',
        finalDate: '',
			}
		},
    computed: {
      ...mapState({
        token: state => state.auth.token,
      })
    },
		methods: {
			editSprint(){
        var headers = { 'Authorization':this.token };

				HTTP.put("sprints/"+this.$route.params.id, {
					name: this.name,
					description: this.description,
          initial_date: this.initialDate,
          final_date: this.finalDate,
				}, { headers })
				.then(response=>{
					EventBus.$emit('edited-sprint', this.$route.params.id)
				})
				.catch(e=>{
					this.errors.push(e)
				});
			}
		}
	}
</script>

<style scoped>
</style>
