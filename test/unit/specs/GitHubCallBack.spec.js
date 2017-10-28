import Vue from 'vue';
import GitHubCallBack from '../../../src/components/GitHubCallBack.vue'
import {HTTP} from '../../../src/http-common.js';
import sinon from 'sinon';

describe('On github callback', function() {

  it('should have the correct token', function (done) {
  	const response = new Promise((r) => r(
  			{
  				data: {access_token: "1234"}
  			}));

  	sinon.stub(HTTP, 'post').returns(response);

  	const Ctor = Vue.extend(GitHubCallBack)
    const vm = new Ctor().$mount()

    process.nextTick(function() {
   		expect(vm.token).to.equal('1234');
   		done();
    });
    HTTP.post.restore();
  })
})
