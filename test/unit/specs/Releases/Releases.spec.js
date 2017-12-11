import { shallow, createLocalVue } from 'vue-test-utils';
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import Releases from '../../../../src/components/Releases/Releases.vue';
import sinon from 'sinon';


describe('On releases component', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VeeValidate);
  const sandbox = sinon.createSandbox();
  let state;
  let store;
  let router;

  beforeEach(() => {
    state = {
      auth: {
        token: '12345',
        userId: '1',
      },

      clientStatus: {
        releaseId: '1',
        releaseIndex: '0',        
      }
    };

    store = new Vuex.Store({
      state,
    });
  });

  afterEach(() => {
    sandbox.reset();
    sandbox.restore();
  });

  it.only('should get releases when mounted', (done) => {
    const stub = sandbox.stub(HTTP, 'get').resolves({
      data: [
        {
          name: "R2",
          description: "Agile Release",
          amount_of_sprints: 9,
          initial_date: "2016-01-01",
          final_date: "2016-12-01"
        },
        {
          name: "R1",
          description: "RUP Release",
          amount_of_sprints: 0,
          initial_date: "2016-01-01",
          final_date: "2016-10-01"
        }
      ]
    });
    
    const $route = {
      params: { id: '2' },
    };

    const wrapper = shallow(Releases, { store, localVue, mocks: { $route } });

    expect(stub.called).to.be.true;
    wrapper.vm.$nextTick(() => {
      console.log(wrapper.vm.releases[state.clientStatus.releaseIndex].name)
      expect(wrapper.vm.releases).to.be.deep.equal(
        [
          {
            name: "R2",
            description: "Agile Release",
            amount_of_sprints: 9,
            initial_date: "2016-01-01",
            final_date: "2016-12-01"
          },
          {
            name: "R1",
            description: "RUP Release",
            amount_of_sprints: 0,
            initial_date: "2016-01-01",
            final_date: "2016-10-01"
          }
        ]
      );
      done();
    });
  });

  it('should enter v-if with empty releases array', (done) => {
    const stub = sandbox.stub(HTTP, 'get').resolves({ data: [] });
    const $route = {
      params: { id: '2' },
    };

    const wrapper = shallow(Releases, { store, localVue, mocks: { $route } });
    expect(stub.calledOnce).to.be.true;

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.releases).to.be.deep.equal([]);
      expect(wrapper.vm.isReleasesEmpty()).to.be.true;
      done();
    });
  });

  it('should get releases when refreshed', (done) => {
    const stub = sandbox.stub(HTTP, 'get').resolves({ data: [{ name: 'release1', description: 'description1' }] });
    const $route = {
      params: { id: '2' },
    };

    const wrapper = shallow(Releases, { store, localVue, mocks: { $route } });

    wrapper.vm.$emit('added');

    expect(stub.called).to.be.true;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.releases).to.be.deep.equal([{ name: 'release1', description: 'description1' }]);
      done();
    });
  });
});
