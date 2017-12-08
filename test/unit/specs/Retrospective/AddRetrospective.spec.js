import { shallow, createLocalVue } from 'vue-test-utils'
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import AddRetrospective from '../../../../src/components/Retrospective/AddRetrospective.vue';
import sinon from 'sinon';

describe('On Add Release', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  //localVue.use(VeeValidate);
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

  it('should add a retrospective correctly', (done) => {
    let httpStub = sandbox.stub(HTTP, 'post').resolves({data: 200});
    const $route = {
      params: {id: "2"}
    }
    const $router = {
      push: sandbox.stub()
    }
    const wrapper = shallow(AddRetrospective, {store, localVue, mocks: {$route, $router} });

    wrapper.vm.addRetrospective();

    expect(httpStub.called).to.be.true
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('retrospectiveCreated')).to.be.truthy
      done();
    });
  });

  it('should update postive points list of retrospective correctly', () => {
    const $route = {
      params: {id: "2"}
    }
    const $router = {
      push: sandbox.stub()
    }
    const wrapper = shallow(AddRetrospective, {store, localVue, mocks: {$route, $router} });

    wrapper.vm.updateList([{title: 'Sprint positivePoints1'}], 'PositivePoints');
    expect(wrapper.vm.positivePoints).to.be.deep.equal(['Sprint positivePoints1'])
  });

  it('should update negative points list of retrospective correctly', () => {
    const $route = {
      params: {id: "2"}
    }
    const $router = {
      push: sandbox.stub()
    }
    const wrapper = shallow(AddRetrospective, {store, localVue, mocks: {$route, $router} });

    wrapper.vm.updateList([{title: 'Sprint negativePoints1'}], 'NegativePoints');
    expect(wrapper.vm.negativePoints).to.be.deep.equal(['Sprint negativePoints1'])
  });

  it('should update postive points list of retrospective correctly', () => {
    const $route = {
      params: {id: "2"}
    }
    const $router = {
      push: sandbox.stub()
    }
    const wrapper = shallow(AddRetrospective, {store, localVue, mocks: {$route, $router} });

    wrapper.vm.updateList([{title: 'Sprint improvements'}], 'Improvements');
    expect(wrapper.vm.improvements).to.be.deep.equal(['Sprint improvements'])
  });
});