<template>
  <ul class="tab-links">
    <li
      v-for="(tab, index) in tabs"
      :key="index"
      :class="{ active: activeTab === index }"
      class="tab-link"
      @click="$emit('update:activeTab', index)"
    >
      Пассажир № {{ index + 1 }}
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  tabs: any; // Список пассажиров
  activeTab: number; // Активная вкладка
}>();

const emit = defineEmits(["update:activeTab"]); // Эмитим событие изменения активной вкладки
</script>

<style scoped lang="scss">
.tab-links {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  font-size: 1.8rem;
  font-family: $font_2;
  margin-bottom: 2.4rem;

  .tab-link {
    background-color: $gray-light;
    border-radius: 0.8rem;
    color: $dark;
    padding: 1rem 0.8rem 0.8rem 0.8rem;
    cursor: pointer;
    &.active {
      color: $blue;
      background-color: #a2d0ff4a;
    }
  }
}
</style>
