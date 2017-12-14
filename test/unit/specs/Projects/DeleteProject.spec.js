import Vuex from 'vuex';
import sinon from 'sinon';
import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common';
import DeleteProject from '../../../../src/components/Projects/DeleteProject.vue';

describe('On Delete Project', () => {
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

  it('should delete a project correctly', (done) => {
    const httpStub = sandbox.stub(HTTP, 'delete').resolves({ data: 200 });
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sandbox.stub(),
    };
    const wrapper = shallow(DeleteProject, { store, localVue, mocks: { $route, $router } });
    wrapper.vm.deleteProject();
    expect(httpStub.called).to.be.true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$router.push.called).to.be.true;
      done();
    });
  });
});
