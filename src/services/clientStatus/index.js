const SET_PROJECT = 'SET_PROJECT';
const SET_RELEASE_INITIAL_DATE = 'SET_RELEASE_INITIAL_DATE';
const SET_RELEASE_FINAL_DATE = 'SET_RELEASE_FINAL_DATE';

const clientStatus = {
  state() {
    return {
      projectId: null,
      releaseInitialDate: null,
      releaseFinalDate: null,
    };
  },
  mutations: {
    [SET_PROJECT](state, id) {
      const localState = state;
      localState.projectId = id;
    },

    [SET_RELEASE_INITIAL_DATE](state, date) {
      const localState = state;
      localState.releaseInitialDate = date;
    },

    [SET_RELEASE_FINAL_DATE](state, date) {
      const localState = state;
      localState.releaseFinalDate = date;
    },
  },
  actions: {
    setProject({ commit }, projectId) {
      commit(SET_PROJECT, projectId);
    },

    setReleaseInitialDate({ commit }, releaseInitialDate) {
      commit(SET_RELEASE_INITIAL_DATE, releaseInitialDate);
    },

    setReleaseFinalDate({ commit }, releaseFinalDate) {
      commit(SET_RELEASE_FINAL_DATE, releaseFinalDate);
    },
  },
};
export default clientStatus;
