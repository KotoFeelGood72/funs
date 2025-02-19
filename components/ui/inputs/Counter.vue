<template>
  <div class="counter">
    <p>{{ label }}</p>
    <div class="counter-buttons">
      <button @click="decrease">
        <Icon name="f:minus" />
      </button>
      <span>{{ localValue }}</span>
      <button @click="increase">
        <Icon name="f:plus" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

/**
 *  Добавляем пропы:
 *  1. minValue — минимально допустимое значение (по умолчанию 0)
 *  2. maxValue — максимально допустимое значение (по умолчанию бесконечность)
 */
const props = defineProps<{
  modelValue: number;
  label: string;
  minValue?: number;
  maxValue?: number;
}>();

const emit = defineEmits(["update:modelValue"]);

// Устанавливаем "умолчания" для minValue и maxValue, если их не передали
const minVal = computed(() => props.minValue ?? 0);
const maxVal = computed(() => props.maxValue ?? Infinity);

/**
 * localValue — computed на базе modelValue, но в сеттере
 * мы проверяем, не вышло ли значение за диапазон [minVal, maxVal].
 */
const localValue = computed<number>({
  get: () => props.modelValue,
  set: (newValue: number) => {
    if (newValue < minVal.value) {
      newValue = minVal.value;
    }
    if (newValue > maxVal.value) {
      newValue = maxVal.value;
    }
    emit("update:modelValue", newValue);
  },
});

/**
 * decrease: уменьшаем на 1, но не даём уйти ниже minVal
 */
const decrease = () => {
  localValue.value = localValue.value - 1;
};

/**
 * increase: увеличиваем на 1, но не даём уйти выше maxVal
 */
const increase = () => {
  localValue.value = localValue.value + 1;
};
</script>

<style scoped lang="scss">
.counter {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  grid-gap: 1.6rem;

  @include bp($point_2) {
    grid-gap: 1rem;
  }

  p {
    font-size: 1.6rem;
    font-family: $font_3;
    @include flex-start;
    color: $dark;

    @include bp($point_2) {
      font-size: 1.4rem;
    }
  }
}

.counter-buttons {
  border: 0.1rem solid $light;
  border-radius: 0.8rem;
  @include flex-center;
  gap: 1.6rem;
  overflow: hidden;

  span {
    font-size: 1.8rem;
    font-family: $font_3;
    @include bp($point_2) {
      font-size: 1.4rem;
    }
  }
  button {
    flex-grow: 1;
    height: 4rem;
    cursor: pointer;
    @include flex-center;
    transition: all 0.3s ease-in-out;

    @include bp($point_2) {
      height: 3rem;
    }
    &:hover {
      background-color: $gray-light;
    }
  }
}
</style>
