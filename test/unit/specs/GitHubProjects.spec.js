import Vue from 'vue';
import GitHubProjects from '../../../src/components/GitHub/GitHubProjects.vue'
import {HTTP} from '../../../src/http-common.js';
import sinon from 'sinon';
var sandbox = sinon.createSandbox();

describe('On github project list repos', function() {

	beforeEach(function() {
		const response = new Promise((r) => r({
			data: {
				user: ["userRepo1", "userRepo2"],
				orgs: [{name: "Org1", repos: ["Org1Repo"]},
					   {name: "Org2", repos: ["Org2Repo"]}]
			}
		}));

		sandbox.stub(HTTP, 'get').returns(response);
	})

	afterEach(function() {
		sandbox.restore();
	})

	it('should have the correct user repos and org repos', function(done) {
		var Constructor = Vue.extend(GitHubProjects);
		localStorage.setItem('token', "1234567890");
		var component = new Constructor();
		component.getRepos();
		process.nextTick(function() {
			expect(component.userRepos).to.deep.equal(["userRepo1", "userRepo2"]);
			expect(component.orgsRepos).to.deep.equal([{name: "Org1", repos: ["Org1Repo"]},
												  	   {name: "Org2", repos: ["Org2Repo"]}]);
			done();
		});
	})

	it('should not have the correct user repos', function(done) {
		var Constructor = Vue.extend(GitHubProjects);
		localStorage.setItem('token', "1234567890");
		var component = new Constructor().$mount();
		component.getRepos();

		process.nextTick(function() {
			expect(component.userRepos).to.deep.not.equal(["differentUserRepo1",
														   "differentUserRepo2"]);
			expect(component.orgsRepos).to.deep.equal([{name: "Org1", repos: ["Org1Repo"]},
												  	   {name: "Org2", repos: ["Org2Repo"]}]);
			done();
		});
	})


	it('should not have the correct user repos', function(done) {
		var Constructor = Vue.extend(GitHubProjects);
		localStorage.setItem('token', "1234567890");
		var component = new Constructor().$mount();
		component.getRepos();

		process.nextTick(function() {
			expect(component.userRepos).to.deep.equal(["userRepo1",
													   "userRepo2"]);
			expect(component.orgsRepos).to.deep.not.equal([{name: "differentOrg1", repos: ["differentOrg1Repo"]},
												  	   	   {name: "differentOrg2", repos: ["differentOrg2Repo"]}]);
			done();
		});
	})

	it('should not have the correct user repos and orgs repos', function(done) {
		var Constructor = Vue.extend(GitHubProjects);
		localStorage.setItem('token', "1234567890");
		var component = new Constructor().$mount();
		component.getRepos();

		process.nextTick(function() {
			expect(component.userRepos).to.deep.not.equal(["differentUserRepo1",
														   "differentUserRepo2"]);
			expect(component.orgsRepos).to.deep.not.equal([{name: "differentOrg1", repos: ["differentOrg1Repo"]},
												  	   	   {name: "differentOrg2", repos: ["differentOrg2Repo"]}]);
			done();
		})
	})
})

describe('On GitHubProjects import', function() {
	beforeEach(function() {
		const response = new Promise((resolve, reject) => resolve({
			data: {
				user: ["userRepo1", "userRep2"],
				orgs: [{name: "Org1", repos: ["Org1Repo"]},
					   {name: "Org2", repos: ["Org2Repo"]}]
			}
		}));
		sandbox.stub(HTTP, 'post').returns(response);
	})
	afterEach(function () {
		sandbox.restore();
	})
	it('should import projects', function(done) {

		localStorage.setItem('token', "1234567890");
		localStorage.setItem('user_id', "1");

		var Constructor = Vue.extend(GitHubProjects);
		var component = new Constructor();
		component.selectedRepos = ["repo1", "repo2"];
		var spy = sandbox.spy(component, '$emit');

		component.importGithubProjects();
		process.nextTick(function() {
			expect(spy.called).to.be.true;
			done();
		});
	})

	it('should not import projects', function(done) {
		const response_catch = new Promise((resolve, reject) => reject(new Error('Error no http')));
		sandbox.restore();

		sandbox.stub(HTTP, 'post').returns(response_catch);
		localStorage.setItem('token', "1234567890");
		localStorage.setItem('user_id', "1");

		var Constructor = Vue.extend(GitHubProjects);
		var component = new Constructor();
		component.selectedRepos = ["repo1", "repo2"];
		var spy = sandbox.spy(console, 'log');

		component.importGithubProjects();
		process.nextTick(function() {
			assert(spy.calledWith('Error no http'));
			done();
		});
	})
})
