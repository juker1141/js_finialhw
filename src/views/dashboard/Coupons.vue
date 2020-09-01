<template>
  <div class="p-3">
    <div class="d-flex align-items-center justify-content-between
    mb-5 pt-lg-5 px-5 px-md-6">
      <h3 class="d-flex align-items-center text-black">
        <span class="material-icons fz_30 mr-3">local_activity</span>
        優惠卷
      </h3>
      <button class="btn d-flex align-items-center" type="button"
      @click="openModal('new')">
        <span class="material-icons mr-2">
        add
        </span>
        新增優惠卷
      </button>
    </div>
    <table class="table mt-2 rounded">
      <thead class="alert-success">
        <tr>
          <th class="text-center border-0 table_w_15">名稱</th>
          <th class="text-center border-0 table_w_20">序號</th>
          <th class="text-center border-0 table_w_10">折扣百分比</th>
          <th class="text-center border-0 table_w_20">到期日</th>
          <th class="text-center border-0 table_w_10">是否啟用</th>
          <th class="text-center border-0 table_w_10"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td class="text-center p-3" scope="row">{{ item.title }}</td>
          <th class="text-center p-3">{{ item.code }}</th>
          <td class="text-center p-3">{{ item.percent }}</td>
          <td class="text-center p-3">{{ item.deadline.datetime }}</td>
          <td class="text-center p-3">{{ item.enabled }}</td>
          <td class="text-center p-3">
            <div class="d-flex justify-content-center">
              <button class="btn
              d-flex align-items-center p-0 mr-2 mr-md-3"
              type="button" @click="openModal('edit', item)">
                <span class="material-icons">
                edit
                </span>
              </button>
              <button class="btn
              d-flex align-items-center p-0" type="button" @click="openModal('delete', item)">
                <span class="material-icons">
                delete
                </span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
    aria-labelledby="couponModal" aria-hidden="true">
      <div class="modal-dialog w_max_50" role="document">
        <div class="modal-content">
          <div class="modal-header text-black border-bottom-0">
            <h5 class="modal-title">新增優惠卷</h5>
            <button type="button" class="btn m-0 p-0 d-flex align-items-center close opacity_1"
            data-dismiss="modal" aria-label="Close">
              <span class="material-icons">clear</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="text-left w-100 ml-2" for="title">名稱</label>
              <input type="text" class="form-control form-control-lg border-black" id="title"
              aria-describedby="title" placeholder="請輸入名稱" v-model="tempCoupon.title">
            </div>
            <div class="form-group">
              <label class="text-left w-100 ml-2" for="code">序號</label>
              <input type="text" class="form-control form-control-lg border-black" id="code"
              aria-describedby="code" placeholder="請輸入序號" v-model="tempCoupon.code">
            </div>
            <div class="form-group">
              <label class="text-left w-100 ml-2" for="percent">百分比</label>
              <input type="text" class="form-control form-control-lg border-black"
              id="percent"
              aria-describedby="percent" placeholder="請輸入折扣百分比" v-model="tempCoupon.percent">
            </div>
            <div class="form-group">
              <label class="text-left w-100 ml-2" for="due_date">到期日</label>
              <input type="date" class="form-control form-control-lg border-black"
              id="due_date"
              aria-describedby="due_date"
              v-model="due_date">
            </div>
            <div class="form-group">
              <label class="text-left w-100 ml-2" for="due_time">到期時間</label>
              <input type="time" class="form-control form-control-lg border-black"
              id="due_time" step="1"
              aria-describedby="due_time"
              v-model="due_time">
            </div>
            <div class="form-group d-flex align-items-center">
              <input type="checkbox" class="border-black ml-2"
              id="enabled"
              aria-describedby="is_enabled" v-model="tempCoupon.enabled">
              <label class="form-check-label text-left ml-2" for="enabled">是否啟用</label>
            </div>
          </div>
          <div class="modal-footer border-top-0">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateCoupons()">建立優惠卷</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        enabled: false,
        percent: 100,
        deadline_at: 0,
        code: '',
      },
      isNew: true,
      due_date: '',
      due_time: '',
    };
  },
  methods: {
    getCoupons() {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupons`;
      this.$http.get(url)
        .then((res) => {
          this.coupons = res.data.data;
          console.log(res);
        });
    },
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.isNew = true;
          this.tempCoupon = {};
          $('#couponModal').modal('show');
          break;
          // 由於 const 與 let 宣告環境較特別，故需要在 case 外層宣告一個 {} 確保作用域
        case 'edit': {
          this.isNew = false;
          this.tempCoupon = { ...item };
          console.log(this.tempCoupon);
          // 使用 split 切割相關時間戳
          const dedlineAt = this.tempCoupon.deadline.datetime.split(' ');
          [this.due_date, this.due_time] = dedlineAt; // 日期
          $('#couponModal').modal('show');
          break;
        }
        case 'delete':
          $('#delProductModal').modal('show');
          this.tempProduct = { ...item };
          break;
        default:
          break;
      }
    },
    updateCoupons() {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon/{id}`;
      let httpMethod = 'post';
      // 當不是新增商品時則切換成編輯商品 API
      if (!this.isNew) {
        url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}
        /admin/ec/product/${this.tempProduct.id}`;
        httpMethod = 'patch';
      }
      console.log(this.isNew);
      this.$http[httpMethod](url, this.tempProduct)
        .then(() => {
          $('#productModal').modal('hide');
          this.$emit('update');
        }).catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
