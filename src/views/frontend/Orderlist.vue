<template>
  <div class="container mb-9">
    <div class="row pt-7">
      <div class="col-12 col-lg-10 offset-lg-1">
        <div class="d-flex">
          <a :class="{ navItem_active : paid === false}" class="navItem text-decoration-none
          rounded-0 fz_lg_24 py-2 py-lg-3 w-50" @click="paid = false" href="#">未付款</a>
          <a :class="{ navItem_active : paid === true}" class="navItem text-decoration-none
          rounded-0 fz_lg_24 py-2 py-lg-3 w-50" @click="paid = true" href="#">已付款</a>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-lg-10 offset-lg-1">
        <div v-show="item.paid === paid" :key="item.id" v-for="item in orderList">
          <div class="card mt-3">
            <div class="card-body p-3">
              <h5 class="card-title mb-1 mb-lg-2">
                <div class="tooltip_hover w_xl_25 position-relative d-flex
                justify-content-start fz_14 fz_md_16">
                  {{ item.created.timestamp | toDate }}
                  <span class="tooltipText position-absolute w-25 ml-3 ml_xl_6">
                    {{ item.created.timestamp | toTime }}<br/>{{ item.created.diff }}
                  </span>
                </div>
              </h5>
              <div class="card-text mt-0 mt-lg-3">
                <div class="d-flex flex-column
                justify-content-between mx-lg-4">
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
                    w-100 fz_14 fz_lg_16"
                  >
                    <div>
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
                    <div class="pt-2">{{ item.payment }}</div>
                    <div class="pt-2">
                      <div v-if="item.paid" class="text-success font-weight-bold py-2">
                        付款完成
                      </div>
                      <div v-else class="text-danger d-flex align-items-center">
                        尚未付款
                        <div v-if="!item.paid" class="d-flex justify-content-end mt-1">
                          <a href="#" @click="goToPay(item.id)" class="btn btn-black
                          text-decoration-none rounded-0 p-1 px-3 ml-3">
                            前往付款
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      this.$store.dispatch('loadingChange', true);
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/ec/orders?page=${num}&paged=10`;
      this.$http.get(url)
        .then((res) => {
          this.orderList = res.data.data;
          console.log(this.orderList);
          this.$store.dispatch('loadingChange', false);
        }).catch(() => {
          this.$store.dispatch('loadingChange', false);
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
.navItem{
  color: #121212;
  &.navItem_active {
    background: #121212;
    color: #fff;
  }
}
.orderListImg{
  height: 90px;
  width: 90px;
}
.ml_xl_6{
  @media (min-width: 1200px) {
    margin-left: 48px !important;
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
