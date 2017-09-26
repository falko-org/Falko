<template>	
	<div class="container">
		<div class="row inproject">
			<div class="card">
				<div class="card-body">
					<div class="card-title">{{project.name}}</div>
						<div class="card-text">{{project.description}}</div>
				</div>
				{{$route.params.id}}
			</div>
		</div>
		<div class="container">

			<DelProject></DelProject>
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
.inproject{
	margin: 30em 0 0 0;
	text-align: center;
}

</style>