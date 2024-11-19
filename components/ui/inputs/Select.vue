<template>
  <div class="custom-select">
    <!-- Выбранное значение -->
    <div class="selected" @click="toggleDropdown">
      {{ modelValue || placeholder }}
      <span class="arrow">&#9662;</span>
    </div>

    <!-- Выпадающий список -->
    <ul v-if="dropdownOpen" class="options">
      <li
        v-for="(option, index) in options"
        :key="index"
        :class="{ selected: option === modelValue }"
        @click="selectOption(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Пропсы
defineProps<{
  options: string[]; // Список опций
  placeholder?: string; // Текст по умолчанию
  modelValue: string; // Текущее выбранное значение
}>();

// Эмит события
const emit = defineEmits(["update:modelValue"]);

// Состояния
const dropdownOpen = ref(false); // Открытие/закрытие выпадающего списка

// Переключение дропдауна
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

// Выбор опции
const selectOption = (option: string) => {
  emit("update:modelValue", option); // Обновляем значение через v-model
  dropdownOpen.value = false; // Закрываем дропдаун
};
</script>

<style scoped lang="scss">
.custom-select {
  position: relative;
  width: 200px;
  font-family: Arial, sans-serif;

  .selected {
    padding: 0.8rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    background-color: #fff;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      border-color: #888;
    }
  }

  .arrow {
    font-size: 0.8rem;
    margin-left: 0.5rem;
    color: #888;
  }

  .options {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    background-color: #fff;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      padding: 0.8rem 1rem;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #f5f5f5;
      }

      &.selected {
        background-color: #e6f7ff;
        color: #1890ff;
      }
    }
  }
}
</style>
