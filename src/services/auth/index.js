import { HTTP } from '../../http-common'

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const auth = {
  state() {
    return {
      authenticated: false,
      token: null,
      userId: null
    }
  },
  mutations: {
    [LOGIN] (state, res) {
      state.token = res.token;
      state.userId = res.id;
    
      state.authenticated = true;
    },
    [LOGOUT] (state) {
      state.token = null;
      state.userId = null;

      state.authenticated = false;
    }
  },
  actions: {
    login({ commit }, credentials) {
      return HTTP.post('authenticate', {
        email: credentials.email,
        password: credentials.password
      })
      .then((response) => {
        const res = { token: response.data.auth_token, id: response.data.user.id };
        commit(LOGIN, res);
      });
    },

    logout({ commit }) {
      commit(LOGOUT);
    },
  }
};

export default auth
