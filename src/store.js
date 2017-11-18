import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import auth from './services/auth/index';
import clientStatus from './services/clientStatus/index'

Vue.use(Vuex);
const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: localStorage,
  modules: ['auth', 'clientStatus'],
});

const store = new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  modules: {
    auth,
    clientStatus,
  },
});

export default store;
