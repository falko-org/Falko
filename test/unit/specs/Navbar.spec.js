import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex';
import Navbar from '../../../src/components/Navbar.vue';
import sinon from 'sinon';


describe('On navbar component', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const sandbox = sinon.createSandbox();
  let state;
  let actions;
  let store;

  beforeEach(() => {
    state = {
      auth: {
        authenticated: true
      },
    };

    actions = {
      logout: sandbox.stub(),
    };

    store = new Vuex.Store({
      state,
      actions
    });

  });

  afterEach(() => {
    sandbox.reset();
    sandbox.restore();
  });

  it('should check that is logged is true', () => {
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sandbox.stub(),
    };

    const wrapper = shallow(Navbar, { store, localVue, mocks: { $route, $router } });
    expect(wrapper.vm.authenticated).to.be.true;
  });

  it('should check that is logged is false', () => {
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sandbox.stub(),
    };
    state.auth.authenticated = false;

    const wrapper = shallow(Navbar, { store, localVue, mocks: { $route, $router } });
    expect(wrapper.vm.authenticated).to.be.false;
  });


  it('should logout correctly', (done) => {
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sandbox.stub(),
    };

    const wrapper = shallow(Navbar, { store, localVue, mocks: { $route, $router } });
    wrapper.setData({email:"matheus@gmail.com", password: "123456"});
    sandbox.stub(window, 'confirm').returns(true);
    wrapper.vm.logout();

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$router.push.called).to.be.true;
      done();
    });
  });

  it('should router push when goToHome called', (done) => {
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sandbox.stub(),
    };

    const wrapper = shallow(Navbar, { store, localVue, mocks: { $route, $router } });
    wrapper.setData({email:"matheus@gmail.com", password: "123456"});
    wrapper.vm.goToHome();

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$router.push.called).to.be.true;
      done();
    });
  });

  it('should router push when goToHome called', (done) => {
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sandbox.stub(),
    };
    state.auth.authenticated = false;

    const wrapper = shallow(Navbar, { store, localVue, mocks: { $route, $router } });
    wrapper.setData({email:"matheus@gmail.com", password: "123456"});
    wrapper.vm.goToHome();

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$router.push.called).to.be.true;
      done();
    });
  });
});