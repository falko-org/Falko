import Vuex from 'vuex';
import sinon from 'sinon';
import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common';
import EditRetrospective from '../../../../src/components/Retrospective/EditRetrospective.vue';

describe('On Edit Retrospective', () => {
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

  it('should click and edit retrospective information correctly', (done) => {
    const httpStub = sandbox.stub(HTTP, 'patch').resolves({ data: { } });
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sandbox.stub(),
    };
    const wrapper = shallow(EditRetrospective, { store, localVue, mocks: { $route, $router } });
    wrapper.vm.editRetrospective();

    expect(httpStub.called).to.be.true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('edited-retrospective')).to.be.truthy;
      done();
    });
  });

  it('should update postive points list of retrospective correctly', () => {
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sandbox.stub(),
    };
    const wrapper = shallow(EditRetrospective, { store, localVue, mocks: { $route, $router } });

    wrapper.vm.updateList([{ title: 'Sprint positivePoints1' }], 'PositivePoints');
    expect(wrapper.vm.positivePoints).to.be.deep.equal(['Sprint positivePoints1']);
  });

  it('should update negative points list of retrospective correctly', () => {
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sandbox.stub(),
    };
    const wrapper = shallow(EditRetrospective, { store, localVue, mocks: { $route, $router } });

    wrapper.vm.updateList([{ title: 'Sprint negativePoints1' }], 'NegativePoints');
    expect(wrapper.vm.negativePoints).to.be.deep.equal(['Sprint negativePoints1']);
  });

  it('should update postive points list of retrospective correctly', () => {
    const $route = {
      params: { id: '2' },
    };
    const $router = {
      push: sandbox.stub(),
    };
    const wrapper = shallow(EditRetrospective, { store, localVue, mocks: { $route, $router } });

    wrapper.vm.updateList([{ title: 'Sprint improvements' }], 'Improvements');
    expect(wrapper.vm.improvements).to.be.deep.equal(['Sprint improvements']);
  });
});
