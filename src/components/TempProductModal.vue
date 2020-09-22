<template>
  <div class="modal-dialog w_max_100 w_max_md_80 text-black" role="document">
    <div class="modal-content">
      <div class="modal-header bg-adminSecondary d-flex align-items-center">
        <h5 class="modal-title">新增/更改商品</h5>
        <button type="button" class="btn m-0 p-0 d-flex align-items-center close opacity_1"
        data-dismiss="modal" aria-label="Close">
          <span class="material-icons">clear</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="row flex-column flex-md-row">
            <div class="col-12 col-md-4">
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label for="imageUrl" class="text-left w-100">輸入圖片網址</label>
                    <input id="imageUrl" v-model="tempProduct.imageUrl[0]"
                    type="text" class="form-control"
                      placeholder="請輸入圖片連結">
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label class="custom-file-label text-left mx_15px"
                    for="customFile">請選擇檔案</label>
                    <input type="file" class="custom-file-input"
                    @change="uploadFile" id="customFile">
                  </div>
                </div>
              </div>
              <img class="img-fluid" :src="tempProduct.imageUrl[0]" alt>
              <img class="img-fluid" :src="tempProduct.imageUrl[1]" alt>
              <img class="img-fluid" :src="tempProduct.imageUrl[2]" alt>
            </div>
            <div class="col-12 col-md-8">
              <div class="form-group mt-3 mt-md-0">
                <label for="title" class="text-left w-100">標題</label>
                <input type="text" class="form-control" id="title"
                v-model="tempProduct.title"
                  aria-describedby="title" placeholder="請輸入標題">
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="category" class="text-left w-100">分類</label>
                    <input type="text" class="form-control" id="category"
                    v-model="tempProduct.category"
                      placeholder="請輸入分類">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="unit" class="text-left w-100">單位</label>
                    <input type="unit" class="form-control" id="unit"
                    v-model="tempProduct.unit"
                      placeholder="請輸入單位">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="origin_price" class="text-left w-100">牌價</label>
                    <input type="number" class="form-control" id="origin_price"
                    v-model="tempProduct.origin_price"
                      placeholder="請輸入牌價">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="price" class="text-left w-100">售價</label>
                    <input type="number" class="form-control" id="price"
                    v-model="tempProduct.price"
                      placeholder="請輸入售價">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="description" class="text-left w-100">商品規格</label>
                <div v-if="editorItem !== 'description'" v-html="tempProduct.description"
                @dblclick="showEditor('description')"></div>
                <Editor v-if="editorItem === 'description'" id="tinymce"
                v-model="tempProduct.description" :init="editorInit" />
                <div v-if="editorItem === 'description'"
                class="d-flex justify-content-end">
                  <button class="btn btn-success mt-2" type="button"
                  @click="finishEditor">確認</button>
                </div>
              </div>
              <div class="form-group">
                <label for="content" class="text-left w-100">商品特色</label>
                <div v-if="editorItem !== 'content'"
                v-html="tempProduct.content" @dblclick="showEditor('content')"></div>
                <Editor v-if="editorItem === 'content'" id="tinymce"
                v-model="tempProduct.content" :init="editorInit" />
                <div v-if="editorItem === 'content'"
                class="d-flex justify-content-end">
                  <button class="btn btn-success mt-2" type="button"
                  @click="finishEditor">確認</button>
                </div>
              </div>
              <div class="form-check checkboxStyle pl-0
              d-flex align-items-center position-relative">
                <input id="enabled" v-model="tempProduct.enabled"
                class="border-black opacity_0 zIndex_20" type="checkbox">
                <div v-if="tempProduct.enabled" class="position-absolute zIndex_10
                checkboxStyle_check">
                  <span class="material-icons fz_40 text-success font-weight-bold">check</span>
                </div>
                <label class="form-check-label
                text-left fz_20 checkboxStyle_label position-absolute" for="enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
        <button type="button" @click="updateProduct" class="btn btn-success">完成</button>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

import tinymce from 'tinymce/tinymce';
import Editor from '@tinymce/tinymce-vue';
// 引入富文本编辑器主题的js和css
import 'tinymce/themes/silver/theme.min';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/icons/default/icons.min';
// 扩展插件
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import 'tinymce/plugins/table';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/wordcount';

export default {
  props: ['tempProduct', 'isNew'],
  components: {
    Editor,
  },
  data() {
    return {
      filePath: '',
      editorItem: '',
      editorInit: {
        selector: '#tinymce',
        language_url: '/tinymce/langs/zh_TW.js',
        language: 'zh_TW',
        skin_url: '/tinymce/skins/ui/oxide',
        height: 300,
        plugins: 'link lists image code table wordcount',
        toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        // 此处为图片上传处理函数
        images_upload_handler: (blobInfo, success, failure) => {
          this.handleImgUpload(blobInfo, success, failure);
        },
        statusbar: true, // 底部的状态栏
        menubar: true, // 最上方的菜单
        branding: false, // 水印“Powered by TinyMCE”
      },
    };
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    updateProduct() {
      let url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/product`;
      let httpMethod = 'post';
      let text = '新增';
      // 當不是新增商品時則切換成編輯商品 API
      if (!this.isNew) {
        url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}
        /admin/ec/product/${this.tempProduct.id}`;
        httpMethod = 'patch';
        text = '更新';
      }
      this.$http[httpMethod](url, this.tempProduct)
        .then(() => {
          this.$emit('update');
          $('#productModal').modal('hide');
          this.$bus.$emit('message:push', `${text}商品成功`, 'success');
        }).catch(() => {
          this.$bus.$emit('message:push', `${text}商品失敗，請再嘗試`, 'danger');
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
        this.tempProduct.imageUrl.push(res.data.data.path);
        this.$bus.$emit('message:push', '圖片上傳成功', 'success');
      }).catch(() => {
        this.$bus.$emit('message:push', '圖片上傳失敗，請再嘗試', 'danger');
      });
    },
    showEditor(target) {
      this.editorItem = target;
    },
    finishEditor() {
      this.editorItem = '';
    },
  },
};
</script>
