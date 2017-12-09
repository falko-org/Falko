import { shallow, createLocalVue } from 'vue-test-utils'
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import Revision from '../../../../src/components/Revision/Revision.vue';
import sinon from 'sinon';

describe('On Sprint Review Component', () => {
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
    let httpStub = sandbox.stub(HTTP, 'get').resolves({ data: { undone_report: ['TS 01', 'US 02'], done_report: ['US 01'] } });
    const $route = {
      params: { id: "2" }
    }
    const $router = {
      push: sandbox.stub()
    }
    const wrapper = shallow(Revision, { store, localVue, mocks: { $route, $router } });

    expect(httpStub.called).to.be.true
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.doneReport).to.be.deep.equal(['US 01']);
      expect(wrapper.vm.undoneReport).to.be.deep.equal(['TS 01', 'US 02']);
      done();
    });
  });
});