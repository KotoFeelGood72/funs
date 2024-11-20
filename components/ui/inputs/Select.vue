<template>
  <div class="select" @click="toggleDropdown">
    <!-- Метка -->
    <label :class="{ active: dropdownOpen || modelValue }" class="label">
      {{ label }}
    </label>

    <!-- Выбранное значение -->
    <div class="selected">
      <p>{{ modelValue }}</p>
      <slot />
    </div>

    <!-- Выпадающий список -->
    <ul v-if="dropdownOpen" class="options">
      <li
        v-for="(option, index) in options"
        :key="index"
        :class="{ selected: option === modelValue }"
        @click.stop="selectOption(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

// Пропсы
const props = defineProps<{
  options: string[]; // Список опций
  modelValue: string; // Текущее выбранное значение
  label?: string; // Текст метки
}>();

// Эмит события
const emit = defineEmits(["update:modelValue"]);

// Состояния
const dropdownOpen = ref(false); // Открытие/закрытие выпадающего списка

// Установить активное значение при инициализации
onMounted(() => {
  if (!props.modelValue && props.options.length > 0) {
    emit("update:modelValue", props.options[0]);
  }
});

// Переключение дропдауна
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
  console.log("Good");
};

// Выбор опции
const selectOption = (option: string) => {
  emit("update:modelValue", option); // Обновляем значение через v-model
  dropdownOpen.value = false;
};
</script>

<style scoped lang="scss">
.select {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;

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

  .selected {
    font-family: $font_2;
    padding: 1rem 1.6rem;
    width: 100%;
    background: transparent;
    z-index: 1;
    border-bottom: 0.1rem solid $blue;
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
