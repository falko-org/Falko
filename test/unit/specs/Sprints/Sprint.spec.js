import { shallow, createLocalVue } from 'vue-test-utils'
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import Sprint from '../../../../src/components/Sprints/Sprint.vue';
import sinon from 'sinon';

describe('On Sprint Component', () => {
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

  it('should mount and get sprint information correctly', (done) => {
    let httpStub = sandbox.stub(HTTP, 'get').resolves({ data: { name: 'SprintName', description: 'SprintDescription', inital_date: "01/01/2017", final_date: "07/01/2017" } });
    const $route = {
      params: { id: "2" }
    }
    const $router = {
      push: sandbox.stub()
    }
    const wrapper = shallow(Sprint, { store, localVue, mocks: { $route, $router } });

    expect(httpStub.called).to.be.true
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.sprint.name).to.be.equal('SprintName');
      done();
    });
  });

  it('should refresh sprint information on edit', (done) => {
    let httpStub = sandbox.stub(HTTP, 'get').resolves({ data: { name: 'SprintName', description: 'SprintDescription', initial_date: "01/01/2017", final_date: "07/01/2017" } });
    const $route = {
      params: { id: "2" }
    }
    const $router = {
      push: sandbox.stub()
    }
    const wrapper = shallow(Sprint, { store, localVue, mocks: { $route, $router } });
    wrapper.vm.refreshSprint();
    expect(httpStub.called).to.be.true
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.sprint.name).to.be.equal('SprintName');
      done();
    });
  })

});