import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import DeleteRelease from '../../../../src/components/Releases/DeleteRelease.vue';
import sinon from 'sinon';

describe('On Delete Release', () => {
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

  it('should delete a release correctly', (done) => {
    const httpStub = sandbox.stub(HTTP, 'delete').resolves({ data: 200 });
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      go: sandbox.stub(),
    };
    const wrapper = shallow(DeleteRelease, { store, localVue, mocks: { $route, $router } });

    wrapper.vm.deleteRelease();
    expect(httpStub.called).to.be.true;
    wrapper.vm.$nextTick(() => {
      done();
    });
  });
});
