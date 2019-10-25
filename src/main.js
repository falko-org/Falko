// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueChart from 'vue-chart-js';
import VeeValidate from 'vee-validate';
import ToggleButton from 'vue-js-toggle-button';
import App from './App.vue';
import router from './router';
import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader

const vuetifyOptions = { }

Vue.use(Vuetify);
Vue.use(ToggleButton);
Vue.use(VeeValidate);
Vue.use(VueChart);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify: new Vuetify(vuetifyOptions),
  template: '<App/>',
  components: { App, VueChart },
});
