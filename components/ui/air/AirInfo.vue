<template>
  <div class="info">
    <div class="info-start">
      <h3>{{ start.title }}</h3>
      <p>{{ start.date }}</p>
      <span>{{ start.city }}</span>
    </div>
    <AirLine :num="count" />
    <div class="info-end">
      <h3>{{ end.title }}</h3>
      <p>{{ end.date }}</p>
      <span>{{ end.city }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import AirLine from "./AirLine.vue";
const props = defineProps<{
  start: any;
  end: any;
  count: number;
}>();
</script>

<style scoped lang="scss"></style>
