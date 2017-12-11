import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import Register from '../../../../src/components/Authentication/Register.vue';
import sinon from 'sinon';


describe('On register', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VeeValidate);
  const sandbox = sinon.createSandbox();
  let state;
  let actions;
  let store;
  let router;
  const loginStub = sandbox.stub();

  beforeEach(() => {
    actions = {
      login: loginStub,
    };

    state = {
      auth: {
        token: '12345',
        userId: '1',
      },
    };

    store = new Vuex.Store({
      state,
      actions,
    });
  });

  afterEach(() => {
    sandbox.reset();
    sandbox.restore();
  });

  it('should register correctly', (done) => {
    const $router = {
      push: sandbox.stub(),
    };
    const httpStub = sandbox.stub(HTTP, 'post').resolves({ data: 200 });

    const wrapper = shallow(Register, { store, localVue, mocks: { $router } });

    wrapper.vm.register();

    wrapper.vm.$nextTick(() => {
      expect(actions.login.called).to.equal(true);
      expect(wrapper.vm.$router.push.called).to.be.true;
      done();
    });
  });

  it('should not register correctly', (done) => {
    const $router = {
      push: sandbox.stub(),
    };
    const httpStub = sandbox.stub(HTTP, 'post').rejects();
    const wrapper = shallow(Register, { store, localVue, mocks: { $router } });

    wrapper.vm.register();

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$router.push.called).to.be.false;
      done();
    });
  });
});
