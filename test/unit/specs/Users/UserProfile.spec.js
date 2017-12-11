import Vuex from 'vuex';
import sinon from 'sinon';
import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common';
import { EventBus } from '../../../../src/event-bus';
import UserProfile from '../../../../src/components/Users/UserProfile.vue';

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
        isGitHubAuthenticated: false,
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

  it('should mount and get user information correctly without GitHub account linked', (done) => {
    const httpStub = sandbox.stub(HTTP, 'get').resolves({
      data: {
        name: 'UserName',
        email: 'username@mail.com',
        github: 'User_Name',
        access_token: null,
      },
    });

    const wrapper = shallow(UserProfile, { store, localVue });

    expect(httpStub.called).to.be.true;

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.name).to.be.equal('UserName');
      expect(wrapper.vm.email).to.be.equal('username@mail.com');
      expect(wrapper.vm.github).to.be.equal('User_Name');

      done();
    });
  });

  it('should mount and get user information correctly with GitHub account linked', (done) => {
    const httpStub = sandbox.stub(HTTP, 'get').resolves({
      data: {
        name: 'UserName',
        email: 'username@mail.com',
        github: 'User_Name',
        access_token: '12345',
      },
    });

    const wrapper = shallow(UserProfile, { store, localVue });

    expect(httpStub.called).to.be.true;

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.name).to.be.equal('UserName');
      expect(wrapper.vm.email).to.be.equal('username@mail.com');
      expect(wrapper.vm.github).to.be.equal('User_Name');

      done();
    });
  });

  it('should unlink Falko account with GitHub account', (done) => {
    const httpStubGet = sandbox.stub(HTTP, 'get').resolves({
      data: {
        name: 'UserName',
        email: 'username@mail.com',
        github: 'User_Name',
        access_token: '12345',
      },
    });
    const httpStubPost = sandbox.stub(HTTP, 'post').resolves({ data: 200 });

    const wrapper = shallow(UserProfile, { store, localVue });

    expect(httpStubGet.called).to.be.true;

    wrapper.vm.$nextTick(() => {
      wrapper.vm.unlink();

      done();
    });
  });

  it('should change button label to remove link with GitHub account', (done) => {
    const httpStub = sandbox.stub(HTTP, 'get').resolves({
      data: {
        name: 'UserName',
        email: 'username@mail.com',
        github: 'User_Name',
      },
    });

    const wrapper = shallow(UserProfile, { store, localVue });

    expect(httpStub.called).to.be.true;

    wrapper.vm.$nextTick(() => {
      state.auth.isGitHubAuthenticated = true;
      const linkButton = wrapper.vm.setGitHubButtonLabel();

      expect(wrapper.vm.gitHubButtonLabel).to.be.equal('Remove link with Github');
      done();
    });
  });

  it('should update user profile after editer', (done) => {
    const httpStub = sandbox.stub(HTTP, 'get').resolves({
      data: {
        name: 'UserName',
        email: 'username@mail.com',
        github: 'User_Name',
        access_token: '12345',
      },
    });

    const wrapper = shallow(UserProfile, { store, localVue });

    expect(httpStub.called).to.be.true;

    wrapper.vm.$nextTick(() => {
      wrapper.vm.name = 'UserDifferentName';
      EventBus.$emit('edited-user-profile');

      expect(wrapper.vm.name).to.be.not.equal('UserName');
      done();
    });
  });
});
