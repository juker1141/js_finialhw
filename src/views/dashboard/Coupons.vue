<template>
  <div class="p-3">
    <div class="d-flex align-items-center justify-content-between
    mb-5 pt-lg-5 px-5 px-md-6">
      <h3 class="d-flex align-items-center text-black">
        <span class="material-icons fz_30 mr-3">local_activity</span>
        優惠卷
      </h3>
      <button class="btn d-flex align-items-center" type="button"
      data-toggle="modal" data-target="#newCouponModal">
        <span class="material-icons mr-2">
        add
        </span>
        新增優惠卷
      </button>
    </div>
    <table class="table mt-2 rounded">
      <thead class="alert-success">
        <tr>
          <th class="text-center border-0 table_w_20">名稱</th>
          <th class="text-center border-0 table_w_20">序號</th>
          <th class="text-center border-0 table_w_20">折扣百分比</th>
          <th class="text-center border-0 table_w_20">到期日</th>
          <th class="text-center border-0 table_w_20">是否啟用</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td class="text-center p-3" scope="row">{{ item.title }}</td>
          <th class="text-center p-3">{{ item.code }}</th>
          <td class="text-center p-3">{{ item.percent }}</td>
          <td class="text-center p-3">{{ item.deadline.datetime }}</td>
          <td class="text-center p-3">{{ item.enabled }}</td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div class="modal fade" id="newCouponModal" tabindex="-1" role="dialog"
    aria-labelledby="newCouponModal" aria-hidden="true">
      <div class="modal-dialog w_max_50" role="document">
        <div class="modal-content">
          <div class="modal-header text-black border-bottom-0">
            <h5 class="modal-title" id="exampleModalLabel">新增優惠卷</h5>
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
            <button type="button" class="btn btn-primary" @click="createCoupons">建立優惠卷</button>
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
      coupons: {},
      tempCoupon: {
        title: '',
        enabled: false,
        percent: 100,
        deadline_at: 0,
        code: '',
      },
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
    createCoupons() {
      this.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`;
      console.log(this.tempCoupon.deadline_at);
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupon`;
      this.$http.post(url, this.tempCoupon)
        .then((res) => {
          console.log(res);
        });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
