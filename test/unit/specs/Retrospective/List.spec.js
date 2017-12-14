import sinon from 'sinon';
import { shallow } from 'vue-test-utils';
import List from '../../../../src/components/Retrospective/List.vue';

describe('On List component retrospective', () => {
  const sandbox = sinon.createSandbox();

  beforeEach(() => {

  });

  afterEach(() => {
    sandbox.reset();
    sandbox.restore();
  });

  it('should add an item correctly', () => {
    const wrapper = shallow(List);
    wrapper.setData({ newItemText: 'Item Text' });
    wrapper.vm.addNewItem();
    expect(wrapper.vm.items).to.be.deep.equal([{ id: 1, title: 'Item Text' }]);
    expect(wrapper.emitted('listUpdated')).not.undefined;
  });

  it('should remove an item correctly', () => {
    const wrapper = shallow(List);
    wrapper.setData({ items: [{ id: 1, title: 'Item Text' }] });

    expect(wrapper.vm.items).to.be.deep.equal([{ id: 1, title: 'Item Text' }]);
    wrapper.vm.removeItem(0);

    expect(wrapper.vm.items).to.be.empty;
    expect(wrapper.emitted('listUpdated')).not.undefined;
  });
});
