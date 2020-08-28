<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link btn border-0" href="#"
          :class="{ disabled: pages.current_page === 1 }"
          @click.prevent="updatePage( pages.current_page - 1 )">
            <span class="material-icons text-black">
            navigate_before
            </span>
          </a>
        </li>

        <li class="page-item" v-for="i in pages.total_pages"
        :key="i" :class="{ active: pages.current_page === i }">
          <a class="page-link btn border-0" href="#"
            @click.prevent="updatePage(i)">{{ i }}
          </a>
        </li>

        <li class="page-item">
          <a class="page-link btn border-0" href="#"
        :class="{ disabled: pages.current_page === pages.total_pages }"
        @click.prevent="updatePage( pages.current_page + 1 )">
            <span class="material-icons">
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
