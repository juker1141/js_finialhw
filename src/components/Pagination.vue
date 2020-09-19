<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="paginationMain p-0 m-0 listStyle_none d-flex align-items-center">
        <li class="page-item mr-2">
          <a href="#" class="prev"
          :class="{ disabled: pages.current_page === 1 }"
          @click.prevent="updatePage( pages.current_page - 1 )">
            <i class="fas fa-angle-left"></i>
          </a>
        </li>

        <li class="page-item mr-2" v-for="i in pages.total_pages"
        :key="i">
          <a href="#" class="num text-decoration-none fz_md_20"
          @click.prevent="updatePage(i)"
          :class="{ active: pages.current_page === i }">{{ i }}</a>
        </li>

        <li class="page-item">
          <a href="#" class="next"
          :class="{ disabled: pages.current_page === pages.total_pages }"
          @click.prevent="updatePage( pages.current_page + 1 )">
          <i class="fas fa-angle-right"></i>
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
.paginationMain a{
  margin: 6px 1px;
  display: inline-block;
  width: 40px;
  background: #121212;
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-weight: 600;
  position: relative;
  padding-right: 20px;
  @media (min-width: 768px) {
    width: 60px;
    height: 60px;
    line-height: 60px;
    padding-right: 26px;
  }
}
.prev,.next{
  padding-right: 12px !important;
  font-size: 20px;
  &.disabled {
    pointer-events: none;
    background: gray;
  }
}
.paginationMain a:hover{
  color: #fecf2f;
}

.active{
  color: #fecf2f !important;
}

.prev{
  border-radius: 30px 0 0 30px;
}

.next{
  border-radius: 0 30px 30px 0;
}

.paginationMain a::before,.paginationMain a:after{
  content: "";
  position: absolute;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  @media (min-width: 768px) {
    border-top: 30px solid transparent;
    border-bottom: 30px solid transparent;
  }
}
.num::before {
  border-right: 15px solid #121212;
  right: 100%;
  @media (min-width: 768px) {
    border-right: 20px solid #121212;
  }
}
.next::before{
  border-right: 15px solid #121212;
  right: 100%;
  @media (min-width: 768px) {
    border-right: 20px solid #121212;
  }
}
.next.disabled::before {
  border-right: 15px solid gray;
  @media (min-width: 768px) {
    border-right: 20px solid gray;
  }
}

.num:after,.prev:after{
  border-right: 15px solid #fff;
  right: 0;
  @media (min-width: 768px) {
    border-right: 20px solid #fff;
  }
}
</style>
