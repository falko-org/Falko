<template>
	<div class="addgithubrepo">
		<div class="text-center">
			<button type="button" class="btn btn-info btn-md falko-button" id="addButton" data-toggle="modal" data-target="#githubModal">
				Import GitHub repository
			</button>
		</div>
		<div class="modal fade" id ="githubModal" role="dialog">
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
										 <toggle-button v-on:change="toggleButtonChanged(userRepo, $event)"
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
											 <toggle-button v-on:change="toggleButtonChanged(repo, $event)"
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
						<button type="button" class="btn btn-primary falko-button" v-on:click="importGithubProjects" data-dismiss="modal">Import</button>
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
				userRepos: [],
				orgsRepos: [],
				selectedRepos: []
			}
		},
		methods: {
			getRepos() {

	      var token = localStorage.getItem('token');
				var tokenSimple = token.replace(/"/, "");
				var tokenSimple2 = tokenSimple.replace(/"/, "");
				var headers = { 'Authorization':tokenSimple2 };

				HTTP.get("repos", { headers: headers })
				.then(response => {
					this.userRepos = response.data.user;
					this.orgsRepos = response.data.orgs;
				})
				.catch((e) => {
					this.errors.push(e);
				});
			},

			toggleButtonChanged(name, event) {
				console.log(name);
				console.log(event.value);
				if(event.value === true){
					this.selectedRepos.push(name);
				}
				else{
					this.selectedRepos = this.selectedRepos.filter(item => item !== name)
				}
				console.log(this.selectedRepos);
			},
			importGithubProjects() {
				doRequisitions(this.selectedRepos, this.selectedRepos.length)
				.then(() => console.log("deu bom"))
				.catch((e) => console.log(e));

			}
		},
		mounted () {
			this.getRepos();
		}
	}

	function doRequisitions(repos, length) {

		return new Promise(
			(resolve, reject) => {
				var token = localStorage.getItem('token');
				var user_id = localStorage.getItem('user_id');
				var user_int = parseInt(user_id);
				var tokenSimple = token.replace(/"/, "");
				var tokenSimple2 = tokenSimple.replace(/"/, "");
				var headers = { 'Authorization':tokenSimple2 };
				var count = 0;

				for(var repo of repos) {
					HTTP.post(`users/${user_int}/projects`, {
						name: repo,
						check_project: true
					}, {headers: headers})
					.then((response) => {
						count++;
						if (count === length) {
							resolve(response);
						}
					})
					.catch((e) => reject(e));
				}
			}
		)
	}

</script>

<style scoped>

.vue-js-switch {
	float: right;
}

</style>
