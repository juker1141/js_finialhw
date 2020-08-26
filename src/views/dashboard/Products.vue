/* eslint-disable vue/valid-v-else */
<template>
  <div>
    <h2>This is an admin Products Page</h2>
    <table class="table mt-2 rounded">
      <thead class="alert-success">
        <tr>
          <th class="text-center border-0 table_w_20">產品名稱</th>
          <th class="text-center border-0 table_w_5">分類</th>
          <th class="text-center border-0 table_w_10">原價</th>
          <th class="text-center border-0 table_w_10">售價</th>
          <th class="text-center border-0 table_w_5">是否上架</th>
          <th class="text-center border-0 table_w_10">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.id" v-for="item in products">
          <td class="text-center p-3">{{ item.title }}</td>
          <th class="text-center p-3" scope="row">{{ item.category }}</th>
          <td class="text-center p-3">{{ item.origin_price }}</td>
          <td class="text-center p-3">{{ item.price }}</td>
          <td class="text-center p-3">
            <span v-if="item.enabled">未上架</span>
            <span v-else>已上架</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @update-pages="getProducts"/>
  </div>
</template>

<script>
import Pagination from '../../components/Pagination.vue';

export default {
  data() {
    return {
      products: { imageUrl: [] },
      isLoading: false,
      Pagination: {},
    };
  },
  components: {
    Pagination,
  },
  props: ['token'],
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
  },
  created() {
    this.getProducts();
  },
};
</script>
