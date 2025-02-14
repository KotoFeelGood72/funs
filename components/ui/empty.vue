<template>
  <div class="empty">
    <h3>{{ title }} 😔</h3>
    <p>{{ txt }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  txt: string;
}>();
</script>

<style scoped lang="scss">
.empty {
  @include flex-center;
  flex-direction: column;
  gap: 3rem;
  min-height: 40rem;
  h3 {
    font-size: 4rem;
  }
  p {
    font-size: 2.4rem;
  }
}
</style>
