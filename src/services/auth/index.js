import { HTTP } from '../../http-common';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const LINK_GITHUB = 'LINK_GITHUB';
const UNLINK_GITHUB = 'UNLINK_GITHUB';
const auth = {
  state() {
    return {
      authenticated: false,
      token: null,
      userId: null,
      githubAuthenticated: false,
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
    [LINK_GITHUB](state) {
      const localState = state;
      localState.githubAuthenticated = true;
    },
    [UNLINK_GITHUB](state) {
      const localState = state;
      localState.githubAuthenticated = false;
    }
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

    linkGithub({ commit }, credentials) {
      return HTTP.post('request_github_token', {
        code: credentials.code,
        id: credentials.userId,
      }, { headers: credentials.headers })
        .then((response) => {
          commit(LINK_GITHUB);
        })
    }
  },
};

export default auth;
