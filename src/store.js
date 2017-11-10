import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import auth from './services/auth/index';

Vue.use(Vuex);
const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
  modules: ['auth'],
});

const store = new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  modules: {
    auth,
  },
});

export default store;
