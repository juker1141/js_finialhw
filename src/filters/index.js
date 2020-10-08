import Vue from 'vue';
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
