import Vue from 'vue';
import GitHubProjects from '../../../src/components/GitHubProjects.vue'
import {HTTP} from '../../../src/http-common.js';
import sinon from 'sinon';

describe('On github project 1', function() {
	it('should have the correct user repos and org repos', function(done) {
		const response = new Promise((r) => r({
			data: {
				user: ["userRepo1", "userRepo2"],
				orgs: [{name: "Org1", repos: ["Org1Repo"]},
					   {name: "Org2", repos: ["Org2Repo"]}]
			}
		}));

		sinon.stub(HTTP, 'get').returns(response);

		var Constructor = Vue.extend(GitHubProjects);
		localStorage.setItem('token', "1234567890");
		var component = new Constructor().$mount();

		process.nextTick(function() {
			expect(component.userRepos).to.deep.equal(["userRepo1", "userRepo2"]);
			expect(component.orgsRepos).to.deep.equal([{name: "Org1", repos: ["Org1Repo"]},
												  	   {name: "Org2", repos: ["Org2Repo"]}]);
			
			HTTP.get.restore();
			done();
		});
	})
})

describe('On github project 2', function() {
	it('should not have the correct user repos', function(done) {
		const response = new Promise((r) => r({
			data: {
				user: ["userRepo1", "userRepo2"],
				orgs: [{name: "Org1", repos: ["Org1Repo"]},
					   {name: "Org2", repos: ["Org2Repo"]}]
			}
		}));

		sinon.stub(HTTP, 'get').returns(response);
		var Constructor = Vue.extend(GitHubProjects);
		localStorage.setItem('token', "1234567890");
		var component = new Constructor().$mount();

		process.nextTick(function() {
			expect(component.userRepos).to.deep.not.equal(["differentUserRepo1", 
														   "differentUserRepo2"]);
			expect(component.orgsRepos).to.deep.equal([{name: "Org1", repos: ["Org1Repo"]},
												  	   {name: "Org2", repos: ["Org2Repo"]}]);
			
			HTTP.get.restore();
			done();
		});
	})
})

describe('On github project 3', function() {
	it('should not have the correct user repos', function(done) {
		const response = new Promise((r) => r({
			data: {
				user: ["userRepo1", "userRepo2"],
				orgs: [{name: "Org1", repos: ["Org1Repo"]},
					   {name: "Org2", repos: ["Org2Repo"]}]
			}
		}));

		sinon.stub(HTTP, 'get').returns(response);
		var Constructor = Vue.extend(GitHubProjects);
		localStorage.setItem('token', "1234567890");
		var component = new Constructor().$mount();

		process.nextTick(function() {
			expect(component.userRepos).to.deep.equal(["userRepo1", 
													   "userRepo2"]);
			expect(component.orgsRepos).to.deep.not.equal([{name: "differentOrg1", repos: ["differentOrg1Repo"]},
												  	   	   {name: "differentOrg2", repos: ["differentOrg2Repo"]}]);
			
			HTTP.get.restore();
			done();
		});
	})
})

describe('On github project 4', function() {
	it('should not have the correct user repos and orgs repos', function(done) {
		const response = new Promise((r) => r({
			data: {
				user: ["userRepo1", "userRepo2"],
				orgs: [{name: "Org1", repos: ["Org1Repo"]},
					   {name: "Org2", repos: ["Org2Repo"]}]
			}
		}));

		sinon.stub(HTTP, 'get').returns(response);
		var Constructor = Vue.extend(GitHubProjects);
		localStorage.setItem('token', "1234567890");
		var component = new Constructor().$mount();

		process.nextTick(function() {
			expect(component.userRepos).to.deep.not.equal(["differentUserRepo1", 
														   "differentUserRepo2"]);
			expect(component.orgsRepos).to.deep.not.equal([{name: "differentOrg1", repos: ["differentOrg1Repo"]},
												  	   	   {name: "differentOrg2", repos: ["differentOrg2Repo"]}]);
			
			HTTP.get.restore();
			done();
		})
	})
})
