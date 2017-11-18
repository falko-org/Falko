const SET_PROJECT = "SET_PROJECT";

const clientStatus = {
  state() {
    return {
      projectId: null,
    }
  },
  mutations: {
    [SET_PROJECT](state, id) {
       console.log(id);
        state.projectId = id;
    },
  },
  actions: {
    setProject({commit}, projectId) {
      commit(SET_PROJECT, projectId);
    }
  }
}
export default clientStatus;
