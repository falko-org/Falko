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

  it('should click and get sprint review information correctly', (done) => {
    const httpStub = sandbox.stub(HTTP, 'patch').resolves({ data: { } });

    const $route = {
      params: { id: "2" }
    }
    const $router = {
      push: sandbox.stub()
    }
    const wrapper = shallow(EditRevision, { store, localVue, mocks: { $route, $router } });
    wrapper.vm.editRevision();

    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('revisionCreated')).to.be.truthy;
      done();
    });
  });


  it('should mount and get sprint review information correctly', () => {
    const $route = {
      params: { id: "2" }
    }
    const $router = {
      push: sandbox.stub()
    }
    const wrapper = shallow(EditRevision, { store, localVue, mocks: { $route, $router } });

    wrapper.vm.updateList([{ title: 'Sprint doneReport' }], 'DoneReport');

    expect(wrapper.vm.doneReport).to.be.deep.equal(['Sprint doneReport']);

  });

  it('should mount and get sprint review information correctly', () => {
    const $route = {
      params: { id: "2" }
    }
    const $router = {
      push: sandbox.stub()
    }
    const wrapper = shallow(EditRevision, { store, localVue, mocks: { $route, $router } });

    wrapper.vm.updateList([{ title: 'Sprint undoneReport' }], 'UndoneReport');

    expect(wrapper.vm.undoneReport).to.be.deep.equal(['Sprint undoneReport']);

  });
});