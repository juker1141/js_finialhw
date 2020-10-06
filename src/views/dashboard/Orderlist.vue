<template>
  <div class="p-3">
    <h3 class="text-left text-black d-flex
    align-items-center mt-3 mt-lg-0 mb-5 pt-lg-5 px-0 px-md-6">
      <span class="material-icons fz_30 mr-3">receipt_long</span>
      訂單列表
    </h3>
    <table class="table mt-2 rounded" width="400">
      <thead class="alert-success">
        <tr>
          <th class="text-center border-0 table_w_1 table_w_md_5"></th>
          <th class="text-center border-0 table_w_3 table_w_md_10 fz_12 fz_md_16">下單時間</th>
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
        <tr :key="item.id" v-for="item in orderList">
          <th class="text-center p-1 p-md-2 p-lg-3 h-100">
            <button class="btn p-1 px-2" type="button" @click="openModal(item)">
              <i class="fas fa-mouse-pointer fz_14 fz_md_20 text-black"></i>
            </button>
          </th>
          <td class="text-center p-1 p-md-2 p-lg-3
          d-flex justify-content-center align-items-center">
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
                <div class="d-flex justify-content-between fz_12 fz_md_16">{{ i.product.title }}
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
            <div v-if="item.amount < 2000" class="pt_6">
            NT {{ Math.round(item.amount) + 60 | toCurrency | DollarSign }} 元</div>
            <div v-else
            class="pt_6">NT {{ Math.round(item.amount) | toCurrency | DollarSign }} 元</div>
          </td>
          <td class="text-center p-1 p-md-2 p-lg-3 d-none d-xl-table-cell">
            <div class="pt_6">{{ item.payment }}</div>
          </td>
          <td class="text-center p-1 p-md-2 p-lg-3">
            <div class="pt_6">
              <div class="custom-control custom-switch">
                <input
                  :id="item.id"
                  v-model="item.paid"
                  type="checkbox"
                  class="custom-control-input"
                  @change="setOrderPaid(item)"
                >
                <label
                  class="custom-control-label"
                  :for="item.id">
                  <div class="d-none d-md-block">
                    <strong
                      v-if="item.paid"
                      class="text-success"
                      >已付款</strong>
                    <span
                      v-else
                      class="text-muted"
                      >尚未付款</span>
                  </div>
                </label>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="modal fade" id="orderEditModal" tabindex="-1"
    role="dialog" aria-labelledby="orderEditModal" v-if="tempOrderStatus"
      aria-hidden="true">
      <OrderEditModal @update="getProducts(pagination.current_page)"
      @updateOrder="getOrders"
      :temp-order="tempOrder"/>
    </div>
    <PaginationAdmin :pages="pagination" @update-pages="getOrders"/>
  </div>
</template>

<script>
/* global $ */
import OrderEditModal from '@/components/OrderEditModal.vue';

export default {
  data() {
    return {
      orderList: {},
      tempOrder: {},
      pagination: {},
      tempOrderStatus: false,
    };
  },
  components: {
    OrderEditModal,
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
    getOrders(num = 1) {
      this.$bus.$emit('loadingChange', true);
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders?page=${num}&paged=10`;
      this.$http.get(url)
        .then((res) => {
          this.$bus.$emit('loadingChange', false);
          this.tempOrderStatus = false;
          this.orderList = res.data.data;
          this.pagination = res.data.meta.pagination;
          $('#orderEditModal').modal('hide');
        }).catch(() => {
          this.$bus.$emit('loadingChange', false);
          this.tempOrderStatus = false;
          $('#orderEditModal').modal('hide');
        });
    },
    setOrderPaid(item) {
      this.$bus.$emit('loadingChange', true);
      let url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/paid`;
      if (!item.paid) {
        url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/unpaid`;
      }
      this.$http.patch(url, item.id).then(() => {
        this.$bus.$emit('loadingChange', false);
        this.$bus.$emit('message:push', '付款狀態已修改', 'success');
        this.getOrders();
      }).catch(() => {
        this.$bus.$emit('loadingChange', false);
        this.$bus.$emit('message:push', '付款狀態修改失敗，請再嘗試', 'danger');
      });
    },
    openModal(item) {
      this.$bus.$emit('loadingChange', true);
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}`;
      this.$http.get(url)
        .then((res) => {
          this.tempOrderStatus = true;
          this.tempOrder = res.data.data;
          setTimeout(() => {
            this.$bus.$emit('loadingChange', false);
            $('#orderEditModal').modal('show');
          }, 500);
        });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>

<style lang="scss">
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
  transition: ease-in-out .5s;
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
