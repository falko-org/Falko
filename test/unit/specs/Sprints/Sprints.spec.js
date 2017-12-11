import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import Sprints from '../../../../src/components/Sprints/Sprints.vue';
import sinon from 'sinon';


describe('On sprints component', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VeeValidate);
  const sandbox = sinon.createSandbox();
  let state;
  let store;
  let router;

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

  it('should get sprints when mounted', (done) => {
    const stub = sandbox.stub(HTTP, 'get').resolves({ data: [{ name: 'Sprint 1', description: 'Sprint description' }] });
    const $route = {
      params: { id: '2' },
    };

    const wrapper = shallow(Sprints, { store, localVue, mocks: { $route } });

    expect(stub.called).to.be.true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.sprints).to.be.deep.equal([{ name: 'Sprint 1', description: 'Sprint description' }]);
      done();
    });
  });

  it('should enter v-if with empty sprints array', (done) => {
    const stub = sandbox.stub(HTTP, 'get').resolves({ data: [] });
    const $route = {
      params: { id: '2' },
    };

    const wrapper = shallow(Sprints, { store, localVue, mocks: { $route } });
    expect(stub.calledOnce).to.be.true;

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.sprints).to.be.deep.equal([]);
      expect(wrapper.vm.isSprintsEmpty()).to.be.true;
      done();
    });
  });
});
