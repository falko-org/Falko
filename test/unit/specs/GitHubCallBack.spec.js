import Vue from 'vue';
import Vuex from 'vuex';
import GitHubCallBack from '../../../src/components/GitHub/GitHubCallBack.vue';
import { HTTP } from '../../../src/http-common';
import sinon from 'sinon';
import auth from '../../../src/services/auth/index';

const sandbox = sinon.createSandbox();

describe('On github callback', () => {
  let state;
  let store;
  beforeEach(() => {
    Vue.use(Vuex);
    const response = new Promise(r => r({
      data: {
        access_token: '1234',
      },
    }));

    sandbox.stub(HTTP, 'post').returns(response);

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
    sandbox.restore();
  });

  it('should have the correct token', (done) => {
    const Constructor = Vue.extend(GitHubCallBack);
    const component = new Constructor({ store });
    component.$mount();
    process.nextTick(() => {
      expect(component.github_token).to.equal('1234');
      HTTP.post.restore();
      done();
    });
  });
});
