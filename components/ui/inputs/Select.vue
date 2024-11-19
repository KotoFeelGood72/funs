<template>
  <div class="select" @click="toggleDropdown">
    <!-- Метка -->
    <label :class="{ active: dropdownOpen || modelValue }" class="label">
      {{ label }}
    </label>

    <!-- Выбранное значение -->
    <div class="selected">
      {{ modelValue || placeholder }}
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
  label?: string; // Текст метки
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
.select {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  font-family: $font_2;
  padding: 1.1rem 1.6rem;
  width: 100%;
  background: transparent;
  z-index: 1;
  border: 0.1rem solid $light;
  border-radius: 0.4rem;
  font-size: 1.8rem;

  .label {
    position: absolute;
    top: 50%;
    left: 1.6rem;
    transform: translateY(-50%);
    transition: all 0.3s ease;
    pointer-events: none;
    font-size: 1.4rem;
    font-family: $font_2;
    color: $dark;
  }

  .label.active {
    top: 0;
    left: 0.7rem;
    background-color: $white;
    z-index: 22;
    padding: 0 1rem;
    color: $blue;
  }

  //   .search-input {
  //     @include app;
  //     font-family: $font_2;
  //     padding: 1.1rem 1.6rem;
  //     width: 100%;
  //     background: transparent;
  //     z-index: 1;
  //     border: 0.1rem solid $light;
  //     border-radius: 0.4rem;
  //     font-size: 1.8rem;

  //     &:focus {
  //       //   outline: none;
  //       //   border-color: #1890ff;
  //     }
  //   }

  .options {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    background: white;
    border: 0.1rem solid $light;
    border-radius: 0.5rem;
    z-index: 1000;

    li {
      font-size: 1.4rem;
      padding: 0.8rem 1rem;
      color: $dark;
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

    .no-options {
      padding: 0.8rem 1rem;
      color: #999;
    }
  }
}
</style>
