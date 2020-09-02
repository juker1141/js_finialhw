<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item mr-2">
          <a class="page-link p-1 btn btnSize_sm border-0
          d-flex align-items-center justify-content-center" href="#"
          :class="{ disabled: pages.current_page === 1 }"
          @click.prevent="updatePage( pages.current_page - 1 )">
            <span class="material-icons text-black">
            navigate_before
            </span>
          </a>
        </li>

        <li class="page-item mr-2" v-for="i in pages.total_pages"
        :key="i" :class="{ active: pages.current_page === i }">
          <a class="page-link btn btnSize_sm border-0
          d-flex align-items-center justify-content-center" href="#"
            @click.prevent="updatePage(i)"><span class="text-black">{{ i }}</span>
          </a>
        </li>

        <li class="page-item">
          <a class="page-link btn btnSize_sm border-0
          p-1 btn d-flex align-items-center justify-content-center" href="#"
        :class="{ disabled: pages.current_page === pages.total_pages }"
        @click.prevent="updatePage( pages.current_page + 1 )">
            <span class="material-icons text-black">
            navigate_next
            </span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    updatePage(num) {
      // 觸發外部事件
      this.$emit('update-pages', num);
    },
  },
};
</script>

<style lang="scss">
.btnSize_sm{
  height: 36px !important;
  weight: 32px !important;
}
.page-item.active .page-link {
  background-color: #D4EDDA;
  color: #155724;
  font-weight: bold;
}
</style>
