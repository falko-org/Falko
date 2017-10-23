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
    [LOGIN] (state, token, userId) {
      console.log(token);
      localStorage.setItem('token', JSON.stringify(token));
      state.token = token;
      console.log(userId);
      localStorage.setItem('user_id', JSON.stringify(userId));      
      state.userId = userId;

      state.authenticated = true;
    },
    [LOGOUT] (state) {
      localStorage.removeItem('token');
      state.token = null;

      localStorage.removeItem('user_id');
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
        console.log("Entrou no then da store: " + response.code)
        commit(LOGIN, { token: response.data.auth_token, userId: response.data.user.id });
      });
    },

    logout({ commit }) {
      commit(LOGOUT);
    },
  },
  getters: {
    isLoggedIn: state => state.authenticated,
    getToken: state => state.token,
    getUserId: state => state.userId
  }
};

export default auth
