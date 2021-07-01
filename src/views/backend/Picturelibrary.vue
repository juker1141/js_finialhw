<template>
  <div class="p-3">
    <div class="text-left text-black d-flex font-weight-bold
    align-items-center mt-3 mt-lg-0 mb-5 pt-lg-5 px-0 px-md-5">
      <div class="d-flex align-items-center text-black fz_20 fz_lg_24">
        <span class="material-icons fz_30 fz_lg_36 mr-2">photo_library</span>
        圖片庫
      </div>
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
      <div class="card card_height" v-for="item in pagination.currentDataList" :key="item.id">
        <img :src="item.path" class="card-img-top" alt="...">
        <div class="card-img-overlay bg-blackOP opacity_0 flex-column
        d-flex align-items-center justify-content-center imgCard_hover">
          <div :id="item.id" class="fz_12 m-5 hideLongLine h_0
          bg-white p-1 px-2 text-left mb-3">{{ item.path }}</div>
          <div class="d-flex align-items-center">
            <button type="button" @click="copyFilePath(item.id)"
            class="btn btn-adminPrimary mr-3 p-2
            d-flex align-items-center justify-content-center">
              <span class="material-icons fz_30_important">
              content_copy
              </span>
            </button>
            <button type="button" data-toggle="modal"
            @click="delFile = item"
            data-target="#delFileModal" class="btn btn-danger p-2
            d-flex align-items-center justify-content-center">
              <span class="material-icons fz_30_important">
              delete_outline
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <PaginationAdmin
      :pages="pagination"
      @update-pagelist="changePageList"
      @update-page="changePage"
      @update-pagegroup="changePageGroup"
    />
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
      pagination: {
        count: 10,
        current_page: 1,
        currentDataList: [],
        totalDataList: [],
        total_pages: '',
        pageGroup: [],
        totalPageGroup: 0,
        current_group: 0,
      },
    };
  },
  methods: {
    getFiles() {
      this.$store.dispatch('loadingChange', true);
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/storage?paged=200`;
      this.$http.get(url)
        .then((res) => {
          this.fileData = res.data.data;
          this.pagination.totalDataList = this.fileData;
          this.pagination.total_pages = Math.ceil(this.pagination.totalDataList.length
          / this.pagination.count);
          this.initPageList();
          this.computedPageGroup();
          this.$store.dispatch('loadingChange', false);
        }).catch(() => {
          this.$store.dispatch('loadingChange', false);
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
