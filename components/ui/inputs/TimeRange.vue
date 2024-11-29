<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";

const props = defineProps<{
  min: number;
  max: number;
  step: number;
  minValue: number;
  maxValue: number;
}>();

const emit = defineEmits(["update:minValue", "update:maxValue"]);

// Slider references
const slider = ref<any>(null);
const sliderMinValue = ref(props.minValue);
const sliderMaxValue = ref(props.maxValue);

// Helper function to format time from minutes
const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}ч ${mins}м`;
};

// Percentage calculation
const getPercent = (value: any, min: any, max: any) => {
  return ((value - min) / (max - min)) * 100;
};

const setCSSProps = (left: number, right: number) => {
  slider.value.style.setProperty("--progressLeft", `${left}%`);
  slider.value.style.setProperty("--progressRight", `${right}%`);
};

// Watch for slider value updates and emit changes
watchEffect(() => {
  if (slider.value) {
    // Emit обновленные значения
    emit("update:minValue", sliderMinValue.value);
    emit("update:maxValue", sliderMaxValue.value);

    // Calculate percentages
    const leftPercent = getPercent(sliderMinValue.value, props.min, props.max);
    const rightPercent = getPercent(sliderMaxValue.value, props.min, props.max);

    // Set CSS variables
    setCSSProps(leftPercent, 100 - rightPercent);
  }
});

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.name === "min") {
    target.value =
      +target.value > sliderMaxValue.value
        ? sliderMaxValue.value.toString()
        : target.value;
    sliderMinValue.value = parseFloat(target.value);
  }

  if (target.name === "max") {
    target.value =
      +target.value < sliderMinValue.value
        ? sliderMinValue.value.toString()
        : target.value;
    sliderMaxValue.value = parseFloat(target.value);
  }
};
</script>

<template>
  <div class="slider__w">
    <div class="slider__head">
      <p>Время в пути</p>
      <p>{{ formatTime(sliderMinValue) }} — {{ formatTime(sliderMaxValue) }}</p>
    </div>
    <div ref="slider" class="custom-slider minmax">
      <div class="minmax-indicator"></div>
      <input
        type="range"
        name="min"
        id="min"
        :min="min"
        :max="max"
        :value="sliderMinValue"
        :step="step"
        @input="onInput"
      />
      <input
        type="range"
        name="max"
        id="max"
        :min="min"
        :max="max"
        :value="sliderMaxValue"
        :step="step"
        @input="onInput"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.custom-slider {
  --trackHeight: 0.9rem;
  --thumbRadius: 1.6rem;
}

.custom-slider input[type="range"] {
  position: relative;
  appearance: none;
  background: none;
  border-radius: 999px;
  z-index: 0;
  height: 100%;
  pointer-events: none;
}

/* ::before element to replace the slider track */
.custom-slider input[type="range"]::before {
  content: "";
  display: block;
  position: absolute;
  width: var(--ProgressPercent, 100%);
  height: 100%;
  background: $light;
  border-radius: 999px;
}

/* `::-webkit-slider-runnable-track` targets the track (background) of a range slider in chrome and safari browsers. */
.custom-slider input[type="range"]::-webkit-slider-runnable-track {
  appearance: none;
  background: $light;
  height: var(--trackHeight);
  border-radius: 999px;
}

.custom-slider input[type="range"]::-webkit-slider-thumb {
  position: relative;
  width: var(--thumbRadius);
  height: var(--thumbRadius);
  margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2);
  background: $blue;
  border: 1px solid $blue;
  border-radius: 999px;
  pointer-events: all;
  appearance: none;
  z-index: 1;
}

/* `::-moz-range-track` targets the track (background) of a range slider in Mozilla Firefox. */
.custom-slider.default input[type="range"]::-moz-range-track {
  appearance: none;
  background: $light;
  height: var(--trackHeight);
  border-radius: 999px;
}

.custom-slider input[type="range"]::-moz-range-thumb {
  position: relative;
  box-sizing: border-box;
  width: var(--thumbRadius);
  height: var(--thumbRadius);
  margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2);
  background: $light;
  border: 1px solid $light;
  border-radius: 999px;
  pointer-events: all;
  appearance: none;
  z-index: 1;
}

.custom-slider.minmax {
  position: relative;
  height: var(--trackHeight);
  background: $light;
  border-radius: 999px;
  // margin: 0.5rem 0;
  --progressLeft: 0%;
  --progressRight: 0%;
}

.custom-slider .minmax-indicator {
  position: absolute;
  height: 100%;
  pointer-events: none;
  left: var(--thumbRadius);
  right: var(--thumbRadius);
}

.custom-slider .minmax-indicator::before {
  content: "";
  position: absolute;
  background: $light;
  height: 100%;
  left: var(--progressLeft);
  right: var(--progressRight);
}

.custom-slider.minmax input[type="range"] {
  position: absolute;
  width: calc(100% - var(--thumbRadius));
  margin: 0;
}

.custom-slider.minmax input[type="range"][name="max"] {
  left: var(--thumbRadius);
}

.custom-slider.minmax input[type="range"]::-webkit-slider-runnable-track {
  background: none;
}

.custom-slider.minmax input[type="range"]::before {
  display: none;
}

.slider__head {
  @include flex-space;
  gap: 1rem;
  font-size: 1.4rem;
  margin-bottom: 1.6rem;
}
</style>
