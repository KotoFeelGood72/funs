<template>
  <div class="empty">
    <h3>{{ title }}</h3>
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
  gap: 2rem;
  min-height: 40rem;
  text-align: center;
  background-color: #f5f3f3;
  padding: 3.2rem;
  border-radius: 1.6rem;

  @include bp($point_2) {
    justify-content: center;
    align-items: center;
    gap: 2rem;
    min-height: 20rem;
  }
  h3 {
    font-size: 4rem;
    @include bp($point_2) {
      font-size: 2.4rem;
      text-align: center;
    }
  }
  p {
    // font-size: 2.4rem;
    max-width: 55rem;
    @include bp($point_2) {
      font-size: 1.8rem;
      text-align: center;
    }
  }
}
</style>
