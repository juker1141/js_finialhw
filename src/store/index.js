import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    order: {
      user: {
        name: '',
        email: '',
        tel: '',
      },
    },
    orderId: '',
    paid: false,
    isLoading: false,
    isDarkShadyOn: false,
    cartBlockShow: false,
    productsCategory: '',
    toasts: {},
    cart: [],
    orderLoading: false,
  },
  actions: { // 操作行為
    loadingChange(context, payload) {
      context.commit('LOADING', payload);
    },
    darkShadyChange(context, payload) {
      context.commit('DARKSHADY', payload);
    },
    messagePush(context, payload) {
      context.commit('MESSAGE', payload);
    },
    categoryChange(context, payload) {
      context.commit('CATEGORY', payload);
    },
    getCart(context) {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/shopping`;
      axios.get(url)
        .then((res) => {
          context.commit('CART', res.data.data);
        });
    },
    cartBlockisShow(context, payload) {
      context.commit('CARTBLOCKSHOW', payload);
    },
    getOrderId(context, payload) {
      context.commit('ORDERID', payload);
    },
    getOrder(context, payload) {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/orders/${payload}`;
      if (payload) {
        axios.get(url)
          .then((res) => {
            context.commit('ORDER', res.data.data);
          }).catch(() => {
          });
      } else {
        context.commit('ORDERERROE');
      }
    },
    payMoney(context, payload) {
      context.commit('PAID', payload);
    },
  },
  mutations: { // 操作狀態
    LOADING(state, payload) { // 改變讀取狀態
      state.isLoading = payload;
    },
    DARKSHADY(state, payload) {
      state.isDarkShadyOn = payload;
    },
    MESSAGE(state, payload) {
      state.toasts = payload;
    },
    CATEGORY(state, payload) {
      state.productsCategory = payload;
    },
    CART(state, payload) {
      state.cart = payload;
    },
    CARTBLOCKSHOW(state, payload) {
      state.cartBlockShow = payload;
    },
    ORDERID(state, payload) {
      state.orderId = payload;
    },
    ORDER(state, payload) {
      state.order = payload;
      localStorage.removeItem('store');
      localStorage.setItem('store', JSON.stringify(state));
      state.orderLoading = true;
    },
    ORDERERROE(state) {
      this.replaceState({ ...state, ...JSON.parse(localStorage.getItem('store')) });
    },
    PAID(state, payload) {
      state.paid = payload;
    },
  },
});
