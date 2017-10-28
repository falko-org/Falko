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
      console.log(res);

      localStorage.setItem('token', JSON.stringify(res.token));
      state.token = res.token;
      localStorage.setItem('user_id', JSON.stringify(res.id));      
      state.userId = res.id;
    
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
        console.log(response.data.user.id);
        const res = { token: response.data.auth_token, id: response.data.user.id };
        commit(LOGIN, res);
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
