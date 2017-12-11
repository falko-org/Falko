import { HTTP } from '../../http-common';

const LOGIN = 'LOGIN';
const SET_GITHUB_AUTHENTICATION = 'SET_GITHUB_AUTHENTICATION';
const LOGOUT = 'LOGOUT';
const LINK_GITHUB = 'LINK_GITHUB';
const UNLINK_GITHUB = 'UNLINK_GITHUB';
const auth = {
  state() {
    return {
      authenticated: false,
      isGitHubAuthenticated: false,
      userId: null,
      token: null,
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
      localState.isGitHubAuthenticated = false;
    },
    [LINK_GITHUB](state) {
      const localState = state;
      localState.githubAuthenticated = true;
    },
    [UNLINK_GITHUB](state) {
      const localState = state;
      localState.githubAuthenticated = false;
    },

    [SET_GITHUB_AUTHENTICATION](state, isLinked) {
      const localState = state;
      localState.authenticated = isLinked;
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

    linkGithub({ commit }, credentials) {
      return HTTP.post('request_github_token', {
        code: credentials.code,
        id: credentials.userId,
      }, { headers: credentials.headers })
        .then(() => {
          commit(LINK_GITHUB);
        });
    },

    setGitHubAuthentication({ commit }, isGitHubAuthenticated) {
      commit(SET_GITHUB_AUTHENTICATION, isGitHubAuthenticated);
    },
  },
};

export default auth;
