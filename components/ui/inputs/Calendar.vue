<template>
  <div class="air-date">
    <VueDatePicker
      v-model="localValue"
      :range="isRange"
      :state="isError"
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
import { ref, watch, computed } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps<{
  startDate?: string | null;
  endDate?: string | null;
  isRange?: boolean;
  label?: string;
  isError?: boolean;
}>();

const emit = defineEmits<{
  (event: "update:startDate", value: string | null): void;
  (event: "update:endDate", value: string | null): void;
}>();

const localValue = ref<any>(null);
const today = new Date();

const formatToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
watch(
  () => [props.startDate, props.endDate],
  ([newStart, newEnd]) => {
    if (props.isRange) {
      // Устанавливаем начальную дату на сегодня, если ничего не задано
      localValue.value = [
        newStart ? new Date(newStart) : today,
        newEnd ? new Date(newEnd) : null,
      ];
    } else {
      // Для одиночного выбора
      localValue.value = newStart ? new Date(newStart) : today; // Используем текущую дату
    }
  },
  { immediate: true }
);

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
      // Одиночный выбор
      emit(
        "update:startDate",
        newValue instanceof Date ? formatToYYYYMMDD(newValue) : null
      );
      emit("update:endDate", null); // endDate всегда null
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

const formatDateRange = (range: Date[] | null) => {
  if (!range || range.length === 0 || !range[0]) {
    return "Выбрать даты"; // Если ничего не выбрано
  }

  const [start, end] = range;

  const format = (date: Date, showYear = true) => {
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
      year: showYear ? "numeric" : undefined,
    });
  };

  // Проверяем, совпадают ли года
  const sameYear = start?.getFullYear() === end?.getFullYear();
  const formattedStart = start ? format(start, false) : "Начало";
  const formattedEnd = end ? format(end, true) : "";

  return sameYear
    ? `${formattedStart} — ${formattedEnd}`
    : `${format(start, true)} — ${formattedEnd}`;
};
</script>

<style scoped lang="scss">
.air-date {
  width: 100%;
}
:deep(.dp__menu_inner) {
  font-size: 1.6rem;
}
:deep(.dp__action_button) {
  font-size: 1.6rem;
}
:deep(.dp__selection_preview) {
  font-size: 1.6rem;
}
:deep(.dp__input) {
  border: none;
  border-bottom: 0.1rem solid $blue;
  border-radius: 0 !important;
  font-size: 1.8rem;
  padding: 0.85rem 1.6rem !important;
  color: $black;

  &::-webkit-input-placeholder {
    opacity: 1;
    color: var(--dark);
  }
}

:deep(.dp__input_icon) {
  right: 1.6rem;
  left: auto;
  color: var(--blue);
  display: flex;
  align-items: center;
  justify-content: center;
}

.label {
  display: block;
  font-size: 1.4rem;
  padding-left: 1.6rem;
  margin-bottom: -1rem;
  position: relative;
  z-index: 22;
  color: $blue;
}

.ic {
  color: $blue;
}

:deep(.dp__input) {
  border-bottom: 0.1rem solid $blue;
  border-radius: 0 !important;
}

:deep(.dp__input_valid) {
  box-shadow: none !important;
}
:deep(.dp__input_invalid) {
  box-shadow: none !important;
}
</style>
