import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import EditSprint from '../../../../src/components/Sprints/EditSprint.vue';
import sinon from 'sinon';

describe('On Edit Sprint', () => {
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
      clientStatus: {
        releaseInitialDate: '2017-01-01',
        releaseFinalDate: '2017-01-07',
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


  it('should mount and get sprint information correctly', (done) => {
    const httpStub = sandbox.stub(HTTP, 'get').resolves({
      data: {
        id: 1,
        name: 'Sprint 1',
        description: 'First one',
        release_id: 1,
        initial_date: '2017-12-01',
        final_date: '2017-12-02',
      },
    });
    const errors =  { has: sandbox.stub(), any: sandbox.stub() };
    const $route = {
      params: { id: '1' },
    };
    const $router = {
      push: sandbox.stub(),
    };
    const wrapper = shallow(EditSprint, { store, localVue, mocks: { $route, $router, errors } });

    expect(httpStub.called).to.be.true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('edited-sprint')).to.be.truthy;
      done();
    });
  });

  it('should click and edit sprint information correctly', (done) => {
    const httpStub = sandbox.stub(HTTP, 'put').resolves({ data: 200 });
    const errors =  { has: sandbox.stub(), any: sandbox.stub() };
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sandbox.stub(),
    };
    const wrapper = shallow(EditSprint, { store, localVue, mocks: { $route, $router, errors } });
    wrapper.vm.editSprint();

    expect(httpStub.called).to.be.true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('edited-sprint')).to.be.truthy;
      done();
    });
  });
});
