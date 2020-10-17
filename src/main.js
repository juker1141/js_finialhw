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
// 載入中文語言包
localize('zh_TW', TW);

// Register it globally，表單驗證套件
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
// 使用swiper套件
Vue.use(VueAwesomeSwiper);
// 載入全域分頁套件
Vue.component('Pagination', Pagination);
Vue.component('PaginationAdmin', PaginationAdmin);
// 在全域使用axios
Vue.use(VueAxios, axios);
// 關閉Vue自動生成的提示訊息，在編碼的時候那些訊息沒有用處!!
Vue.config.productionTip = false;
// 註冊jquery
window.$ = $;
/* global $ */

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
