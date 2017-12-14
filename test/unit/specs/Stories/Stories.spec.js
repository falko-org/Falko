import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import Stories from '../../../../src/components/Stories/Stories.vue';
import sinon from 'sinon';


describe('On stories component', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VeeValidate);
  const sandbox = sinon.createSandbox();
  let state;
  let store;
  let router;

  beforeEach(() => {
    state = {
      auth: {
        token: '12345',
        userId: '1',
      },
      clientStatus: {
        projectId: 1
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

  it('should mount and get kanban correctly', () => {
    const stub = sandbox.stub(HTTP, 'get').resolves({ data: [] });
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sinon.stub(),
    };
    const wrapper = shallow(Stories, { store, localVue, mocks: { $route } });

    expect(stub.called).to.be.true;
  });

  it('should mount and onUpdateBacklog with added correctly', () => {
    const stub = sandbox.stub(HTTP, 'get').resolves({ data: [] });
    const httpStub = sandbox.stub(HTTP, 'delete').resolves({ data: [] });

    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sinon.stub(),
    };
    const wrapper = shallow(Stories, { store, localVue, mocks: { $route } });
    wrapper.vm.onUpdateBacklog({ added: { element: { id: 1 } } });

    expect(httpStub.called).to.be.true;
  });

  it('should mount and onUpdateBacklog with removed correctly', () => {
    const stub = sandbox.stub(HTTP, 'get').resolves({ data: [] });
    const httpStub = sandbox.stub(HTTP, 'post').resolves({ data: [] });

    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sinon.stub(),
    };
    const wrapper = shallow(Stories, { store, localVue, mocks: { $route } });
    wrapper.vm.onUpdateBacklog({ removed: { element: { id: 1 } } });

    expect(httpStub.called).to.be.true;
  });

  it('should mount and onUpdateToDo with added correctly', () => {
    const stub = sandbox.stub(HTTP, 'get').resolves({ data: [] });
    const httpStub = sandbox.stub(HTTP, 'patch').resolves({ data: [] });

    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sinon.stub(),
    };
    const wrapper = shallow(Stories, { store, localVue, mocks: { $route } });
    wrapper.vm.onUpdateToDo({ added: { element: { id: 1 } } });

    expect(httpStub.called).to.be.true;
  });

  it('should mount and onUpdateDoing with added correctly', () => {
    const stub = sandbox.stub(HTTP, 'get').resolves({ data: [] });
    const httpStub = sandbox.stub(HTTP, 'patch').resolves({ data: [] });

    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sinon.stub(),
    };
    const wrapper = shallow(Stories, { store, localVue, mocks: { $route } });
    wrapper.vm.onUpdateDoing({ added: { element: { id: 1 } } });

    expect(httpStub.called).to.be.true;
  });

  it('should mount and onUpdateDone with added correctly', () => {
    const stub = sandbox.stub(HTTP, 'get').resolves({ data: [] });
    const httpStub = sandbox.stub(HTTP, 'patch').resolves({ data: [] });
    const httpDelStub = sandbox.stub(HTTP, 'delete').resolves({ data: 200 });

    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sinon.stub(),
    };
    const wrapper = shallow(Stories, { store, localVue, mocks: { $route } });
    wrapper.vm.onUpdateDone({ added: { element: { id: 1 } } });

    expect(httpStub.called).to.be.true;
    expect(httpDelStub.called).to.be.true;

  });

  it('should mount and onUpdateDone with removed correctly', () => {
    const stub = sandbox.stub(HTTP, 'get').resolves({ data: [] });
    const httpStub = sandbox.stub(HTTP, 'post').resolves({ data: [] });

    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sinon.stub(),
    };
    const wrapper = shallow(Stories, { store, localVue, mocks: { $route } });
    wrapper.vm.onUpdateDone({ removed: { element: { id: 1 } } });

    expect(httpStub.called).to.be.true;
  });

});
