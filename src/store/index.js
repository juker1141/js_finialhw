import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    order: {},
    orderId: '',
  },
  actions: { // 操作行為
    getOrderId(context, payload) {
      context.commit('ORDERID', payload);
    },
    getOrder(context, payload) {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/orders/${payload}`;
      axios.get(url)
        .then((res) => {
          console.log(res);
          context.commit('ORDER', res.data.data);
        });
    },
  },
  mutations: { // 操作狀態
    ORDERID(state, payload) {
      state.orderId = payload;
    },
    ORDER(state, payload) {
      state.order = payload;
    },
  },
});
