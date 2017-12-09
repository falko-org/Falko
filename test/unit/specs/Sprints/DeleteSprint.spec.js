import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import DeleteSprint from '../../../../src/components/Sprints/DeleteSprint.vue';
import sinon from 'sinon';

describe('On Delete Sprint', () => {
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
    sandbox.verify();
    sandbox.reset();
    sandbox.restore();
  });

  it('should delete a sprint correctly', async () => {
    const httpGetStub = sandbox.stub(HTTP, 'get').resolves({ data: 1 });
    const httpStub = sandbox.stub(HTTP, 'delete').resolves({ data: 200 });
    const $route = {
      params: { id: '1' },
    };
    const $router = {
      push: sandbox.stub(),
    };

    const wrapper = shallow(DeleteSprint, { store, localVue, mocks: { $route, $router } });
    await wrapper.vm.deleteSprint();
    expect(httpStub.called).to.be.true;

    expect(wrapper.vm.$router.push.called).to.be.true;
  });
});
