<template>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header bg-danger d-flex align-items-center">
        <h5 class="modal-title text-white">刪除商品</h5>
        <button type="button" class="btn m-0 p-0 d-flex align-items-center close opacity_1"
        data-dismiss="modal" aria-label="Close">
          <span class="material-icons text-white">clear</span>
        </button>
      </div>
      <div class="modal-body">
        確認刪除 " {{ tempProduct.title }} "，此商品嗎？<br>
        <span class="text-danger font-weight-bold">( 刪除後不可復原！！！ )</span>
      </div>
      <div class="modal-footer border-0">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  props: ['tempProduct'],
  methods: {
    deleteProduct() {
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}
      /admin/ec/product/${this.tempProduct.id}`;
      this.$http.delete(url)
        .then((res) => {
          console.log(res);
          $('#delProductModal').modal('hide');
          this.$emit('update');
        }).catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
