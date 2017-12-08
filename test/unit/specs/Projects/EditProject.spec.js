import { shallow, createLocalVue } from 'vue-test-utils'
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import EditProject from '../../../../src/components/Projects/EditProject.vue';
import sinon from 'sinon';

describe('On Edit Project', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const sandbox = sinon.createSandbox();
  let state;
  let actions;
  let store;
  
  beforeEach(() => {
    state = {
      auth: {
        token: '12345',
        userId: '1',
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

  it('should mount and get project information correctly', (done) => {
    let httpStub = sandbox.stub(HTTP, 'get').resolves({ data: { name: 'ProjectName', description: 'ProjectDescription', isScoring: true } });
    const $route = {
      params: {id: "2"}
    }
    const $router = {
      push: sandbox.stub()
    }
    const wrapper = shallow(EditProject, {store, localVue, mocks: {$route, $router} });
    
    expect(httpStub.called).to.be.true
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('edited-project')).to.be.truthy;
      done();
    });
  });

  it('should edit a project correctly', (done) => {
    let httpStub = sandbox.stub(HTTP, 'put').resolves({data: 200});
    const $route = {
      params: {id: "2"}
    }
    const $router = {
      push: sandbox.stub()
    }
    const wrapper = shallow(EditProject, {store, localVue, mocks: {$route, $router} });
    wrapper.vm.editProject();
    expect(httpStub.called).to.be.true
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('edited-project')).to.be.truthy;
      done();
    });
  });

});