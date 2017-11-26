import { HTTP } from '../../http-common';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const auth = {
  state() {
    return {
      authenticated: false,
      isGitHubAuthenticated: false,
      userId: null,
      token: null,
    };
  },
  mutations: {
    [LOGIN](state, res) {
      const localState = state;
      localState.token = res.token;
      localState.userId = res.id;
      localState.authenticated = true;
      localState.isGitHubAuthenticated = res.isGitHubAuthenticated;
    },
    [LOGOUT](state) {
      const localState = state;
      localState.token = null;
      localState.userId = null;
      localState.authenticated = false;
      localState.isGitHubAuthenticated = false;
    },
  },
  actions: {
    login({ commit }, credentials) {
      return HTTP.post('authenticate', {
        email: credentials.email,
        password: credentials.password,
      })
        .then((response) => {
          let res;
          const headers = { Authorization: response.data.auth_token };

          HTTP.get(`users/${response.data.user.id}`, { headers })
            .then((secondResponse) => {
              let isGitHubAuthenticated;

              if (secondResponse.data.access_token != null) {
                isGitHubAuthenticated = true;
              } else {
                isGitHubAuthenticated = false;
              }

              res = {
                token: response.data.auth_token,
                id: response.data.user.id,
                isGitHubAuthenticated,
              };

              commit(LOGIN, res);
            });
        });
    },

    logout({ commit }) {
      commit(LOGOUT);
    },
  },
};

export default auth;
