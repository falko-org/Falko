import { shallow, createLocalVue } from 'vue-test-utils';
import Vuex from 'vuex';
import Login from '../../../../src/components/Authentication/Login.vue';

describe('On login', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const sandbox = sinon.createSandbox();
  let state;
  let actions;
  let store;
  const stub = sandbox.stub();

  beforeEach(() => {
    actions = {
      login: stub,
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

  it('should loggin correctly', (done) => {
    const errors = {
      has: sandbox.stub(),
    };
    const $router = {
      push: sandbox.stub(),
    };

    const wrapper = shallow(Login, { store, localVue, mocks: { $router, errors } });
    wrapper.vm.login();

    expect(actions.login.called).to.equal(true);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$router.push.called).to.be.true;
      done();
    });
  });

  it('should not loggin with wrong credentials', (done) => {
    const errors = {
      has: sandbox.stub(),
    };
    const wrapper = shallow(Login, { store, localVue, mocks: { errors } });
    stub.reset();
    stub.rejects();
    wrapper.vm.login();

    expect(actions.login.called).to.equal(true);
    wrapper.vm.$nextTick(() => {
      // expect(wrapper.vm.errors.has('wrong-credentials')).to.be.true;
      done();
    });
  });
});
