<template>
  <div class="p-3">
    <div class="text-left text-black d-flex
    align-items-center justify-content-between mt-3 mt-lg-0 mb-4 pt-lg-5
    px-0 px-md-5 font-weight-bold">
      <div class="d-flex align-items-center text-black fz_20 fz_lg_24">
        <span class="material-icons fz_30 fz_lg_36 mr-2">local_activity</span>
        優惠卷
      </div>
      <button class="btn d-flex align-items-center" type="button"
      @click="openModal('new')">
        <span class="material-icons mr-2">
        add
        </span>
        新增優惠卷
      </button>
    </div>
    <div>
      <ul class="listStyle_none mt-2">
        <li v-for="item in coupons" :key="item.id">
          <div class="card mt-3">
            <div class="card-body p-3">
              <h5 class="card-title mb-0 mx-lg-4">
                <div class="d-flex justify-content-between align-items-center">
                  <div>{{ item.title }}</div>
                  <div class="d-flex align-items-center">
                    <button
                      class="btn d-flex align-items-center p-0 mr-2 mr-md-3"
                      type="button" @click="openModal('edit', item)"
                    >
                      <span class="material-icons">
                      edit
                      </span>
                    </button>
                    <button
                      class="btn d-flex align-items-center p-0"
                      type="button" @click="openModal('delete', item)"
                    >
                      <span class="material-icons">
                      delete
                      </span>
                    </button>
                  </div>
                </div>
              </h5>
              <div class="card-text mt-0 mt-lg-3 mx-lg-4">
                <div class="d-flex justify-content-between align-items-end">
                  <div class="d-flex flex-column align-items-start">
                    <div class="pt-2">序號： {{ item.code }}</div>
                    <div class="pt-2">折扣 % 數：{{ item.percent }} %</div>
                    <div class="pt-2">到期日： {{ item.deadline.timestamp | toDate }}</div>
                  </div>
                  <div>
                    <span v-if="item.enabled" class="text-success d-flex
                      align-items-center justify-content-center font-weight-bold">
                      已啟用
                      <span class="material-icons ml-2">check</span>
                    </span>
                    <span
                      v-else
                      class="text-danger d-flex align-items-center justify-content-center"
                    >
                      未啟用
                      <span class="material-icons ml-2">cloud_off</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
    aria-labelledby="couponModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered w_max_100 w_max_md_50" role="document">
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
            <div class="form-group checkboxStyle pl-0
            d-flex align-items-center mt-4 position-relative">
              <input type="checkbox" class="border-black opacity_0 zIndex_20"
              id="enabled" aria-describedby="is_enabled"
              v-model="tempCoupon.enabled">
              <div v-if="tempCoupon.enabled" class="position-absolute zIndex_10
              checkboxStyle_check">
                <span class="material-icons fz_40 text-success font-weight-bold">check</span>
              </div>
              <label class="form-check-label text-left fz_20 checkboxStyle_label position-absolute"
              for="enabled">是否啟用</label>
            </div>
          </div>
          <div class="modal-footer border-top-0">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" @click="updateCoupons()">
            {{ isNew ? '新增優惠卷' : '更新優惠券' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
    aria-labelledby="delCouponModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger d-flex align-items-center">
            <h5 class="modal-title text-white">刪除優惠卷</h5>
            <button type="button" class="btn m-0 p-0 d-flex align-items-center close opacity_1"
            data-dismiss="modal" aria-label="Close">
              <span class="material-icons text-white">clear</span>
            </button>
          </div>
          <div class="modal-body">
            確認刪除 " {{ tempCoupon.title }} "，此優惠卷嗎？<br>
            <span class="text-danger font-weight-bold">( 刪除後不可復原！！！ )</span>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delCoupon">確認刪除</button>
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
  filters: {
    toDate(timestamp) {
      const date = new Date(timestamp * 1000); // 因為一般 timestamp 取得的是秒數，但要帶入的是毫秒，所以要乘 1000
      return date.toLocaleDateString();
    },
  },
  methods: {
    getCoupons() {
      this.$store.dispatch('loadingChange', true);
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupons`;
      this.$http.get(url)
        .then((res) => {
          this.$store.dispatch('loadingChange', false);
          this.coupons = res.data.data;
        }).catch(() => {
          this.$store.dispatch('loadingChange', false);
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
          // 使用 split 切割相關時間戳
          const dedlineAt = this.tempCoupon.deadline.datetime.split(' ');
          [this.due_date, this.due_time] = dedlineAt; // 日期
          $('#couponModal').modal('show');
          break;
        }
        case 'delete':
          this.tempCoupon = { ...item };
          $('#delCouponModal').modal('show');
          break;
        default:
          break;
      }
    },
    updateCoupons() {
      let url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon`;
      let httpMethod = 'post';
      let text = '新增';
      // 當不是新增商品時則切換成編輯商品 API
      if (!this.isNew) {
        url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}
        /admin/ec/coupon/${this.tempCoupon.id}`;
        httpMethod = 'patch';
        text = '更改';
      }
      // 針對日期做組合重新寫入到物件中
      // 日期格式 Y-m-d H:i:s，例如：「2020-06-16 09:31:18」
      this.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`;
      this.$http[httpMethod](url, this.tempCoupon)
        .then(() => {
          this.getCoupons();
          $('#couponModal').modal('hide');
          this.$store.dispatch('messagePush',
            {
              message: `${text}優惠卷成功`,
              status: 'success',
            });
        }).catch(() => {
          $('#couponModal').modal('hide');
          this.$store.dispatch('messagePush',
            {
              message: `${text}優惠卷失敗，請再嘗試`,
              status: 'danger',
            });
        });
    },
    delCoupon() {
      this.$store.dispatch('loadingChange', true);
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}
      /admin/ec/coupon/${this.tempCoupon.id}`;
      this.$http.delete(url)
        .then(() => {
          this.$store.dispatch('loadingChange', false);
          this.getCoupons();
          $('#delCouponModal').modal('hide');
          this.$store.dispatch('messagePush',
            {
              message: '已刪除優惠卷',
              status: 'success',
            });
        }).catch(() => {
          this.$store.dispatch('loadingChange', false);
          this.getCoupons();
          $('#delCouponModal').modal('hide');
          this.$store.dispatch('messagePush',
            {
              message: '刪除優惠卷失敗，請再嘗試',
              status: 'danger',
            });
        });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
