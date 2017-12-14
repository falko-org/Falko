import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import AddProject from '../../../../src/components/Projects/AddProject.vue';
import sinon from 'sinon';

describe('On Add Project', () => {
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
  it('should add a project correctly', (done) => {
    const httpStub = sandbox.stub(HTTP, 'post').resolves({ data: 200 });
    const errors =  { has: sandbox.stub(), any: sandbox.stub() };
    const wrapper = shallow(AddProject, { store, localVue, mocks: { errors } });
    console.log(wrapper.vm.errors);
    wrapper.vm.addProject();
    expect(httpStub.called).to.be.true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('added')).to.be.truthy;
      done();
    });
  });
});
