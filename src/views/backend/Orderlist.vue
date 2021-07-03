<template>
  <div class="p-3">
    <div class="text-left text-black d-flex
    align-items-center mt-3 mt-lg-0 mb-4 pt-lg-5 px-0 px-md-5 font-weight-bold">
      <div class="d-flex align-items-center text-black fz_20 fz_lg_24">
        <span class="material-icons fz_30 fz_lg_36 mr-2">receipt_long</span>
        訂單列表
      </div>
    </div>
    <div>
      <ul class="listStyle_none mt-2">
        <li :key="item.id" v-for="item in pagination.currentDataList">
          <div class="card mt-3">
            <div class="card-body py-2 px-3 p-lg-3">
              <h5 class="card-title mb-0 mx-lg-4">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="tooltip_hover w_50 w_lg_25 position-relative d-flex
                  justify-content-start fz_12 fz_md_16">
                    {{ item.created.timestamp | toDate }}
                    <span class="tooltipText position-absolute w_75 w_md_25 w_lg_40 ml-3 ml_xl_6">
                      {{ item.created.timestamp | toTime }}<br/>{{ item.created.diff }}
                    </span>
                  </div>
                  <button
                    class="btn p-2 d-flex align-items-center"
                    type="button" @click="openModal(item)"
                  >
                    <span class="material-icons fz_20 fz_md_24 text-black">
                    edit
                    </span>
                  </button>
                </div>
              </h5>
              <div class="card-text mt-0 mt-lg-3">
                <div class="d-flex flex-column
                justify-content-between mx-lg-4">
                  <div class="d-flex fz_12 fz_md_16">
                    訂單編號:
                    <span class="pl-3">{{item.created.timestamp}}</span>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <ul class="listStyle_none m-0 pl-0 pt-2 w-100">
                      <li><hr class="my-2"/></li>
                      <li
                        class="d-flex flex-column w-100 fz_14 fz_lg_16"
                        v-for="( i, index ) in item.products" :key="index"
                      >
                        <div class="d-flex align-items-center justify-content-between w-100">
                          <div class="d-flex align-items-center w-75">
                            <div
                              class="card-img-top rounded-0 orderImg"
                              :style="{ background: `url(${i.product.imageUrl[0]})` }"
                            />
                            <div
                              class="d-flex flex-column justify-content-between
                              pl-3 pl-lg-4 text-left"
                            >
                              <div class="text-truncate">{{ i.product.title }}</div>
                              <span class="mt-0">x {{ i.quantity }}</span>
                            </div>
                          </div>
                          <div>{{ i.product.price | toCurrency | DollarSign }} 元</div>
                        </div>
                        <hr class="my-2"/>
                      </li>
                    </ul>
                  </div>
                  <div
                    class="d-flex flex-column align-items-end justify-content-between
                    w-100 fz_12 fz_md_16"
                  >
                    <div class="d-flex">
                      <div class="pt-2 pr-3">付款方式： {{ item.payment }}</div>
                      <div
                        v-if="item.amount < 2000"
                        class="pt-2"
                      >
                        訂單金額： {{ Math.round(item.amount) + 60 | toCurrency | DollarSign }} 元
                      </div>
                      <div
                        v-else
                        class="pt-2"
                      >
                        訂單金額： {{ Math.round(item.amount) | toCurrency | DollarSign }} 元
                      </div>
                    </div>
                    <div class="pt-2">
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
                          <div>
                            <strong
                              v-if="item.paid"
                              class="text-success"
                              >已付款</strong>
                            <span
                              v-else
                              class="text-muted"
                            >
                              尚未付款
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="modal fade" id="orderEditModal" tabindex="-1"
    role="dialog" aria-labelledby="orderEditModal" v-if="tempOrderStatus"
      aria-hidden="true">
      <OrderEditModal @update="getProducts(pagination.current_page)"
      @updateOrder="getOrders"
      :temp-order="tempOrder"/>
    </div>
    <PaginationAdmin
      :pages="pagination"
      @update-pagelist="changePageList"
      @update-page="changePage"
      @update-pagegroup="changePageGroup"
    />
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
      pagination: {
        count: 5,
        current_page: 1,
        currentDataList: [],
        totalDataList: [],
        total_pages: '',
        pageGroup: [],
        totalPageGroup: 0,
        current_group: 0,
      },
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
    getOrders() {
      this.$store.dispatch('loadingChange', true);
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders?paged=200`;
      this.$http.get(url)
        .then((res) => {
          this.$store.dispatch('loadingChange', false);
          this.tempOrderStatus = false;
          this.orderList = res.data.data;
          console.log(this.orderList);
          this.pagination.totalDataList = this.orderList;
          this.pagination.total_pages = Math.ceil(this.pagination.totalDataList.length
          / this.pagination.count);
          this.initPageList();
          this.computedPageGroup();
          $('#orderEditModal').modal('hide');
        }).catch(() => {
          this.$store.dispatch('loadingChange', false);
          this.tempOrderStatus = false;
          $('#orderEditModal').modal('hide');
        });
    },
    initPageList() {
      this.pagination.currentDataList = [];
      for (let i = ((this.pagination.current_page - 1) * this.pagination.count);
        i < (this.pagination.current_page * this.pagination.count); i += 1) {
        if (this.pagination.totalDataList[i]) {
          this.pagination.currentDataList.push(this.pagination.totalDataList[i]);
        }
      }
    },
    changePage(page) {
      this.pagination.current_page = page;
      this.initPageList();
    },
    changePageList(state) {
      if (state === 'prev' && this.pagination.current_page > 1) {
        if (this.pagination.current_page === this.pagination.pageGroup[0]) {
          this.pagination.current_group -= 1;
        }
        this.pagination.current_page -= 1;
      } else if (state === 'next' && this.pagination.current_page < this.pagination.total_pages) {
        const len = this.pagination.pageGroup.length;
        if (this.pagination.current_page === this.pagination.pageGroup[len - 1]) {
          this.pagination.current_group += 1;
        }
        this.pagination.current_page += 1;
      }
      this.computedPageGroup();
      this.initPageList();
    },
    setOrderPaid(item) {
      this.$store.dispatch('loadingChange', true);
      let url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/paid`;
      if (!item.paid) {
        url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/unpaid`;
      }
      this.$http.patch(url, item.id).then(() => {
        this.$store.dispatch('loadingChange', false);
        this.$store.dispatch('messagePush',
          {
            message: '付款狀態已修改',
            status: 'success',
          });
        this.getOrders();
      }).catch(() => {
        this.$store.dispatch('loadingChange', false);
        this.$store.dispatch('messagePush',
          {
            message: '付款狀態修改失敗，請再嘗試',
            status: 'danger',
          });
      });
    },
    openModal(item) {
      this.$store.dispatch('loadingChange', true);
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}`;
      this.$http.get(url)
        .then((res) => {
          this.tempOrderStatus = true;
          this.tempOrder = res.data.data;
          setTimeout(() => {
            this.$store.dispatch('loadingChange', false);
            $('#orderEditModal').modal('show');
          }, 500);
        }).catch(() => {
          this.$store.dispatch('loadingChange', false);
        });
    },
    computedPageGroup() {
      this.pagination.pageGroup = [];
      this.pagination.totalPageGroup = Math.ceil(this.pagination.total_pages / 5);
      for (let i = 0; i < this.pagination.totalPageGroup; i += 1) {
        if (this.pagination.current_group === i) {
          for (let j = 0; j < this.pagination.total_pages; j += 1) {
            if (j >= i * 5 && j < (i + 1) * 5) {
              this.pagination.pageGroup.push(j + 1);
            }
          }
        }
      }
    },
    changePageGroup(state) {
      if (state === 'prev') {
        if (this.pagination.current_group > 0) {
          this.pagination.current_group -= 1;
        }
      } else if (state === 'next') {
        if (this.pagination.current_group < this.pagination.totalPageGroup) {
          this.pagination.current_group += 1;
        }
      }
      this.computedPageGroup();
      [this.pagination.current_page] = this.pagination.pageGroup;
      this.initPageList();
    },
  },
  created() {
    this.getOrders();
  },
};
</script>

<style lang="scss">
.orderImg {
  height: 70px;
  width: 70px;
  background-position: center !important;
  background-size: cover !important;
  @media (min-width: 992px) {
    height: 100px;
    width: 100px;
  }
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
  right: 90%;/*調整位置*/
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 7.5px 7px 7.5px;
  border-color: transparent transparent rgba(0, 0, 0, 0.7) transparent;
  @media (min-width: 768px) {
    right: 70%;
  }
}
.tooltip_hover:hover .tooltipText {
  opacity: 1;
}
.custom-control-label{
  &::before{
    top: 2px;
    @media (min-width: 768px) {
      top: 5px;
    }
  }
  &::after{
    top: 0.25rem !important;
    @media (min-width: 768px) {
      top: 0.45rem !important;
    }
  }
}
</style>
