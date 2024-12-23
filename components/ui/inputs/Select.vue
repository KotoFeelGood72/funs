<template>
  <div class="select" @click="toggleDropdown" ref="selectRef">
    <label :class="{ active: dropdownOpen || modelValue }" class="label">
      {{ label }}
    </label>
    <div class="selected">
      <p class="selected-text">{{ modelValue || placeholder }}</p>
      <slot />
    </div>

    <!-- Dropdown options -->
    <ul v-if="dropdownOpen" class="options">
      <li
        v-for="(option, index) in options"
        :key="index"
        :class="{ selected: option === modelValue }"
        @click.stop="selectOption(option)"
      >
        {{ option }}
      </li>
      <li v-if="!options.length" class="no-options">Нет доступных опций</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";

// Пропсы
const props = defineProps<{
  options: string[] | number[]; // Список опций
  modelValue: any; // Текущее выбранное значение
  label?: string; // Текст метки
  placeholder?: string; // Placeholder, если значение не выбрано
}>();

// Эмит события
const emit = defineEmits(["update:modelValue"]);

const dropdownOpen = ref(false); // Открытие/закрытие выпадающего списка
const selectRef = ref<HTMLDivElement | null>(null);

// Закрытие выпадающего списка при клике вне компонента
const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    dropdownOpen.value = false;
  }
};

// Добавляем и удаляем слушатель кликов вне компонента
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Переключение состояния выпадающего списка
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

// Выбор опции
const selectOption = (option: string | number) => {
  emit("update:modelValue", option);
  dropdownOpen.value = false;
};
</script>

<style scoped lang="scss">
.select {
  position: relative;
  cursor: pointer;
  border: 0.1rem solid transparent;
  border-bottom: 0.1rem solid $blue;

  .label {
    position: absolute;
    left: 1.6rem;
    transition: all 0.3s ease;
    pointer-events: none;
    font-family: $font_2;
    color: $blue;
    font-size: 1.4rem;
  }

  .selected {
    font-family: $font_2;
    padding: 1.1rem 1.6rem;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 1;
    font-size: 1.8rem;
    color: $dark;

    @include flex-space;
  }

  .options {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    background: $white;
    box-shadow: 0 0 1rem 0 #00000012;
    z-index: 1000;

    li {
      font-size: 1.8rem;
      padding: 0.8rem 1.6rem;
      color: $dark;
      cursor: pointer;
      @include flex-space;
      border-bottom: 0.1rem solid #a2d0ff6b;
      transition: all 0.3s ease-in-out;
      font-family: $font_2;

      &:hover {
        color: $light-blue;
      }
      &.selected {
        color: $blue;
      }
    }

    .no-options {
      padding: 0.8rem 1rem;
      color: #999;
    }
  }
}
</style>
