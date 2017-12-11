import Vuex from 'vuex';
import sinon from 'sinon';
import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common';
import DeleteUserProfile from '../../../../src/components/Users/DeleteUserProfile.vue';

describe('On User Component', () => {
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
  });

  afterEach(() => {
    sandbox.reset();
    sandbox.restore();
  });

  it('should delete user correctly', (done) => {
    const httpStub = sandbox.stub(HTTP, 'delete').resolves({ data: 200 });
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sandbox.stub(),
    };
    const wrapper = shallow(DeleteUserProfile, { store, localVue, mocks: { $route, $router } });

    wrapper.vm.deleteUser();
    expect(httpStub.called).to.be.true;

    wrapper.vm.$nextTick(() => {
      done();
    });
  });
});
