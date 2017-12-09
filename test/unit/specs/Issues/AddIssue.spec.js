import Vuex from 'vuex';
import sinon from 'sinon';
// import VeeValidate from 'vee-validate';
import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common';
import AddIssue from '../../../../src/components/Issues/AddIssue.vue';

describe('On Add Issue', () => {
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
    };

    store = new Vuex.Store({
      state,
    });
  });

  afterEach(() => {
    sandbox.reset();
    sandbox.restore();
  });

  it('should add a issue correctly', (done) => {
    const httpStub = sandbox.stub(HTTP, 'post').resolves({ data: 200 });
    const $route = {
      params: { id: '2' },
    };
    const wrapper = shallow(AddIssue, { store, localVue, mocks: { $route } });

    wrapper.vm.addIssue();

    expect(httpStub.called).to.be.true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('added')).to.be.truthy;
      done();
    });
  });
});
