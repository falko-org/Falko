import { shallow } from 'vue-test-utils'
import IsScoring from '../../../../src/components/Score/IsScoring.vue';
import sinon from 'sinon';


describe('On IsScoring component', () => {
  const sandbox = sinon.createSandbox();

  beforeEach(() => {

  });

  afterEach(() => {
    sandbox.reset();
    sandbox.restore();
  });

  it('should check that isScoring is empty string', () => {
    const wrapper = shallow(IsScoring);
    expect(wrapper.vm.isScoring).to.be.equals('');
  });

  it('should check that isScoring is true', () => {
    const wrapper = shallow(IsScoring);
    wrapper.vm.toggleButtonChanged({value: true});

    expect(wrapper.vm.isScoring).to.be.true;
  });

  it('should check that isScoring is false', () => {
    const wrapper = shallow(IsScoring);
    wrapper.vm.toggleButtonChanged({value: false});

    expect(wrapper.vm.isScoring).to.be.false;
  });

  it('should check that isScoring is from props', () => {
    const wrapper = shallow(IsScoring);
    wrapper.setProps({is_scoring: true})
    wrapper.vm.getScoreInformation();

    expect(wrapper.vm.isScoring).to.be.true;
  });
});