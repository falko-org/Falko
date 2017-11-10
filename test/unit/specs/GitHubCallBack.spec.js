import Vue from 'vue';
import GitHubCallBack from '../../../src/components/GitHub/GitHubCallBack.vue';
import { HTTP } from '../../../src/http-common';
import sinon from 'sinon';

describe('On github callback', () => {
  it('should have the correct token', (done) => {
    const response = new Promise(r => r({
      data: { access_token: '1234' },
    }));

    sinon.stub(HTTP, 'post').returns(response);

    const Constructor = Vue.extend(GitHubCallBack);
    const component = new Constructor().$mount();

    process.nextTick(() => {
      expect(component.github_token).to.equal('1234');
      HTTP.post.restore();
      done();
    });
  });
});
