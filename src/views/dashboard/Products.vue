<template>
  <div class="p-3">
    <div class="text-left text-black d-flex
    align-items-center justify-content-between mt-3 mt-lg-0 mb-5 pt-lg-5 px-0 px-md-6">
      <h3 class="d-flex align-items-center m-0">
        <span class="material-icons fz_30 mr-3">list_alt</span>
        產品列表
      </h3>
      <button class="btn d-flex align-items-center" type="button"
      @click="openModal('new')">
        <span class="material-icons mr-2">
        add
        </span>
        新增商品
      </button>
    </div>
    <table class="table mt-2 rounded">
      <thead class="alert-success">
        <tr>
          <th class="text-center border-0 table_w_5 table_w_md_15">產品名稱</th>
          <th class="text-center border-0 table_w_10 d-none d-lg-table-cell">分類</th>
          <th class="text-center border-0 table_w_5 table_w_md_15
          d-none d-md-table-cell">原價</th>
          <th class="text-center border-0 table_w_10 table_w_md_15">售價</th>
          <th class="text-center border-0 table_w_10"><span class="fz_12 fz_lg_16">是否上架</span></th>
          <th class="text-center border-0 table_w_5 table_w_md_10"></th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.id" v-for="item in products">
          <td class="text-center p-1 py-2 p-md-2 p-lg-3" scope="row">{{ item.title }}</td>
          <th class="text-center p-1 py-2 p-md-2 p-lg-3 d-none d-lg-table-cell">
            {{ item.category }}
          </th>
          <td class="text-center p-1 py-2 p-md-2 p-lg-3 d-none d-md-table-cell">
            {{ item.origin_price | toCurrency | DollarSign }}
          </td>
          <td class="text-center p-1 py-2 p-md-2 p-lg-3">
            {{ item.price | toCurrency | DollarSign }}
          </td>
          <td class="text-center p-1 py-2 p-md-2 p-lg-3">
            <span v-if="item.enabled" class="text-success d-flex
            align-items-center justify-content-center font-weight-bold">
              <div class="d-none d-xl-block">已上架</div><span class="material-icons ml-2">check</span>
            </span>
            <span v-else
            class="text-danger d-flex align-items-center justify-content-center">
              <div class="d-none d-xl-block">未上架</div>
            <span class="material-icons ml-2">cloud_off</span></span>
          </td>
          <td class="text-center p-1 py-2 p-md-2 p-lg-3">
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
    <div class="modal fade" id="productModal" tabindex="-1"
    role="dialog" aria-labelledby="updateModal"
      aria-hidden="true">
      <TempProductModal @update="getProducts(pagination.current_page)"
      :temp-product="tempProduct" :is-new="isNew"/>
    </div>
    <div class="modal fade" id="delProductModal" tabindex="-1"
    role="dialog" aria-labelledby="delProductModal"
      aria-hidden="true">
      <DelProductModal @update="getProducts(pagination.current_page)"
      :temp-product="tempProduct"/>
    </div>
    <PaginationAdmin :pages="pagination" @update-pages="getProducts"/>
  </div>
</template>

<script>
/* global $ */
import TempProductModal from '../../components/TempProductModal.vue';
import DelProductModal from '../../components/DelProductModal.vue';

export default {
  data() {
    return {
      products: { imageUrl: [] },
      tempProduct: {
        imageUrl: [],
      },
      isLoading: false,
      isNew: true,
      pagination: {},
    };
  },
  components: {
    TempProductModal,
    DelProductModal,
  },
  methods: {
    getProducts(num = 1) {
      this.$bus.$emit('loadingChange', true);
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/products?page=${num}`;
      this.$http
        .get(url)
        .then((res) => {
          console.log(res);
          this.products = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.$bus.$emit('loadingChange', false);
        })
        .catch(() => {
          this.$bus.$emit('loadingChange', false);
        });
    },
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.isNew = true;
          this.tempProduct = {
            imageUrl: [],
          };
          $('#productModal').modal('show');
          break;
        case 'edit': {
          this.$bus.$emit('loadingChange', true);
          this.isNew = false;
          const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`;
          this.$http.get(url)
            .then((res) => {
              console.log(res);
              this.$bus.$emit('loadingChange', false);
              this.tempProduct = res.data.data;
              $('#productModal').modal('show');
            });
          break; }
        case 'delete':
          $('#delProductModal').modal('show');
          this.tempProduct = { ...item };
          break;
        default:
          break;
      }
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
