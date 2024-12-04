<template>
  <div class="select">
    <label :class="{ active: dropdownOpen || displayName }" class="label">
      {{ label }}
    </label>
    <input
      type="text"
      :value="displayName"
      @focus="toggleDropdown(true)"
      @blur="toggleDropdown(false)"
      @input="onInput($event)"
      class="input"
    />

    <ul v-if="dropdownOpen && options.length > 0" class="options">
      <li
        v-for="(option, index) in options"
        :key="index"
        :class="{ selected: option.value === displayName }"
        @mousedown="selectOption(option)"
      >
        {{ option.name }}
      </li>
      <li v-if="options.length === 0" class="no-options">
        Нет доступных вариантов
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, onMounted } from "vue";
import { useFiltersStore } from "~/store/useFilterStore";

// Пропсы
const props = defineProps<{
  options: Array<{ name: string; value: string }>; // Список опций
  modelValue: { name: string; value: string }; // Текущее выбранное значение
  defaultIndex?: number; // Индекс для дефолтного значения
  label?: string; // Метка для поля
}>();

const emit = defineEmits(["update:modelValue"]);
const { clearPlace } = useFiltersStore();

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// Отображаемое имя
const displayName = computed(() => localValue.value?.name || "");

// Состояние dropdown
const dropdownOpen = ref(false);

// Переключение dropdown
const toggleDropdown = (open: boolean) => {
  setTimeout(() => {
    dropdownOpen.value = open;
    if (!open) {
      clearPlace();
    }
  }, 50);
};

// Выбор опции
const selectOption = (option: { name: string; value: string }) => {
  emit("update:modelValue", option); // Устанавливаем выбранное значение
  clearPlace();
  toggleDropdown(false);
};

// Обработка ввода
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement; // Явное указание типа
  const value = target.value;
  emit("update:modelValue", { name: value, value: "" }); // Устанавливаем значение
};

onMounted(() => {
  if (!localValue.value?.value && props.options.length > 0) {
    const defaultOption =
      props.options[props.defaultIndex || 0] || props.options[0]; // Значение по индексу или первое
    emit("update:modelValue", defaultOption);
  }
});
</script>

<style scoped lang="scss">
.select {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  // gap: 0.5rem;

  .label {
    padding-left: 1.6rem;
    pointer-events: none;
    font-family: $font_2;
    color: $blue;
    font-size: 1.4rem;
    margin-bottom: -1rem;
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
      font-size: 1.8rem;
      padding: 0.8rem 1rem;
      color: $dark;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #f5f5f5;
      }

      &.selected {
        background-color: #e6f7ff;
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