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
      <div class="card" v-for="item in fileData" :key="item.id">
        <img :src="item.path" class="card-img-top" alt="...">
        <div class="card-img-overlay bg-grayOP opacity_0
        d-flex align-items-center justify-content-center imgCard_hover">
          <button type="button" @click="delFileData(item)" class="btn btn-danger p-2
          d-flex align-items-center justify-content-center">
            <span class="material-icons fz_30">
            delete_outline
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filePath: '',
      fileData: {},
    };
  },
  methods: {
    getFiles() {
      this.$bus.$emit('loadingChange', true);
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/storage`;
      this.$http.get(url)
        .then((res) => {
          this.fileData = res.data.data;
          this.$bus.$emit('loadingChange', false);
        }).catch(() => {
          this.$bus.$emit('loadingChange', false);
        });
    },
    uploadFile() {
      // 選取 DOM 裡面的檔案資訊
      this.$bus.$emit('loadingChange', true);
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
        console.log(res);
        this.filePath = res.data.data.path;
        this.getFiles();
        this.$bus.$emit('message:push', '圖片上傳成功', 'success');
      }).catch(() => {
        this.$bus.$emit('message:push', '圖片上傳失敗，請再嘗試', 'danger');
        this.getFiles();
      });
    },
    delFileData(item) {
      this.$bus.$emit('loadingChange', true);
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/storage/${item.id}`;
      this.$http.delete(url)
        .then((res) => {
          console.log(res);
          this.getFiles();
          this.$bus.$emit('message:push', '圖片刪除成功', 'success');
        }).catch(() => {
          this.$bus.$emit('message:push', '圖片刪除失敗，請再嘗試', 'danger');
        });
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
</style>
