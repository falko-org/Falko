import Vuex from 'vuex';
import sinon from 'sinon';
import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common';
import DeleteRetrospective from '../../../../src/components/Retrospective/DeleteRetrospective.vue';

describe('On Delete Retrospective', () => {
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
    sandbox.verify();
    sandbox.reset();
    sandbox.restore();
  });

  it('should delete a retrospective correctly', async () => {
    const httpGetStub = sandbox.stub(HTTP, 'get').resolves({ data: 4 });
    const httpStub = sandbox.stub(HTTP, 'delete').resolves({ data: 200 });
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sandbox.stub(),
    };

    const wrapper = shallow(DeleteRetrospective, { store, localVue, mocks: { $route, $router } });
    await wrapper.vm.deleteRetrospective();

    expect(wrapper.vm.$router.push.called).to.be.true;
  });
});
