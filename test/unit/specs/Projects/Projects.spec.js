import Vuex from 'vuex';
import sinon from 'sinon';
import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common';
import Projects from '../../../../src/components/Projects/Projects.vue';


describe('On projects component', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
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
    };

    store = new Vuex.Store({
      state,
    });
  });

  afterEach(() => {
    sandbox.reset();
    sandbox.restore();
  });

  it('should get projects when mounted', () => {
    const stub = sandbox.stub(HTTP, 'get').resolves({ data: [{ name: 'project1', description: 'description1' }] });

    const wrapper = shallow(Projects, { store, localVue });
    expect(stub.called).to.be.true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.projects).to.be.deep.equal([{ name: 'project1', description: 'description1' }]);
    });
  });

  it('should enter v-if with empty projects array', () => {
    const stub = sandbox.stub(HTTP, 'get').resolves({ data: [] });

    const wrapper = shallow(Projects, { store, localVue });
    expect(stub.called).to.be.true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.projects).to.be.deep.equal([]);
    });

    expect(wrapper.vm.isProjectsEmpty()).to.be.true;
  });

  it('should get projects when refreshed', () => {
    const stub = sandbox.stub(HTTP, 'get').resolves({ data: [{ name: 'project1', description: 'description1' }] });
    const wrapper = shallow(Projects, { store, localVue });

    wrapper.vm.refreshProjects();
    expect(stub.called).to.be.true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.projects).to.be.deep.equal([{ name: 'project1', description: 'description1' }]);
    });
  });
});
