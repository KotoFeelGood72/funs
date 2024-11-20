<template>
  <div class="divider" :style="{ height: heightInRem }"></div>
</template>

<script setup lang="ts">
// Принимаем параметр высоты через пропсы
const props = defineProps<{
  height: number; // Высота в rem
}>();

// Преобразуем значение высоты в rem
const heightInRem = `${props.height}rem`;
</script>

<style scoped lang="scss">
.divider {
  width: 100%; /* Занимает всю ширину */
  background-color: $blue;
}
</style>
