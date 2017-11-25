const SET_PROJECT = 'SET_PROJECT';
const SET_RELEASE = 'SET_RELEASE';
const SET_RELEASE_INDEX = 'SET_RELEASE_INDEX';
const SET_ISSUE = 'SET_ISSUE';


const clientStatus = {
  state() {
    return {
      projectId: null,
      releaseId: null,
      releaseIndex: 0,
      issueId: null,
    };
  },
  mutations: {
    [SET_PROJECT](state, id) {
      state.projectId = id;
    },

    [SET_RELEASE](state, id) {
      state.releaseId = id;
    },

    [SET_RELEASE_INDEX](state, index) {
      state.releaseIndex = index;
    },

    [SET_ISSUE](state, id) {
      state.issueId = id;
    },
  },
  actions: {
    setProject({ commit }, projectId) {
      commit(SET_PROJECT, projectId);
    },

    setRelease({ commit }, releaseId) {
      commit(SET_RELEASE, releaseId);
    },

    setReleaseIndex({ commit }, releaseIndex) {
      commit(SET_RELEASE_INDEX, releaseIndex);
    },

    setIssue({ commit }, issueId) {
      commit(SET_ISSUE, issueId);
    },
  },
};
export default clientStatus;
