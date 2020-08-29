import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle';
import {
  ValidationProvider, ValidationObserver, extend, configure,
  localize,
} from 'vee-validate/dist/vee-validate.full.esm';
import TW from 'vee-validate/dist/locale/zh_TW.json';
import App from './App.vue';
import router from './router';
import Pagination from './components/Pagination.vue';

// Add a rule.
extend('secret', {
  validate: (value) => value === 'example',
  message: 'This is not the magic word',
});
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});
localize('zh_TW', TW);

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false;
Vue.component('Pagination', Pagination);
Vue.use(VueAxios, axios);
Vue.prototype.$bus = new Vue();
window.$ = $;

// filter全域註冊

// 千分號 filter
Vue.filter('toCurrency', (price) => {
  if (!price) return undefined;
  const parts = price.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ', ');
  return parts.join('.');
});
// 錢字號 filter
Vue.filter('DollarSign', (price) => `$ ${price}`);

/* global $ */
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
