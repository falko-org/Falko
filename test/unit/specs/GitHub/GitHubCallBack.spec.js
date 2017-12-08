import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex';
import GitHubCallBack from '../../../../src/components/GitHub/GitHubCallBack.vue';
import sinon from 'sinon';

describe('On github callback', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const sandbox = sinon.createSandbox();
  
  let state;
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      linkGithub: sinon.stub(),
    };

    state = {
      auth: {
        token: '12345',
        userId: '1',
      },
    };

    store = new Vuex.Store({
      state,
      actions,
    });


  });

  afterEach(() => {
    sandbox.reset();
    sandbox.restore();
  });

  it('should have the correct token', () => {
    const $router = {
      push: sandbox.stub()
    }
    const wrapper = shallow(GitHubCallBack, { store, localVue, mocks: {$router} });

    expect(actions.linkGithub.calledOnce).to.equal(true);
    localVue.nextTick(() => {
      expect($router.push.calledOnce).to.equal(true);
    });

  });
});
