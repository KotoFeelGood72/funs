<template>
  <div
    class="divider"
    :style="{ height: heightInRem }"
    :class="[{ blue: color }]"
  ></div>
</template>

<script setup lang="ts">
// Принимаем параметр высоты через пропсы
const props = withDefaults(
  defineProps<{
    height: number; // Высота в rem
    color?: boolean;
  }>(),
  {
    color: false,
  }
);

// Преобразуем значение высоты в rem
const heightInRem = `${props.height}rem`;
</script>

<style scoped lang="scss">
.divider {
  width: 100%; /* Занимает всю ширину */
  &.blue {
    background-color: $blue;
  }
}
</style>
