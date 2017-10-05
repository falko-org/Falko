<template>	
	<div>
		<div class="row inproject">
			<div class="col-md-10">
				<div class="card aproject">
					<div class="card-body ">
						<h4 class="card-title">{{project.name}}</h4>
						<p class="card-text text-muted">{{project.description}}</p>
					</div>
				</div>
			</div>
		</div>
        <div class="row justify-content-center" id="buttons">
					<div class="col-md-2">
          	<EditProject></EditProject>
					</div>
					<div class="col-md-2">
				  	<DelProject></DelProject>
					</div>
        </div>
	</div>
</template>

<script>
import { EventBus } from '../event-bus.js';
import {HTTP} from '../http-common.js';
import DeleteProject from '@/components/DeleteProject'
import EditProject from '@/components/EditProject'

export default{
	name:'InProject',
	components: {
    'DelProject' : DeleteProject,
    'EditProject' : EditProject
  },
	data(){
		return{
			project: {}
		}
	},
	methods: {
		getProject(){
			HTTP.get("projects/" + this.$route.params.id)
			.then(response =>{
				this.project = response.data
			})
			.catch(e =>{
				this.errors.push(e)
			});
		}
	},
	mounted(){
		var _this = this
	    EventBus.$on('edited-project', function (id) {
	      HTTP.get("projects/" + id)
			.then(response =>{
				console.log("escutooou" + id)
				_this.project = response.data
			})
			.catch(e =>{
				this.errors.push(e)
			});
	    });
		
		this.getProject();
		
	}
}
</script>

	
<style scoped>
#buttons {
	margin-top: 1em;
}

.aproject{
	position: relative;
	left: 5em;
	text-align: center;
}
</style>