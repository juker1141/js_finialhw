<template>
  <div class="position-fixed toastPosition">
    <div
      v-for="(item, i) in messages"
      :id="`toast-${i}`"
      :key="i"
      class="toast fade show bg-gray"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-autohide="false"
    >
      <div class="toast-header bg-gray text-black">
        <div class="inline-block rounded mr-2"
          style="width: 20px; height: 20px"
          :class="`bg-${ item.status }`">
          <span class="material-icons text-white fz_14">
          build
          </span>
        </div>
        <strong class="mr-auto fontOrbitron">Hardware Store</strong>
        <small class="pr-2">現在</small>
        <button type="button" class="btn m-0 p-0
        d-flex align-items-center close opacity_1"
          @click="closeToast(`toast-${i}`)"
        data-dismiss="modal" aria-label="Close">
          <span class="material-icons fz_14">clear</span>
        </button>
      </div>
      <div class="toast-body text-black">
        {{ item.message }}
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  name: 'Toasts',
  data() {
    return {
      messages: [],
    };
  },
  created() {
    const vm = this;
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status);
    });
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
    closeToast(element) {
      $(`#${element}`).toast('hide');
    },
  },
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
.toastPosition{
  top: 20px;
  right: 20px;
  min-width: 300px;
}
</style>
