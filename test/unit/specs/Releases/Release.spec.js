import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import Release from '../../../../src/components/Releases/Release.vue';
import sinon from 'sinon';

describe('On Release Component', () => {
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

  it('should mount and get release information correctly', (done) => {
    const httpStub = sandbox.stub(HTTP, 'get').resolves({
      data: {
        name: 'ReleaseName', description: 'ReleaseDescription', initial_date: '2017-01-01', final_date: '2017-01-01',
      },
    });
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sandbox.stub(),
    };
    const wrapper = shallow(Release, { store, localVue, mocks: { $route, $router } });

    expect(httpStub.called).to.be.true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.release.name).to.be.equal('ReleaseName');
      done();
    });
  });

  it('should refresh release information on edit', (done) => {
    const httpStub = sandbox.stub(HTTP, 'get').resolves({
      data: {
        name: 'ReleaseName', description: 'ReleaseDescription', initial_date: '01/01/2017', final_date: '07/01/2017',
      },
    });
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sandbox.stub(),
    };
    const wrapper = shallow(Release, { store, localVue, mocks: { $route, $router } });
    wrapper.vm.refreshRelease();
    expect(httpStub.called).to.be.true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.release.name).to.be.equal('ReleaseName');
      done();
    });
  });
});
