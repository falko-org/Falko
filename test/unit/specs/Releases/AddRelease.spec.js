import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import AddRelease from '../../../../src/components/Releases/AddRelease.vue';
import sinon from 'sinon';

describe.only('On Add Release', () => {
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
        projectId: '1',
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

  it('should add a release correctly', (done) => {
    const httpStub = sandbox.stub(HTTP, 'post').resolves({ data: 200 });
    const $route = {
      params: { id: '2' },
    };
    const wrapper = shallow(AddRelease, { store, localVue, mocks: { $route } });

    wrapper.vm.addRelease();

    expect(httpStub.called).to.be.true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('added')).to.be.truthy;
      done();
    });
  });
});
