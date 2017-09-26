<template>	
	<div class="container">
		<div class="row inproject">
			<div class="card">
				<div class="card-body">
					<div class="card-title">{{project.name}}</div>
						<div class="card-text">{{project.description}}</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
export default{
	name:'InProject',
	data(){
		return{
			project: []
		}
	}
}
</script>
	
<style scoped>
.inproject{
	margin: 30em 0 0 0;
	text-align: center;
}

</style>