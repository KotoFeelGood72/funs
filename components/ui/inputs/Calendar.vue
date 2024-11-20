<template>
  <div class="air-date">
    <VueDatePicker
      v-model="localValue"
      range
      :hide-navigation="['month', 'year', 'time']"
      :min-date="today"
      :show-last-in-range="false"
      multi-calendars
      no-today
      disable-year-select
      locale="ru"
      cancelText="Отменить"
      selectText="Выбрать"
      :format="formatDateRange"
      placeholder="Выбрать дату поездки"
    >
      <template #input-icon>
        <Icon name="f:calendar" />
      </template>
    </VueDatePicker>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// Пропсы
const props = defineProps<{
  modelValue: Date[] | null;
}>();

// Эмиссия событий
const emit = defineEmits<{
  (event: "update:modelValue", value: Date[] | null): void;
}>();

// Локальное состояние
const today = new Date();
const localValue = ref<Date[] | null>(null);

// Следим за изменением значения
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      localValue.value = newValue;
    }
  },
  { immediate: true }
);

// Форматирование диапазона дат
const formatDateRange = (range: Date[] | null) => {
  if (!range || range.length !== 2 || !range[0] || !range[1]) {
    return "Выбрать дату поездки";
  }

  const [start, end] = range;

  // Форматируем даты
  const formatDate = (date: Date, includeYear: boolean) =>
    date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
      ...(includeYear ? { year: "numeric" } : {}),
    });

  const startDate = formatDate(start, false);
  const endDate = formatDate(end, true);

  return `${startDate} — ${endDate}`;
};
</script>

<style scoped lang="scss">
:deep(.dp__input) {
  border: none;
  border-bottom: 0.1rem solid $blue !important;
  border-radius: 0 !important;
  font-size: 1.8rem;
  padding: 1rem 1.6rem;
  color: $dark;

  &::-webkit-input-placeholder {
    opacity: 1;
    color: $dark;
  }
}

:deep(.dp__input_icon) {
  right: 1.6rem;
  left: auto;
  color: $blue;
  @include flex-center;
}

:deep(.dp--clear-btn) {
  display: none;
}

:deep(.dp__calendar_header_item) {
  font-size: 1.6rem;
  font-family: $font_2;
}

:deep(.dp__cell_inner) {
  font-size: 1.4rem;
}

:deep(.dp__month_year_select) {
  font-size: 1.6rem;
}
:deep(.dp__overlay_cell_pad) {
  font-size: 1.6rem;
}
:deep(.dp__selection_preview) {
  font-size: 1.6rem;
}
:deep(.dp__action_button) {
  font-size: 1.6rem;
  padding: 1rem 1.6rem;
}

:deep(.dp__action_select) {
  background-color: $blue;
}
</style>
