<script setup lang="ts">
import { computed } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = withDefaults(
  defineProps<{
    modelValue: string | null;
    label?: string;
    minDate?: string | null;
    maxDate?: string | null;
  }>(),
  {
    modelValue: null,
    label: "Дата рождения",
    minDate: null,
    maxDate: null,
  }
);

const isFocus = ref<boolean>(false);

const emit = defineEmits<{
  (event: "update:modelValue", value: string | null): void;
}>();

const formatToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseDateFromYYYYMMDD = (dateString: string): Date | undefined => {
  const [year, month, day] = dateString.split("-");
  if (!day || !month || !year) return undefined;

  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return isNaN(date.getTime()) ? undefined : date;
};

const localValue = computed<Date | undefined>({
  get: () =>
    props.modelValue ? parseDateFromYYYYMMDD(props.modelValue) : undefined,
  set: (newValue) => {
    emit("update:modelValue", newValue ? formatToYYYYMMDD(newValue) : null);
  },
});

const parsedMinDate = computed(() =>
  props.minDate ? parseDateFromYYYYMMDD(props.minDate) : undefined
);

const parsedMaxDate = computed(() =>
  props.maxDate ? parseDateFromYYYYMMDD(props.maxDate) : undefined
);

const formatDate = (date: Date | undefined): string => {
  return date ? formatToYYYYMMDD(date) : "гггг-мм-дд";
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
