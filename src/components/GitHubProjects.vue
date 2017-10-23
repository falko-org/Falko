<template>
	<div class="addgithubrepo">
		<div class="text-center">
			<button type="button" class="btn btn-info btn-md falko-button" id="addButton" data-toggle="modal" data-target="#myModal">
				Import GitHub repository
			</button>
		</div>
		<div class="modal fade" id ="myModal" role="dialog">
			<div class="modal-dialog">
		    	<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Import GitHub Repository</h4>
							<button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
								<span aria-hidden="true">&times;</span>
							</button>
					</div>
					<div class="modal-body">						
						<div v-if="userRepos.length != 0">
							<h4 data-toggle="collapse" href="#userReposCollapse" aria-expanded="false" aria-controls="userReposCollapse" >User Repos</h4>
							<div class="collapse" id="userReposCollapse">
								<ul class="list-group">
									<li class="list-group-item" v-for="userRepo in userRepos" >
										 {{userRepo}} 
										 <toggle-button v-model="myDataVariable"
													    :value="false" 
													    color="#AEC3B0" 
													    :labels="true" />
									</li>
								</ul>
							</div>			
						</div>
						<div v-if="orgsRepos.length != 0">
							<div v-for="orgs in orgsRepos">
								<h4 
									data-toggle="collapse" 
									v-bind:href="'#'+orgs.name" 
									aria-expanded="false" 
									v-bind:aria-controls="orgs.name" >
									{{orgs.name}}
								</h4>
								<div class="collapse" v-bind:id="orgs.name">
									<ul class="list-group">
										<li class="list-group-item" v-for="repo in orgs.repos" >
											 {{repo}} 
											 <toggle-button v-model="myDataVariable"
														    :value="false" 
														    color="#AEC3B0" 
														    :labels="true" />
										</li>
									</ul>
								</div>
							</div>									
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary falko-button" v-on:click="importGithubProject" data-dismiss="modal">Import</button>
						<button type="button" class="btn btn-secondary" data-dismiss="modal" >Close</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { HTTP } from '../http-common.js';

	export default{
		data() {
			return {
				userRepos: ["/fulano/projeto1",
							"/fulano2/projeto2", 
							"/fulano3/projeto3"
				],
				orgsRepos: [{name: "ORG1", 
							repos: ["/fulano/projeto1",
									"/fulano2/projeto2", 
									"/fulano3/projeto3"]},
									 
							{name: "ORG2", 
						     repos: ["/fulano/projeto1",
									"/fulano2/projeto2", 
										"/fulano3/projeto3"]}]

			}
		},
		methods: {
			getRepos() {
				HTTP.get("/repos")
				.then(response => {
					this.userRepos = response.data.user;
					this.orgsRepos = response.data.orgs;
				})
				.catch((e) => {
					this.errors.push(e);
				});
			}
		},
		mounted () {
			this.getRepos();
		}	
	}
</script>

<style scoped>

.vue-js-switch {
	float: right;
}

</style>