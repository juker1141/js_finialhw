<template>
  <div
    class="d-flex align-items-center
    justify-content-center h_100vh w-100
    zIndex_100 position-fixed bg-grayOP"
  >
    <rotate-square2></rotate-square2>
  </div>
</template>

<script>
import { RotateSquare2 } from 'vue-loading-spinner';

export default {
  components: {
    RotateSquare2,
  },
};
</script>
