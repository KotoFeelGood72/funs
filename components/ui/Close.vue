<template>
  <div class="close" @click="closeAllModals">
    <Icon name="f:close" :size="22" />
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import { useModalStore } from "~/store/useModalStore";

const { closeAllModals } = useModalStore();
const emit = defineEmits(["close"]);
</script>

<style scoped lang="scss">
.close {
  @include flex-center;
  width: 3.6rem;
  height: 3.6rem;
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  cursor: pointer;
}
</style>
