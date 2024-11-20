<template>
  <div class="tabs">
    <!-- Список табов -->
    <ul class="tabs-list">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab', { active: activeTab === index }]"
        @click="setActiveTab(index)"
      >
        <p>{{ tab.label }}</p>
      </li>
    </ul>
    <!-- Контент активного таба -->
    <div class="tab-content">
      <slot :name="`tab-${activeTab}`"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Определяем входные свойства
defineProps<{
  tabs: { label: string }[]; // Список табов, передаем только их названия
}>();

// Активный таб
const activeTab = ref(0);

// Функция для переключения активного таба
const setActiveTab = (index: number) => {
  activeTab.value = index;
};
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  flex-direction: column;
  gap: 2.3rem;
}

.tabs-list {
  @include flex-center;
  max-width: 62.4rem;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  border-radius: 3rem;
  &:before {
    border-radius: 3rem;
    width: 100%;
    height: 100%;
    content: "";
    border: 0.1rem solid $blue;
    position: absolute;
    top: 0;
    left: 0;
  }
}

.tab {
  width: 100%;
  padding: 1.6rem 2.4rem;
  @include flex-center;
  position: relative;
  cursor: pointer;

  &:nth-child(2) {
    border-left: 0.1rem solid $blue;
    border-right: 0.1rem solid $blue;
  }
  p {
    position: relative;
    z-index: 2;
    font-family: $font_3;
  }

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $blue;
    content: "";
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
    pointer-events: none;
    z-index: 0;
  }

  &.active {
    &:before {
      opacity: 1;
      visibility: visible;
    }
    color: $white;
  }
}

.tab-content {
  // padding: 2rem;
  // border: 1px solid #ddd;
  // border-top: none;
}
</style>
