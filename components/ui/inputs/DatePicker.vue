<script setup lang="ts">
import { computed } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// Пропсы с дефолтными значениями
const props = withDefaults(
  defineProps<{
    modelValue: string | null;
    label?: string;
    minDate?: string | null; // Минимальная дата
    maxDate?: string | null; // Максимальная дата
  }>(),
  {
    modelValue: null,
    label: "Дата рождения",
    minDate: null, // По умолчанию минимальное значение не задано
    maxDate: null, // По умолчанию максимальное значение не задано
  }
);

const isFocus = ref<boolean>(false);

// Определяем событие для v-model
const emit = defineEmits<{
  (event: "update:modelValue", value: string | null): void;
}>();

// Функция для форматирования в ДД.ММ.ГГГГ
const formatToDDMMYYYY = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

// Функция для парсинга строки в формате ДД.ММ.ГГГГ в объект Date
const parseDateFromDDMMYYYY = (dateString: string): Date | undefined => {
  const [day, month, year] = dateString.split(".");
  if (!day || !month || !year) return undefined;

  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return isNaN(date.getTime()) ? undefined : date;
};

// Локальное значение, связанное с modelValue
const localValue = computed<Date | undefined>({
  get: () =>
    props.modelValue ? parseDateFromDDMMYYYY(props.modelValue) : undefined,
  set: (newValue) => {
    emit("update:modelValue", newValue ? formatToDDMMYYYY(newValue) : null);
  },
});

// Минимальная дата, преобразованная в объект Date
const parsedMinDate = computed(() =>
  props.minDate ? parseDateFromDDMMYYYY(props.minDate) : undefined
);

// Максимальная дата, преобразованная в объект Date
const parsedMaxDate = computed(() =>
  props.maxDate ? parseDateFromDDMMYYYY(props.maxDate) : undefined
);

// Функция для форматирования даты в поле
const formatDate = (date: Date | undefined): string => {
  return date ? formatToDDMMYYYY(date) : "дд.мм.гггг";
};
</script>

<template>
  <div class="air-date">
    <label for="date-picker" :class="['label', { active: !!localValue }]">{{
      label
    }}</label>
    <VueDatePicker
      id="date-picker"
      v-model="localValue"
      :min-date="parsedMinDate"
      :max-date="parsedMaxDate"
      :hide-navigation="['month', 'year', 'time']"
      :show-last-in-range="false"
      no-today
      locale="ru"
      cancel-text="Отменить"
      select-text="Выбрать"
      :format="formatDate"
    >
      <template #input-icon>
        <div class="ic">
          <Icon name="f:calendar" />
        </div>
      </template>
    </VueDatePicker>
  </div>
</template>

<style scoped lang="scss">
.air-date {
  width: 100%;
  position: relative;
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
  @include flex-center;
}

.label {
  display: block;
  padding-left: 1.6rem;
  z-index: 22;
  color: $blue;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: $dark;
  font-family: $font_2;
  transition: all 0.3s ease-in-out;

  &.active {
    color: $blue;
    font-size: 1.4rem;
    top: 0;
  }
}

.ic {
  color: $blue;
}
</style>
