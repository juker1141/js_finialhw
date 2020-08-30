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
          <th class="text-center border-0 table_w_5 table_w_md_10">產品名稱</th>
          <th class="text-center border-0 table_w_5 d-none d-md-table-cell">分類</th>
          <th class="text-center border-0 table_w_5 table_w_md_10">原價</th>
          <th class="text-center border-0 table_w_5 table_w_md_10">售價</th>
          <th class="text-center border-0 table_w_10"><span class="fz_12 fz_md_16">是否上架</span></th>
          <th class="text-center border-0 table_w_5 table_w_md_10"></th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.id" v-for="item in products">
          <td class="text-center p-3" scope="row"></td>
          <th class="text-center p-3 d-none d-md-table-cell"></th>
          <td class="text-center p-3"></td>
          <td class="text-center p-3"></td>
          <td class="text-center p-3"></td>
          <td class="text-center p-3"></td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div class="modal fade" id="newCouponModal" tabindex="-1" role="dialog"
    aria-labelledby="newCouponModal" aria-hidden="true">
      <div class="modal-dialog w_max_50" role="document">
        <div class="modal-content">
          <div class="modal-header text-black">
            <h5 class="modal-title" id="exampleModalLabel">新增優惠卷</h5>
            <button type="button" class="btn m-0 p-0 d-flex align-items-center close opacity_1"
            data-dismiss="modal" aria-label="Close">
              <span class="material-icons">clear</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="text-left w-100" for="couponName">名稱</label>
              <input type="text" class="form-control form-control-lg" id="couponName"
              aria-describedby="couponName" placeholder="請輸入名稱">
            </div>
            <div class="form-group">
              <label class="text-left w-100" for="couponCode">序號</label>
              <input type="text" class="form-control form-control-lg" id="couponCode"
              aria-describedby="couponCode" placeholder="請輸入序號">
            </div>
            <div class="form-group">
              <label class="text-left w-100" for="couponPercent">百分比</label>
              <input type="text" class="form-control form-control-lg" id="couponPercent"
              aria-describedby="couponPercent" placeholder="請輸入折扣百分比">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
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
    };
  },
  methods: {
    getCoupons() {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/coupons`;
      this.$http.get(url)
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
