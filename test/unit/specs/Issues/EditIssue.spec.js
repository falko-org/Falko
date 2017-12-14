// import Vuex from 'vuex';
// import sinon from 'sinon';
// import { shallow, createLocalVue } from 'vue-test-utils';
// import { HTTP } from '../../../../src/http-common';
// import EditIssue from '../../../../src/components/Issues/EditIssue.vue';
//
// describe('On Edit Issue', () => {
//   const localVue = createLocalVue();
//   localVue.use(Vuex);
//   // localVue.use(VeeValidate);
//   const sandbox = sinon.createSandbox();
//   let state;
//   let actions;
//   let store;
//
//   beforeEach(() => {
//     state = {
//       auth: {
//         token: '12345',
//         userId: '1',
//       },
//     };
//
//     store = new Vuex.Store({
//       state,
//     });
//   });
//
//   afterEach(() => {
//     sandbox.reset();
//     sandbox.restore();
//   });
//
//   it('should edit a issue correctly', (done) => {
//     const httpGetStub = sandbox.stub(HTTP, 'get').resolves({ data: 200 });
//     const httpStub = sandbox.stub(HTTP, 'put').resolves({ data: 200 });
//     const $route = {
//       params: { id: '2' },
//     };
//     const wrapper = shallow(EditIssue, {
//       propsData: {
//         selected_issue: {number: 2}
//       }, store, localVue, mocks: { $route } });
//
//     wrapper.vm.editIssue();
//
//     expect(httpStub.called).to.be.true;
//     wrapper.vm.$nextTick(() => {
//       expect(wrapper.emitted('updated-issue')).to.be.truthy;
//       done();
//     });
//   });
//
//   it('should get Issues Information correctly', () => {
//     const httpGetStub = sandbox.stub(HTTP, 'get').resolves({ data: 200 });
//     const $route = {
//       params: { id: '2' },
//     };
//     const wrapper = shallow(EditIssue, {
//       propsData: {
//         selected_issue: {name: "Name", number: 2, body: "Body"}
//       }, store, localVue, mocks: { $route } });
//
//     wrapper.vm.getIssuesInformation();
//
//     expect(wrapper.vm.name).to.be.equals("Name");
//     expect(wrapper.vm.number).to.be.equals(2);
//     expect(wrapper.vm.body).to.be.equals("Body");
//   });
//
//   it('should set Assignees correctly', () => {
//     const httpStub = sandbox.stub(HTTP, 'post').resolves({ data: 200 });
//     const httpGetStub = sandbox.stub(HTTP, 'get').resolves({ data: 200 });
//     const $route = {
//       params: { id: '2' },
//     };
//     const wrapper = shallow(EditIssue, {
//       propsData: {
//         selected_issue: {name: "Name", number: 2, body: "Body"}
//       }, store, localVue, mocks: { $route } });
//
//     wrapper.vm.setAssignees();
//
//     expect(httpStub.called).to.be.true;
//
//   });
//
//
// });
