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

const props = defineProps<{
  modelValue: number;
  label: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});

const decrease = () => {
  if (localValue.value > 1) {
    localValue.value -= 1;
  }
};

const increase = () => {
  localValue.value += 1;
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
