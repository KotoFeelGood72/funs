<template>
  <div class="collapsible-block">
    <div class="collapsible-block__header" @click="toggle">
      <slot name="header">{{ title }}</slot>
      <Icon :name="open ? 'mage:chevron-down' : 'mage:chevron-up'" :size="20" />
    </div>

    <div v-show="open" class="collapsible-block__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps<{ title?: string; isOpen?: boolean }>();
const open = ref(props.isOpen ? props.isOpen : false);

function toggle() {
  open.value = !open.value;
}
</script>

<style scoped lang="scss">
.collapsible-block {
  border: 0.1rem solid $light;
  border-radius: 2rem;
  // overflow: hidden;
  padding: 2rem 3rem;
  margin: 2rem 0;
}

.collapsible-block__header {
  @include flex-space;
  user-select: none;
  cursor: pointer;
}

.collapsible-block__body {
  padding: 1rem 0 0 0;
}
</style>
