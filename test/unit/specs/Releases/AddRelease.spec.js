import Vuex from 'vuex';
import sinon from 'sinon';
import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common';
import AddRelease from '../../../../src/components/Releases/AddRelease.vue';

describe('On Add Release', () => {
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
    const errors =  { has: sandbox.stub(), any: sandbox.stub() };

    const $route = {
      params: { id: '2' },
    };
    const wrapper = shallow(AddRelease, { store, localVue, mocks: { $route, errors } });

    wrapper.vm.addRelease();

    expect(httpStub.called).to.be.true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('added')).to.be.truthy;
      done();
    });
  });
});
