import { shallow, createLocalVue } from 'vue-test-utils'
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import EditRevision from '../../../../src/components/Revision/EditRevision.vue';
import sinon from 'sinon';

describe('On Edit Sprint Review', () => {
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

  it('should mount and get sprint review information correctly', (done) => {
    const $route = {
      params: { id: "2" }
    }
    const $router = {
      push: sandbox.stub()
    }
    const wrapper = shallow(EditRevision, { store, localVue, mocks: { $route, $router } });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('revisionCreated')).to.be.truthy;
      done();
    });
  });
});