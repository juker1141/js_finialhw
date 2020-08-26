<template>
  <div>
    <h2>這是訂單頁面</h2>
    <table class="table mt-2 rounded">
      <thead class="alert-success">
        <tr>
          <th class="text-center border-0" width="120">下單時間</th>
          <th class="text-center border-0" width="120">購買款項</th>
          <th class="text-center border-0" width="120">牌價</th>
          <th class="text-center border-0" width="120">售價</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.id" v-for="item in orderList">
          <th class="text-center p-3" scope="row">
            {{ item.created.timestamp | toDate }} <br/>
            {{ item.created.timestamp | toTime }}
          </th>
          <td class="text-center p-3">
            <ul class="listStyle_none">
              <li v-for="i in item.products" :key="i">
                {{ i.product.title }}
              </li>
            </ul>
          </td>
          <!-- <td class="text-center p-3">{{ item.product.title}}</td>
          <td class="text-center p-3">{{ item.origin_price }}</td>
          <td class="text-center p-3">{{ item.price }}</td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      orderList: {},
      order: {},
    };
  },
  filters: {
    toDate(time) {
      const date = new Date(time * 1000); // 因為一般 timestamp 取得的是秒數，但要帶入的是毫秒，所以要乘 1000
      return date.toLocaleDateString();
    },
    toTime(time) {
      const date = new Date(time * 1000);
      return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },
  },
  methods: {
    getOrders() {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders`;
      this.$http.get(url).then((res) => {
        console.log(res);
        this.orderList = res.data.data;
      });
    },
    getOrder(id) {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders/${id}`;
      this.$http.get(url).then((res) => {
        console.log(res);
        this.order = res.data.data;
      });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
