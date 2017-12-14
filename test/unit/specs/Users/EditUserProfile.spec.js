import Vuex from 'vuex';
import sinon from 'sinon';
import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common';
import EditUserProfile from '../../../../src/components/Users/EditUserProfile.vue';

describe('On User Component', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const sandbox = sinon.createSandbox();
  let state;
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

  it('should edit user informations', (done) => {
    const httpStubGet = sandbox.stub(HTTP, 'get').resolves({
      data: {
        name: 'UserName',
        email: 'username@mail.com',
        github: 'User_Name',
        access_token: null,
      },
    });
    const httpStubPut = sandbox.stub(HTTP, 'put').resolves({ data: 200 });
    const wrapper = shallow(EditUserProfile, { store, localVue });

    wrapper.vm.editUser();

    expect(httpStubGet.called).to.be.true;

    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('edited-user-profile')).to.be.truthy;

      done();
    });
  });
});
