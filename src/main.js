import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle';
import {
  ValidationProvider, ValidationObserver, extend, configure,
  localize,
} from 'vee-validate/dist/vee-validate.full.esm';
import TW from 'vee-validate/dist/locale/zh_TW.json';
import PaginationAdmin from '@/components/PaginationAdmin.vue';
import Pagination from '@/components/Pagination.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './filters';

Vue.use(VueAwesomeSwiper);
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
Vue.component('PaginationAdmin', PaginationAdmin);
Vue.use(VueAxios, axios);
window.$ = $;

/* global $ */
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
