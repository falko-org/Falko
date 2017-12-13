import { shallow, createLocalVue } from 'vue-test-utils';
import Vuex from 'vuex';
// import Vue from 'vue';
import sinon from 'sinon';
import GitHubProjects from '../../../../src/components/GitHub/GitHubProjects.vue';
import { HTTP } from '../../../../src/http-common';


describe('On github project list repos', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const sandbox = sinon.createSandbox();

  let state;
  let store;

  beforeEach(() => {
    state = {
      auth: {
        token: '12345',
        isGitHubAuthenticated: true,
      },
    };

    store = new Vuex.Store({
      state,
    });
  });

  afterEach(() => {
    sandbox.reset();
    sandbox.restore();
  });

  it('should have the correct user repos and org repos', (done) => {
    const stub = sandbox.stub(HTTP, 'get').resolves({
      data: {
        user: [
          {
            login: 'pedrokelvin',
          },
          {
            repos: [
              'userRepo1',
              'userRepo2',
            ],
          },
        ],
        orgs: [
          {
            name: 'Org1',
            repos: ['Org1Repo'],
          },
          {
            name: 'Org2',
            repos: ['Org2Repo'],
          },
        ],
      },
    });

    const $router = {
      push: sandbox.stub(),
    };
    const wrapper = shallow(GitHubProjects, { store, localVue, mocks: { $router } });

    wrapper.vm.getRepos();

    expect(stub.called).to.be.true;

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.userRepos).to.deep.equal([
        'userRepo1',
        'userRepo2',
      ]);

      expect(wrapper.vm.orgsRepos).to.deep.equal([
        {
          name: 'Org1',
          repos: ['Org1Repo'],
        },
        {
          name: 'Org2',
          repos: ['Org2Repo'],
        },
      ]);

      done();
    });
  });

  it('should not have the correct user repos', (done) => {
    const stub = sandbox.stub(HTTP, 'get').resolves({
      data: {
        user: [
          {
            login: 'pedrokelvin',
          },
          {
            repos: [
              'userRepo1',
              'userRepo2',
            ],
          },
        ],
        orgs: [
          {
            name: 'Org1',
            repos: ['Org1Repo'],
          },
          {
            name: 'Org2',
            repos: ['Org2Repo'],
          },
        ],
      },
    });

    const $router = {
      push: sandbox.stub(),
    };
    const wrapper = shallow(GitHubProjects, { store, localVue, mocks: { $router } });

    wrapper.vm.getRepos();

    expect(stub.called).to.be.true;

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.userRepos).to.deep.not.equal([
        {
          login: 'pedrokelvin',
        },
        {
          repos: [
            'differentUserRepo1',
            'differentUserRepo2',
          ],
        },
      ]);

      expect(wrapper.vm.orgsRepos).to.deep.equal([
        {
          name: 'Org1',
          repos: ['Org1Repo'],
        },
        {
          name: 'Org2',
          repos: ['Org2Repo'],
        },
      ]);

      done();
    });
  });

  it('should not have the correct org repos', (done) => {
    const stub = sandbox.stub(HTTP, 'get').resolves({
      data: {
        user: [
          {
            login: 'pedrokelvin',
          },
          {
            repos: [
              'userRepo1',
              'userRepo2',
            ],
          },
        ],
        orgs: [
          {
            name: 'Org1',
            repos: ['Org1Repo'],
          },
          {
            name: 'Org2',
            repos: ['Org2Repo'],
          },
        ],
      },
    });

    const $router = {
      push: sandbox.stub(),
    };
    const wrapper = shallow(GitHubProjects, { store, localVue, mocks: { $router } });

    wrapper.vm.getRepos();

    expect(stub.called).to.be.true;

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.userRepos).to.deep.equal([
        'userRepo1',
        'userRepo2',
      ]);

      expect(wrapper.vm.orgsRepos).to.deep.not.equal([
        {
          name: 'differentOrg1',
          repos: ['differentOrg1Repo'],
        },
        {
          name: 'differentOrg2',
          repos: ['differentOrg2Repo'],
        },
      ]);

      done();
    });
  });

  it('should not have the correct user repos and orgs repos', (done) => {
    const stub = sandbox.stub(HTTP, 'get').resolves({
      data: {
        user: [
          {
            login: 'pedrokelvin',
          },
          {
            repos: [
              'userRepo1',
              'userRepo2',
            ],
          },
        ],
        orgs: [
          {
            name: 'Org1',
            repos: ['Org1Repo'],
          },
          {
            name: 'Org2',
            repos: ['Org2Repo'],
          },
        ],
      },
    });

    const $router = {
      push: sandbox.stub(),
    };
    const wrapper = shallow(GitHubProjects, { store, localVue, mocks: { $router } });

    wrapper.vm.getRepos();

    expect(stub.called).to.be.true;

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.userRepos).to.deep.not.equal([
        {
          login: 'pedrokelvin',
        },
        {
          repos: [
            'differentUserRepo1',
            'differentUserRepo2',
          ],
        },
      ]);

      expect(wrapper.vm.orgsRepos).to.deep.not.equal([
        {
          name: 'differentOrg1',
          repos: ['differentOrg1Repo'],
        },
        {
          name: 'differentOrg2',
          repos: ['differentOrg2Repo'],
        },
      ]);

      done();
    });
  });

  it('should unable GitHub button when is not conected', (done) => {
    state.auth.isGitHubAuthenticated = false;

    const wrapper = shallow(GitHubProjects, { store, localVue });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.buttonClass()).to.be.equal('btn btn-info btn-md falko-button-grey disabled-cursor');

      done();
    });
  });
});


describe('On GitHubProjects import', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const sandbox = sinon.createSandbox();

  let state;
  let store;

  beforeEach(() => {
    state = {
      auth: {
        token: '12345',
        isGitHubAuthenticated: true,
      },
    };

    store = new Vuex.Store({
      state,
    });
  });

  afterEach(() => {
    sandbox.reset();
    sandbox.restore();
  });


  it('should import projects', (done) => {
    const stub = sandbox.stub(HTTP, 'get').resolves({
      data: {
        user: [
          {
            login: 'pedrokelvin',
          },
          {
            repos: [
              'userRepo1',
              'userRepo2',
            ],
          },
        ],
        orgs: [
          {
            name: 'Org1',
            repos: ['Org1Repo'],
          },
          {
            name: 'Org2',
            repos: ['Org2Repo'],
          },
        ],
      },
    });

    const $router = {
      push: sandbox.stub(),
    };
    const wrapper = shallow(GitHubProjects, { store, localVue, mocks: { $router } });

    wrapper.vm.getRepos();

    expect(stub.called).to.be.true;

    wrapper.vm.selectedRepos = ['userRepo1', 'userRepo2'];
    const spy = sandbox.spy(wrapper.vm, 'importGithubProjects');

    wrapper.vm.importGithubProjects();

    wrapper.vm.$nextTick(() => {
      expect(spy.called).to.be.true;

      done();
    });
  });

  // it('should not import projects', (done) => {
  //   const responseCatch = new Promise((resolve, reject) => reject(new Error('Error in http')));
  //   sandbox.stub(HTTP, 'post').returns(responseCatch);
  //
  //   const Constructor = Vue.extend(GitHubProjects);
  //   const component = new Constructor({ store });
  //   component.selectedRepos = ['userRepo1', 'userRepo2'];
  //   const spy = sandbox.spy(console, 'log');
  //
  //   component.importGithubProjects();
  //   process.nextTick(() => {
  //     expect(spy.calledWith('Error in http')).to.be.true;
  //     done();
  //   });
  // });
});
