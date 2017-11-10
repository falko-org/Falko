import { HTTP } from '../../http-common';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const auth = {
  state() {
    return {
      authenticated: false,
      token: null,
      userId: null,
    };
  },
  mutations: {
    [LOGIN](state, res) {
      const localState = state;
      localState.token = res.token;
      localState.userId = res.id;
      localState.authenticated = true;
    },
    [LOGOUT](state) {
      const localState = state;
      localState.token = null;
      localState.userId = null;
      localState.authenticated = false;
    },
  },
  actions: {
    login({ commit }, credentials) {
      return HTTP.post('authenticate', {
        email: credentials.email,
        password: credentials.password,
      })
        .then((response) => {
          const res = { token: response.data.auth_token, id: response.data.user.id };
          commit(LOGIN, res);
        });
    },

    logout({ commit }) {
      commit(LOGOUT);
    },
  },
};

export default auth;
