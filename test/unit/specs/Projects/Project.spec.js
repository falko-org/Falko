import { shallow, createLocalVue } from 'vue-test-utils'
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import Project from '../../../../src/components/Projects/Project.vue';
import sinon from 'sinon';

describe('On Project Component', () => {
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
    let httpStub = sandbox.stub(HTTP, 'get').resolves({ data: { name: 'ProjectName', description: 'ProjectDescription', isScoring: true, is_project_from_github: true } });
    const $route = {
      params: {id: "2"}
    }
    const $router = {
      push: sandbox.stub()
    }
    const wrapper = shallow(Project, {store, localVue, mocks: {$route, $router} });
    
    expect(httpStub.called).to.be.true
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.project.name).to.be.equal('ProjectName');
      done();
    });
  });



});