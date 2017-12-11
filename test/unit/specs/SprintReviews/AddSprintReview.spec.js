import { shallow, createLocalVue } from 'vue-test-utils'
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import AddRevision from '../../../../src/components/Revision/AddRevision.vue';
import sinon from 'sinon';

describe('On Add Sprint Review', () => {
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

  it('should add a sprint review correctly', (done) => {
    let httpStub = sandbox.stub(HTTP, 'post').resolves({ data: 200 });
    const $route = {
      params: { id: "2" }
    }
    const wrapper = shallow(AddRevision, { store, localVue, mocks: { $route } });

    wrapper.vm.addRevision();

    expect(httpStub.called).to.be.true
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('revisionCreated')).to.be.truthy
      done();
    });
  });

  it('should update Done Report list of review correctly', () => {
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sandbox.stub(),
    };
    const wrapper = shallow(AddRevision, { store, localVue, mocks: { $route, $router } });

    wrapper.vm.updateList([{ title: 'Sprint DoneReport' }], 'DoneReport');
    expect(wrapper.vm.doneReport).to.be.deep.equal(['Sprint DoneReport']);
  });

  it('should update Undone Report list of review correctly', () => {
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sandbox.stub(),
    };
    const wrapper = shallow(AddRevision, { store, localVue, mocks: { $route, $router } });

    wrapper.vm.updateList([{ title: 'Sprint UndoneReport' }], 'UndoneReport');
    expect(wrapper.vm.undoneReport).to.be.deep.equal(['Sprint UndoneReport']);
  });

});