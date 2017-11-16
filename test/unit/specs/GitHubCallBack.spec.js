import Vue from 'vue';
import sinon from 'sinon';
import GitHubCallBack from '../../../src/components/GitHub/GitHubCallBack.vue';
import { HTTP } from '../../../src/http-common';

describe('On github callback', () => {
  it('should have the correct token', (done) => {
    const response = new Promise(r => r({
      data: { access_token: '1234' },
    }));

    sinon.stub(HTTP, 'post').returns(response);

    const Constructor = Vue.extend(GitHubCallBack);
    localStorage.setItem('token', '1234567890');
    const component = new Constructor().$mount();

    process.nextTick(() => {
      expect(component.token).to.equal('1234');
      HTTP.post.restore();
      done();
    });
  });
});
