const SET_PROJECT = 'SET_PROJECT';
const SET_GITHUB_SLUG = 'SET_GITHUB_SLUG';
const SET_RELEASE_INITIAL_DATE = 'SET_RELEASE_INITIAL_DATE';
const SET_RELEASE_FINAL_DATE = 'SET_RELEASE_FINAL_DATE';

const clientStatus = {
  state() {
    return {
      projectId: null,
      githubSlug: null,
      releaseInitialDate: null,
      releaseFinalDate: null,
    };
  },
  mutations: {
    [SET_PROJECT](state, id) {
      const localState = state;
      localState.projectId = id;
    },

    [SET_GITHUB_SLUG](state, slug) {
      state.githubSlug = slug;
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

    setGithubSlug({ commit }, slug) {
      commit(SET_GITHUB_SLUG, slug);
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
