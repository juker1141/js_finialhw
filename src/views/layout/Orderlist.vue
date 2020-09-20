<template>
  <div class="container mb-9">
    <div class="row pt-7">
      <div class="col-12">
        <div class="d-flex">
          <a :class="{ navItem_active : paid === false}" class="navItem text-decoration-none
          rounded-0 fz_lg_24 py-2 py-lg-3 w-50" @click="paid = false" href="#">未付款</a>
          <a :class="{ navItem_active : paid === true}" class="navItem text-decoration-none
          rounded-0 fz_lg_24 py-2 py-lg-3 w-50" @click="paid = true" href="#">已付款</a>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <table class="table mt-2 rounded" width="400">
          <thead class="bg-gray">
            <tr>
              <th class="text-center border-0 table_w_7 table_w_md_10 fz_12 fz_md_16">下單時間</th>
              <th class="text-center border-0 table_w_7 table_w_md_15 fz_12 fz_md_16">購買款項</th>
              <th class="text-center border-0 table_w_10 d-none d-xl-table-cell">單價</th>
              <th class="text-center border-0 table_w_10 fz_12 fz_md_16">
              <span class="d-none d-md-inline-block">應付</span>金額
              </th>
              <th class="text-center border-0 table_w_10 d-none d-xl-table-cell">付款方式</th>
              <th class="text-center border-0 table_w_10 table_w_md_10 fz_12 fz_md_16">是否付款</th>
            </tr>
          </thead>
          <tbody>
            <tr v-show="item.paid === paid" :key="item.id" v-for="item in orderList">
              <td class="text-center p-1 p-md-2 p-lg-3">
                <div class="tooltip_hover position-relative d-flex justify-content-center pt_6
                fz_12 fz_md_16">
                  {{ item.created.timestamp | toDate }}
                  <span class="tooltipText position-absolute ml-7">
                    {{ item.created.timestamp | toTime }}<br/>{{ item.created.diff }}
                  </span>
                </div>
              </td>
              <td class="text-left p-1 p-md-2 p-lg-3">
                <ul class="listStyle_none m-0 pl-0 pt_6">
                  <li class="mb-1" v-for="( i, index ) in item.products" :key="index">
                    <div class="d-flex justify-content-between fz_12 fz_md_16">
                    {{ i.product.title }}<span class="d-xl-none">x{{ i.quantity }}</span>
                      <span class="d-none d-xl-table-cell">
                      {{ i.quantity }} {{ i.product.unit }}
                      </span>
                    </div>
                  </li>
                </ul>
              </td>
              <td class="text-center p-1 p-md-2 p-lg-3 d-none d-xl-table-cell">
                <ul class="listStyle_none m-0 pl-0 pt_6">
                  <li class="mb-1" v-for="(i, index) in item.products" :key="index">
                    {{ i.product.price | toCurrency | DollarSign }} 元
                  </li>
                </ul>
              </td>
              <td class="text-center py-1 px-0 p-md-2 p-lg-3 fz_12 fz_md_16">
                <div v-if="item.amount < 2000"
                class="pt_6">{{ Math.round(item.amount) + 60 | toCurrency | DollarSign }} 元</div>
                <div v-else
                class="pt_6">{{ Math.round(item.amount) | toCurrency | DollarSign }} 元</div>
              </td>
              <td class="text-center p-1 p-md-2 p-lg-3 d-none d-xl-table-cell">
                <div class="pt_6">{{ item.payment }}</div>
              </td>
              <td class="text-center p-1 p-md-2 p-lg-3">
                <div class="pt_6">
                  <div v-if="item.paid" class="text-success font-weight-bold">
                    已付款
                  </div>
                  <div v-else class="text-danger d-flex flex-column align-items-center">
                    未付款
                    <buttuon @click="goToPay(item.id)"
                    class="btn btn-yellow mt-1 mt-lg-3" type="button">
                      前往付款
                    </buttuon>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderList: {},
      paid: false,
    };
  },
  filters: {
    toDate(timestamp) {
      const date = new Date(timestamp * 1000); // 因為一般 timestamp 取得的是秒數，但要帶入的是毫秒，所以要乘 1000
      return date.toLocaleDateString();
    },
    toTime(timestamp) {
      const date = new Date(timestamp * 1000);
      const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      return time;
    },
  },
  methods: {
    getOrderlist(num = 1) {
      this.$bus.$emit('loadingChange', true);
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/orders?page=${num}&paged=10`;
      this.$http.get(url)
        .then((res) => {
          this.orderList = res.data.data;
          this.$bus.$emit('loadingChange', false);
        }).catch(() => {
          this.$bus.$emit('loadingChange', false);
        });
    },
    goToPay(id) {
      this.$store.dispatch('getOrderId', id);
      this.$store.dispatch('payMoney', false);
      if (localStorage.getItem('store')) {
        localStorage.removeItem('store');
      }
      setTimeout(() => {
        this.$router.push('/payment');
      }, 0);
    },
  },
  created() {
    this.getOrderlist();
  },
};
</script>

<style lang="scss">
.navItem{
  color: #121212;
  &.navItem_active {
    background: #121212;
    color: #fff;
  }
  &:hover {
    background: gray;
    color: #fff;
  }
}
.orderListImg{
  height: 90px;
  width: 90px;
}
.tooltip_hover{
  opacity: 1;
}
.tooltipText {
  width: 110%;
  padding: 5px;
  opacity: 0;
  font-size: .8em;
  border-radius: 3px;
  text-align: center;
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  bottom: -55px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
}
.tooltipText::before{
  content: "";/*讓before顯示出來*/
  position: absolute;
  top: -7px; /*調整位置*/
  right: 70%;/*調整位置*/
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 7.5px 7px 7.5px;
  border-color: transparent transparent rgba(0, 0, 0, 0.7) transparent;
}
.tooltip_hover:hover .tooltipText {
  opacity: 1;
}
</style>
