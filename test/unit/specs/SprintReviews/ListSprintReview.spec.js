import { shallow, createLocalVue } from 'vue-test-utils'
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import Revision from '../../../../src/components/Revision/ListRevision.vue';
import sinon from 'sinon';

describe('On List Sprint Review Component', () => {
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

  it('should mount and get list sprint review information correctly', (done) => {
    const $route = {
      params: { id: "2" }
    }
    const $router = {
      push: sandbox.stub()
    }
    const wrapper = shallow(Revision, { store, localVue, mocks: { $route, $router } });
    wrapper.setProps({ parent: 1})
    wrapper.setData({ newItemText: 'TS 01' })
    wrapper.vm.addNewItem()
   
    expect(wrapper.hasProp('parent', 1)).to.be.true
   
    wrapper.vm.$nextTick(() => {
      console.log(wrapper.vm.items)
      expect(wrapper.emitted('listUpdated', wrapper.vm.items, wrapper.vm.parent)).to.be.truthy;
      expect(wrapper.vm.items).to.be.deep.equal([{ id: 0, title: 'TS 01'}]);
      done();
    });
  });

  it('should remove an item correctly', () => {
    const wrapper = shallow(Revision);
    wrapper.setData({ items: [{ id: 1, title: 'Item Text' }] });

    expect(wrapper.vm.items).to.be.deep.equal([{ id: 1, title: 'Item Text' }]);
    wrapper.vm.removeItem(0);

    expect(wrapper.vm.items).to.be.empty;
    expect(wrapper.emitted('listUpdated')).not.undefined;
  });
});