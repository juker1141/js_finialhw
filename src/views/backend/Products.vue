<template>
  <div class="p-3">
    <div class="text-left text-black d-flex
    align-items-center justify-content-between mt-3 mt-lg-0 mb-4
    pt-lg-5 px-0 px-md-5 font-weight-bold">
      <div class="d-flex align-items-center m-0 fz_20 fz_lg_24">
        <span class="material-icons fz_30 fz_lg_36 mr-2">list_alt</span>
        產品列表
      </div>
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
          <th class="text-center border-0 table_w_10 table_w_md_15">產品名稱</th>
          <th class="text-center border-0 table_w_10 d-none d-lg-table-cell">分類</th>
          <th class="text-center border-0 table_w_5 table_w_md_15
          d-none d-md-table-cell">原價</th>
          <th class="text-center border-0 table_w_10 table_w_md_15">售價</th>
          <th class="text-center border-0 table_w_5 table_w_md_10">上架</th>
          <th class="text-center border-0 table_w_5 table_w_md_10"></th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.id" v-for="item in pagination.currentDataList">
          <td class="text-center p-1 py-2 p-md-2 p-lg-3 fz_14" scope="row">{{ item.title }}</td>
          <th class="text-center p-1 py-2 p-md-2 p-lg-3 d-none d-lg-table-cell">
            {{ item.category }}
          </th>
          <td class="text-center p-1 py-2 p-md-2 p-lg-3 d-none d-md-table-cell">
            {{ item.origin_price | toCurrency | DollarSign }}
          </td>
          <td class="text-center p-1 py-2 p-md-2 p-lg-3 fz_14">
            {{ item.price | toCurrency | DollarSign }}
          </td>
          <td class="text-center p-1 py-2 p-md-2 p-lg-3 fz_14">
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
    <PaginationAdmin
      :pages="pagination"
      @update-pagelist="changePageList"
      @update-page="changePage"
      @update-pagegroup="changePageGroup"
    />
  </div>
</template>

<script>
/* global $ */
import TempProductModal from '@/components/TempProductModal.vue';
import DelProductModal from '@/components/DelProductModal.vue';

export default {
  data() {
    return {
      products: { imageUrl: [] },
      tempProduct: {
        imageUrl: [],
      },
      isLoading: false,
      isNew: true,
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
  components: {
    TempProductModal,
    DelProductModal,
  },
  methods: {
    getProducts() {
      this.$store.dispatch('loadingChange', true);
      const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/products?paged=200`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.data;
          console.log(res.data.data);
          this.pagination.totalDataList = this.products;
          this.pagination.total_pages = Math.ceil(this.pagination.totalDataList.length
          / this.pagination.count);
          this.initPageList();
          this.computedPageGroup();
          this.$store.dispatch('loadingChange', false);
        })
        .catch(() => {
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
          this.$store.dispatch('loadingChange', true);
          this.isNew = false;
          const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`;
          this.$http.get(url)
            .then((res) => {
              this.$store.dispatch('loadingChange', false);
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
  },
  created() {
    this.getProducts();
  },
};
</script>
