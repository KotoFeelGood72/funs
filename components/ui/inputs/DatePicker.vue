<template>
  <div class="air-date">
    <label for="date-picker" class="label">Дата рождения</label>
    <VueDatePicker
      id="date-picker"
      v-model="localValue"
      :hide-navigation="['month', 'year', 'time']"
      :show-last-in-range="false"
      no-today
      locale="ru"
      cancel-text="Отменить"
      select-text="Выбрать"
      :format="formatDate"
      placeholder="ДД.ММ.ГГГГ"
    >
      <template #input-icon>
      <div class="ic">
        <Icon name="f:calendar" />
      </div>
      </template>
    </VueDatePicker>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps<{
  modelValue: string | null;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string | null): void;
}>();

const today = new Date();

// Функция для форматирования в ДД.ММ.ГГГГ
const formatToDDMMYYYY = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

// Локальное значение
const localValue = computed<Date | null>({
  get: () => (props.modelValue ? new Date(props.modelValue) : null),
  set: (newValue) => {
    emit("update:modelValue", newValue ? formatToDDMMYYYY(newValue) : null);
  },
});

// Функция форматирования для отображения в поле
const formatDate = (date: Date | null): string => {
  return date ? formatToDDMMYYYY(date) : "ДД.ММ.ГГГГ";
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
  padding: .85rem 1.6rem!important;
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
</style>