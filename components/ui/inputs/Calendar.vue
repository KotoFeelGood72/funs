<template>
  <div class="air-date">
    <VueDatePicker
      v-model="localValue"
      :range="isRange"
      :hide-navigation="['month', 'year', 'time']"
      :min-date="today"
      :show-last-in-range="false"
      no-today
      locale="ru"
      cancelText="Отменить"
      selectText="Выбрать"
      :format="isRange ? formatDateRange : formatDate"
      placeholder="Выбрать дату"
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

const props = defineProps<{
  startDate?: string | null;
  endDate?: string | null;
  isRange?: boolean;
}>();

const emit = defineEmits<{
  (event: "update:startDate", value: string | null): void;
  (event: "update:endDate", value: string | null): void;
}>();

const localValue = ref<Date | Date[] | null>(null);
const today = new Date();

const formatToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Следим за внешними значениями и обновляем локальное состояние
watch(
  () => [props.startDate, props.endDate],
  ([newStart, newEnd]) => {
    if (props.isRange) {
      localValue.value =
        newStart && newEnd ? [new Date(newStart), new Date(newEnd)] : null;
    } else {
      localValue.value = newStart ? new Date(newStart) : null;
    }
  },
  { immediate: true }
);

// Следим за изменением локального значения и эмитим события
watch(
  () => localValue.value,
  (newValue) => {
    if (props.isRange) {
      if (Array.isArray(newValue)) {
        emit(
          "update:startDate",
          newValue[0] ? formatToYYYYMMDD(newValue[0]) : null
        );
        emit(
          "update:endDate",
          newValue[1] ? formatToYYYYMMDD(newValue[1]) : null
        );
      } else {
        emit("update:startDate", null);
        emit("update:endDate", null);
      }
    } else {
      emit(
        "update:startDate",
        newValue instanceof Date ? formatToYYYYMMDD(newValue) : null
      );
      emit("update:endDate", null); // Для одиночного календаря endDate всегда null
    }
  }
);

// Форматирование одиночной даты
const formatDate = (date: Date | null) => {
  if (!date) return "Выбрать дату";
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Форматирование диапазона дат
const formatDateRange = (range: Date[] | null) => {
  if (!range || range.length !== 2 || !range[0] || !range[1]) {
    return "Выбрать даты";
  }

  const [start, end] = range;

  const format = (date: Date) =>
    date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return `${format(start)} — ${format(end)}`;
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
