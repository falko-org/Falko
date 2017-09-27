<template>	
	<div>
		<div class="row inproject">
			<div class="col-md-10">
				<div class="card">
					<div class="card-body">
						<div class="card-title">{{project.name}}</div>
						<div class="card-text">{{project.description}}</div>
					</div>
				</div>
				<DelProject></DelProject>
			</div>
		</div>
		
	</div>

</template>

<script>
import axios from 'axios';
import DeleteProject from '@/components/DeleteProject'
export default{
	name:'InProject',
	components: {
    'DelProject' : DeleteProject
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
		this.getProject();
	}
}
</script>

	
<style scoped>

</style>