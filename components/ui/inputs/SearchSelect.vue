<template>
  <div class="select">
    <!-- Метка поля -->
    <label :class="{ active: dropdownOpen || localValue }" class="label">
      {{ label }}
    </label>

    <!-- Поле поиска -->
    <input
      type="text"
      v-model="localValue"
      @focus="toggleDropdown(true)"
      @blur="toggleDropdown(false)"
      :placeholder="dropdownOpen ? '' : placeholder"
      class="input"
    />

    <!-- Список вариантов -->
    <ul v-if="dropdownOpen" class="options">
      <li
        v-for="(option, index) in filteredOptions"
        :key="index"
        :class="{ selected: option === localValue }"
        @mousedown="selectOption(option)"
      >
        {{ option }}
      </li>
      <li v-if="filteredOptions.length === 0" class="no-options">
        Нет доступных вариантов
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from "vue";

// Пропсы
const props = defineProps<{
  options: string[]; // Список вариантов
  modelValue: string; // Связанное значение через v-model
  placeholder?: string; // Текст-заполнитель
  label?: string; // Метка поля
}>();

// Эмиссия события для обновления modelValue
const emit = defineEmits(["update:modelValue"]);

// Локальное состояние через computed
const localValue = computed({
  get: () => props.modelValue, // Получаем текущее значение
  set: (value: string) => emit("update:modelValue", value), // Обновляем модель
});

// Открытое/закрытое состояние выпадающего списка
const dropdownOpen = ref(false);

// Фильтрация вариантов на основе строки поиска
const filteredOptions = computed(() =>
  props.options.filter((option) =>
    option.toLowerCase().includes(localValue.value.toLowerCase())
  )
);

// Открытие/закрытие дропдауна
const toggleDropdown = (open: boolean) => {
  setTimeout(() => {
    dropdownOpen.value = open;
  }, 150); // Задержка, чтобы избежать закрытия при выборе
};

// Выбор варианта
const selectOption = (option: string) => {
  localValue.value = option; // Обновляем модель через computed
  toggleDropdown(false); // Закрываем дропдаун
};
</script>

<style scoped lang="scss">
.select {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .label {
    position: absolute;
    top: 50%;
    left: 1.6rem;
    transform: translateY(-50%);
    transition: all 0.3s ease;
    pointer-events: none;
    font-size: 1.8rem;
    font-family: $font_2;
    color: $dark;
    &.active {
      top: -0.2rem;
      left: 0.7rem;
      background-color: $white;
      z-index: 22;
      padding: 0 1rem;
      color: $blue;
      font-size: 1.4rem;
    }
  }

  .input {
    @include app;
    font-family: $font_2;
    padding: 1rem 1.6rem;
    width: 100%;
    background: transparent;
    z-index: 1;
    border-bottom: 0.1rem solid $blue;
    font-size: 1.8rem;
    cursor: pointer;
  }

  .options {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    background: $white;
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
