import Vue from 'vue';
import GitHubCallBack from '../../../src/components/GitHub/GitHubCallBack.vue'
import {HTTP} from '../../../src/http-common.js';
import sinon from 'sinon';

describe('On github callback', function() {

  it('should have the correct token', function (done) {
    const response = new Promise((r) => r(
      {
        data: { access_token: '1234' },
      }));

    sinon.stub(HTTP, 'post').returns(response);

    const Constructor = Vue.extend(GitHubCallBack);
    localStorage.setItem('token', "1234567890");
    const component = new Constructor().$mount();

    process.nextTick(function() {
      expect(component.token).to.equal('1234');
      HTTP.post.restore();
      done();
    });
  });
});

    