<template>	
	<div>
		<div class="row inproject">
			<div class="col-md-10">
				<div class="card aproject">
					<div class="card-body ">
						<div class="card-title">{{project.name}}</div>
						<div class="card-text">{{project.description}}</div>
					</div>
				</div>
				<DelProject></DelProject>
				<EditProject></EditProject>
			</div>
		</div>
		
	</div>

</template>

<script>
import { EventBus } from '../event-bus.js';
import axios from 'axios';
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
			axios.get("http://localhost:3000/projects/" + this.$route.params.id)
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
	      axios.get("http://localhost:3000/projects/" + id)
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

.aproject{
	position: relative;
	left: 5em;
	text-align: center;
}

</style>