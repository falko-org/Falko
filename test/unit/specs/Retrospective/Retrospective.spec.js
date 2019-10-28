import Vuex from 'vuex';
import sinon from 'sinon';
import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common';
import Retrospective from '../../../../src/components/Retrospective/Retrospective.vue';

describe('On Retrospective Component', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const sandbox = sinon.createSandbox();
  let state;
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
    sandbox.stub(HTTP, 'get').resolves({
      data: {
        sprint_report: ['report'],
        positive_points: ['postive'],
        negative_points: ['negative'],
        improvements: ['improve'],
      },
    });
  });

  afterEach(() => {
    sandbox.reset();
    sandbox.restore();
  });

  it('should mount and get Retrospective information correctly', (done) => {
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sandbox.stub(),
    };

    const wrapper = shallow(Retrospective, { store, localVue, mocks: { $route, $router } });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.sprintReport).to.be.deep.equal(['report']);
      done();
    });
  });

  it('should refresh Retrospective information on edit', (done) => {
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sandbox.stub(),
    };
    const wrapper = shallow(Retrospective, { store, localVue, mocks: { $route, $router } });
    wrapper.vm.refreshRetrospective();

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.sprintReport).to.be.deep.equal(['report']);
      done();
    });
  });
});
