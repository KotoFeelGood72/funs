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
      :placeholder="dropdownOpen ? '' : placeholder"
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
import { ref, computed, defineEmits } from "vue";
import { useFiltersStore } from "~/store/useFilterStore";

// Пропсы
const props = defineProps<{
  options: Array<{ name: string; value: string }>; // Список опций
  modelValue: { name: string; value: string }; // Объект, связанный через v-model
  placeholder?: string; // Текст-заполнитель
  label?: string; // Метка поля
}>();

// Эмиссия события для обновления modelValue
const emit = defineEmits(["update:modelValue"]);

// Получение метода clearPlace из store
const { clearPlace } = useFiltersStore();

// Локальное значение через computed
const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// Вычисляемое значение для отображения в input
const displayName = computed(() => localValue.value?.name || "");

// Состояние дропдауна
const dropdownOpen = ref(false);

const toggleDropdown = (open: boolean) => {
  console.log("Received open state:", open); // Проверьте, передается ли true
  setTimeout(() => {
    dropdownOpen.value = open;
    console.log("Dropdown state after update:", dropdownOpen.value);
    if (!open) {
      clearPlace();
    }
  }, 150);
};

// Обработка выбора опции
const selectOption = (option: { name: string; value: string }) => {
  emit("update:modelValue", option); // Устанавливаем выбранный объект
  clearPlace(); // Вызываем clearPlace после выбора
  toggleDropdown(false); // Закрываем дропдаун
};

// Обработка ввода в поле
const onInput = (event: InputEvent) => {
  const value = (event.target as HTMLInputElement).value;
  emit("update:modelValue", { name: value, value: "" }); // Обновляем только имя
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
