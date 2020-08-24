<template>
  <div>
    <h2>This is an admin Products Page</h2>
    <table class="table mt-2 rounded">
      <thead class="alert-success">
        <tr>
          <th class="text-center border-0" width="120">分類</th>
          <th class="text-center border-0" width="120">產品名稱</th>
          <th class="text-center border-0" width="120">牌價</th>
          <th class="text-center border-0" width="120">售價</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.id" v-for="item in products">
          <th class="text-center p-3" scope="row">{{ item.category }}</th>
          <td class="text-center p-3">{{ item.title }}</td>
          <td class="text-center p-3">{{ item.origin_price }}</td>
          <td class="text-center p-3">{{ item.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: { imageUrl: [] },
    };
  },
  props: ['token'],
  created() {
    const url = `${process.env.VUE_APP_APIPATH}${process.env.VUE_APP_UUID}/admin/ec/products`;
    this.$http.get(url).then((res) => {
      console.log(res);
      this.products = res.data.data;
    });
  },
};
</script>
