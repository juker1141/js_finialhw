import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle';
import App from './App.vue';
import router from './router';
import Pagination from './components/Pagination.vue';

Vue.config.productionTip = false;
Vue.component('Pagination', Pagination);
Vue.use(VueAxios, axios);
Vue.prototype.$bus = new Vue();
window.$ = $;
/* global $ */
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
