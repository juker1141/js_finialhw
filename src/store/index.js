import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    order: {},
    orderId: '',
    paid: false,
    isLoading: false,
  },
  actions: { // 操作行為
    changeLoading(context, payload) {
      context.commit('LOADING', payload);
    },
    getOrderId(context, payload) {
      context.commit('ORDERID', payload);
    },
    getOrder(context, payload) {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/orders/${payload}`;
      axios.get(url)
        .then((res) => {
          context.commit('ORDER', res.data.data);
        });
    },
    payMoney(context, payload) {
      context.commit('PAID', payload);
    },
  },
  mutations: { // 操作狀態
    LOADING(state, payload) { // 改變讀取狀態
      state.isLoading = payload;
    },
    ORDERID(state, payload) {
      state.orderId = payload;
    },
    ORDER(state, payload) {
      state.order = payload;
    },
    PAID(state, payload) {
      state.paid = payload;
    },
  },
});
