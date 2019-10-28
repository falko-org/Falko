import { shallow, createLocalVue } from 'vue-test-utils'
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import DeleteRevision from '../../../../src/components/Revision/DeleteRevision.vue';
import sinon from 'sinon';

describe('On Delete Sprint Review', () => {
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

  it('should delete a sprint review correctly', async () => {
    let httpGetStub = sandbox.stub(HTTP, 'get').resolves({ data: 4 });
    let httpStub = sandbox.stub(HTTP, 'delete').resolves({ data: 200 });
    const $route = {
      params: { id: "2" }
    }
    const $router = {
      push: sandbox.stub()
    }

    const wrapper = shallow(DeleteRevision, { store, localVue, mocks: { $route, $router } });
    await wrapper.vm.deleteRevision();

    expect(wrapper.vm.$router.push.called).to.be.true;
  })
});