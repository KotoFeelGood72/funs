<template>
  <div class="range">
    <div class="range-labels">
      <span>{{ formattedValue(localMin) }}</span>
      <span>{{ formattedValue(localMax) }}</span>
    </div>
    <div class="range-slider">
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model="localMin"
        @input="onInput('min', localMin)"
      />
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model="localMax"
        @input="onInput('max', localMax)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  min: number; // Минимальное значение
  max: number; // Максимальное значение
  step: number; // Шаг изменения
  valueMin: number; // Начальное значение минимального ползунка
  valueMax: number; // Начальное значение максимального ползунка
  format: "time" | "currency"; // Определяет, как форматировать значения
}>();

const emit = defineEmits(["update:valueMin", "update:valueMax"]);

// Локальные значения ползунков
const localMin = ref(props.valueMin);
const localMax = ref(props.valueMax);

// Следим за внешними изменениями
watch(
  () => props.valueMin,
  (newVal) => {
    localMin.value = newVal;
  }
);

watch(
  () => props.valueMax,
  (newVal) => {
    localMax.value = newVal;
  }
);

// Форматируем значение в зависимости от типа
const formattedValue = (value: number): string => {
  if (props.format === "time") {
    // Формат времени в "часы и минуты"
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours}ч ${minutes}м`;
  } else if (props.format === "currency") {
    // Формат цены
    return `${value.toLocaleString()} ₽`;
  }
  return value.toString();
};

// Обработка событий ввода
const onInput = (type: "min" | "max", value: number) => {
  if (type === "min") {
    // Убедиться, что `min` не превышает `max`
    if (value > localMax.value) {
      localMin.value = localMax.value;
    } else {
      localMin.value = value;
    }
    emit("update:valueMin", localMin.value);
  } else {
    // Убедиться, что `max` не меньше `min`
    if (value < localMin.value) {
      localMax.value = localMin.value;
    } else {
      localMax.value = value;
    }
    emit("update:valueMax", localMax.value);
  }
};
</script>

<style scoped lang="scss">
.range {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.range-labels {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.9rem;
}

.range-slider {
  position: relative;
  width: 100%;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  background: #d3d3d3;
  border-radius: 5px;
  outline: none;
  position: absolute;
  pointer-events: none; /* Скрываем наложение ползунков */
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #007bff;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: all;
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #007bff;
  border-radius: 50%;
  cursor: pointer;
}
</style>
