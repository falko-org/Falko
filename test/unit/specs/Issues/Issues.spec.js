import Vuex from 'vuex';
import sinon from 'sinon';
import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common';
import Issues from '../../../../src/components/Issues/Issues.vue';

describe('On Issues Issue', () => {
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
        isProjectFromGitHub: false,
      }
    };

    store = new Vuex.Store({
      state,
    });
  });

  afterEach(() => {
    sandbox.reset();
    sandbox.restore();
  });

  it('should mount and get issues correctly', (done) => {
    const httpStub = sandbox.stub(HTTP, 'get').resolves({ data: [] });
    const $route = {
      params: { id: '2' },
    };
    const wrapper = shallow(Issues, { store, localVue, mocks: { $route } });


    expect(httpStub.called).to.be.true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('updated-issue')).to.be.truthy;
      done();
    });
  });

  it('should close issue correctly', (done) => {
    const httpStub = sandbox.stub(HTTP, 'get').resolves({ data: [] });
    const httpDelStub = sandbox.stub(HTTP, 'delete').resolves({ data: 200 });

    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sinon.stub(),
    };

    const wrapper = shallow(Issues, { store, localVue, mocks: { $route, $router } });

    wrapper.vm.closeIssue(1)
    expect(httpDelStub.called).to.be.true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$router.push.called).to.be.trye;
      done();
    });
  });

});
