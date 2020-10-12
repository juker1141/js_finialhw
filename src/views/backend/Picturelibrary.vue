<template>
  <div class="p-3">
    <div class="text-left text-black d-flex
    align-items-center mt-3 mt-lg-0 mb-5 pt-lg-5 px-0 px-md-6">
      <h3 class="d-flex align-items-center text-black">
        <span class="material-icons fz_30 mr-3">photo_library</span>
        圖片庫
      </h3>
    </div>
    <div class="w-100 d-flex justify-content-center mb-4">
      <div class="w_75 w_md_50">
        <div class="custom-file mr-3">
          <label class="custom-file-label text-left" for="customFile">請選擇檔案</label>
          <input type="file" class="custom-file-input" @change="uploadFile" id="customFile">
        </div>
      </div>
    </div>
    <div class="card-columns">
      <div class="card card_height" v-for="item in fileData" :key="item.id">
        <img :src="item.path" class="card-img-top" alt="...">
        <div class="card-img-overlay bg-blackOP opacity_0 flex-column
        d-flex align-items-center justify-content-center imgCard_hover">
          <div :id="item.id" class="fz_12 m-5 hideLongLine h_0
          bg-white p-1 px-2 text-left mb-3">{{ item.path }}</div>
          <div class="d-flex align-items-center">
            <button type="button" @click="copyFilePath(item.id)"
            class="btn btn-adminPrimary mr-3 p-2
            d-flex align-items-center justify-content-center">
              <span class="material-icons fz_30">
              content_copy
              </span>
            </button>
            <button type="button" data-toggle="modal"
            @click="delFile = item"
            data-target="#delFileModal" class="btn btn-danger p-2
            d-flex align-items-center justify-content-center">
              <span class="material-icons fz_30">
              delete_outline
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <PaginationAdmin :pages="pagination" @update-pages="getFiles"/>
    <div class="modal fade" id="delFileModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger d-flex align-items-center">
            <h5 class="modal-title text-white">刪除圖片</h5>
            <button type="button" class="btn m-0 p-0 d-flex align-items-center close opacity_1"
            data-dismiss="modal" aria-label="Close">
              <span class="material-icons text-white">clear</span>
            </button>
          </div>
          <div class="modal-body">
            確認刪除該圖片嗎？<br>
            <span class="text-danger font-weight-bold">( 刪除後不可復原！！！ )</span>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-secondary border-0"
            data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delFileData(delFile)">確認刪除</button>
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
      filePath: '',
      fileData: {},
      delFile: {},
      pagination: {},
    };
  },
  methods: {
    getFiles(num = 1) {
      this.$store.dispatch('loadingChange', true);
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/storage?page=${num}&paged=15`;
      this.$http.get(url)
        .then((res) => {
          this.fileData = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.$store.dispatch('loadingChange', false);
        }).catch(() => {
          this.$store.dispatch('loadingChange', false);
        });
    },
    uploadFile() {
      // 選取 DOM 裡面的檔案資訊
      this.$store.dispatch('loadingChange', true);
      const uploadedFile = document.querySelector('#customFile').files[0];
      // 轉成 Form Data
      const formData = new FormData();
      formData.append('file', uploadedFile);

      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/storage`;
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        this.filePath = res.data.data.path;
        this.getFiles();
        this.$store.dispatch('messagePush',
          {
            message: '圖片上傳成功',
            status: 'success',
          });
      }).catch(() => {
        this.$store.dispatch('messagePush',
          {
            message: '圖片上傳失敗，請再嘗試',
            status: 'danger',
          });
        this.getFiles();
      });
    },
    delFileData(item) {
      this.$store.dispatch('loadingChange', true);
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/storage/${item.id}`;
      this.$http.delete(url)
        .then(() => {
          this.getFiles();
          $('#delFileModal').modal('hide');
          this.$store.dispatch('messagePush',
            {
              message: '圖片刪除成功',
              status: 'success',
            });
        }).catch(() => {
          this.$store.dispatch('messagePush',
            {
              message: '圖片刪除失敗，請再嘗試',
              status: 'danger',
            });
        });
    },
    copyFilePath(id) {
      const TextRange = document.createRange();
      const path = document.getElementById(id);
      TextRange.selectNode(path);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(TextRange);
      document.execCommand('copy');
    },
  },
  created() {
    this.getFiles();
  },
};
</script>

<style lang="scss">
.imgCard_hover:hover{
  opacity: 1 !important;
}
.hideLongLine{
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 3;
  box-orient: vertical;
}
.h_0{
  height: 10 !important;
}
</style>
