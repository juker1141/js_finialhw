<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination flex justify-content-center justify-content-lg-start">
        <li class="pageAdmin-item mr-2">
          <a class="page-link p-1 btn btnSize_sm border-0
          d-flex align-items-center justify-content-center" href="#"
          :class="{ disabled: pages.current_page === 1 }"
          @click.prevent="changePageList('prev')">
            <span class="material-icons text-black">
            navigate_before
            </span>
          </a>
        </li>

        <template v-if="pages.current_group > 0">
          <li class="pageAdmin-item mr-2">
            <a
              class="page-link btn btnSize_sm border-0
              d-flex align-items-center justify-content-center"
              href="#"
              @click.prevent="changePageGroup('prev')"
            >
              <span class="text-black">...</span>
            </a>
          </li>
        </template>

        <template v-if="pages.total_pages">
          <li class="pageAdmin-item mr-2" v-for="i in pages.pageGroup"
          :key="i" :class="{ active: pages.current_page === i }">
            <a class="page-link btn btnSize_sm border-0
            d-flex align-items-center justify-content-center" href="#"
              @click.prevent="changePage(i)"><span class="text-black">{{ i }}</span>
            </a>
          </li>
        </template>

        <template v-if="pages.current_group < (pages.totalPageGroup - 1)">
          <li class="pageAdmin-item mr-2">
            <a
              class="page-link btn btnSize_sm border-0
              d-flex align-items-center justify-content-center"
              href="#"
              @click.prevent="changePageGroup('next')"
            >
              <span class="text-black">...</span>
            </a>
          </li>
        </template>

        <li class="pageAdmin-item">
          <a class="page-link btn btnSize_sm border-0
          p-1 btn d-flex align-items-center justify-content-center" href="#"
        :class="{ disabled: pages.current_page === pages.total_pages }"
        @click.prevent="changePageList('next')">
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
    changePageList(state) {
      // 觸發外部事件
      this.$emit('update-pagelist', state);
    },
    changePage(num) {
      // 觸發外部事件
      this.$emit('update-page', num);
    },
    changePageGroup(state) {
      // 觸發外部事件
      this.$emit('update-pagegroup', state);
    },
  },
};
</script>

<style lang="scss">
.btnSize_sm{
  height: 36px !important;
  width: 32px !important;
}
.pageAdmin-item.active .page-link {
  background-color: #D4EDDA;
  color: #155724;
  font-weight: bold;
}
</style>
