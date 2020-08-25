import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import $ from 'jquery';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.prototype.$bus = new Vue();
window.$ = $;
/* global $ */
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
