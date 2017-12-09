import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import AddSprint from '../../../../src/components/Sprints/AddSprint.vue';
import sinon from 'sinon';

describe('On Add Sprint', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  // localVue.use(VeeValidate);
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
      clientStatus: {
        releaseInitialDate: '2017-01-01',
        releaseFinalDate: '2017-01-07',
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

  it('should add a sprint correctly', (done) => {
    const httpStub = sandbox.stub(HTTP, 'post').resolves({ data: 200 });
    const $route = {
      params: { id: '1' },
    };
    const $router = {
      push: sandbox.stub(),
    };
    const wrapper = shallow(AddSprint, { store, localVue, mocks: { $route, $router } });
    wrapper.vm.addSprint();

    expect(httpStub.called).to.be.true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('added-sprint', 1)).to.be.truthy;
      done();
    });
  });
});
