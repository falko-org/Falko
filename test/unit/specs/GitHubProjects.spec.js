import Vue from 'vue';
import Vuex from 'vuex';
import GitHubProjects from '../../../src/components/GitHub/GitHubProjects.vue';
import { HTTP } from '../../../src/http-common.js';
import sinon from 'sinon';
import auth from '../../../src/services/auth/index';

const sandbox = sinon.createSandbox();

describe('On github project list repos', () => {
  let state;
  let store;
  beforeEach(() => {
    Vue.use(Vuex);
    const response = new Promise(r => r({
      data: {
        user: [{ login: 'pedrokelvin' }, { repos: ['userRepo1', 'userRepo2'] }],
        orgs: [{ name: 'Org1', repos: ['Org1Repo'] },
          { name: 'Org2', repos: ['Org2Repo'] }],
      },
    }));

    sandbox.stub(HTTP, 'get').returns(response);

    state = {
      auth: {
        token: '12345',
      },
    };
    store = new Vuex.Store({
      state,
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should have the correct user repos and org repos', (done) => {
    const Constructor = Vue.extend(GitHubProjects);
    const component = new Constructor({ store });
    component.getRepos();
    process.nextTick(() => {
      console.log(component.userRepos);
      expect(component.userRepos).to.deep.equal([{ login: 'pedrokelvin' }, { repos: ['userRepo1', 'userRepo2'] }]);
      expect(component.orgsRepos).to.deep.equal([{ name: 'Org1', repos: ['Org1Repo'] },
        { name: 'Org2', repos: ['Org2Repo'] }]);
      done();
    });
  });

  it('should not have the correct user repos', (done) => {
    const Constructor = Vue.extend(GitHubProjects);
    localStorage.setItem('token', '1234567890');
    const component = new Constructor().$mount();
    component.getRepos();

    process.nextTick(() => {
      expect(component.userRepos).to.deep.not.equal(['differentUserRepo1',
        'differentUserRepo2']);
      expect(component.orgsRepos).to.deep.equal([{ name: 'Org1', repos: ['Org1Repo'] },
        { name: 'Org2', repos: ['Org2Repo'] }]);
      done();
    });
  });


  it('should not have the correct user repos', (done) => {
    const Constructor = Vue.extend(GitHubProjects);
    localStorage.setItem('token', '1234567890');
    const component = new Constructor().$mount();
    component.getRepos();

    process.nextTick(() => {
      expect(component.userRepos).to.deep.equal(['userRepo1',
        'userRepo2']);
      expect(component.orgsRepos).to.deep.not.equal([{ name: 'differentOrg1', repos: ['differentOrg1Repo'] },
        { name: 'differentOrg2', repos: ['differentOrg2Repo'] }]);
      done();
    });
  });

  it('should not have the correct user repos and orgs repos', (done) => {
    const Constructor = Vue.extend(GitHubProjects);
    localStorage.setItem('token', '1234567890');
    const component = new Constructor().$mount();
    component.getRepos();

    process.nextTick(() => {
      expect(component.userRepos).to.deep.not.equal(['differentUserRepo1',
        'differentUserRepo2']);
      expect(component.orgsRepos).to.deep.not.equal([{ name: 'differentOrg1', repos: ['differentOrg1Repo'] },
        { name: 'differentOrg2', repos: ['differentOrg2Repo'] }]);
      done();
    });
  });
});

describe('On GitHubProjects import', () => {
  beforeEach(() => {
    const response = new Promise((resolve, reject) => resolve({
      data: {
        user: ['userRepo1', 'userRep2'],
        orgs: [{ name: 'Org1', repos: ['Org1Repo'] },
          { name: 'Org2', repos: ['Org2Repo'] }],
      },
    }));
    sandbox.stub(HTTP, 'post').returns(response);
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('should import projects', (done) => {
    localStorage.setItem('token', '1234567890');
    localStorage.setItem('user_id', '1');

    const Constructor = Vue.extend(GitHubProjects);
    const component = new Constructor();
    component.selectedRepos = ['repo1', 'repo2'];
    const spy = sandbox.spy(component, '$emit');

    component.importGithubProjects();
    process.nextTick(() => {
      expect(spy.called).to.be.true;
      done();
    });
  });

  it('should not import projects', (done) => {
    const response_catch = new Promise((resolve, reject) => reject(new Error('Error no http')));
    sandbox.restore();

    sandbox.stub(HTTP, 'post').returns(response_catch);
    localStorage.setItem('token', '1234567890');
    localStorage.setItem('user_id', '1');

    const Constructor = Vue.extend(GitHubProjects);
    const component = new Constructor();
    component.selectedRepos = ['repo1', 'repo2'];
    const spy = sandbox.spy(console, 'log');

    component.importGithubProjects();
    process.nextTick(() => {
      assert(spy.calledWith('Error no http'));
      done();
    });
  });
});
