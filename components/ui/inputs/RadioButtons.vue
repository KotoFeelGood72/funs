<template>
  <div class="radio-buttons">
    <label class="question-label">{{ label }}</label>
    <div class="radio-options">
      <label
        class="radio-option"
        v-for="(option, i) in options"
        :key="'option-item-' + i"
      >
        <input
          type="radio"
          :name="id"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="$emit('update:modelValue', option.value)"
        />
        <span>{{ option.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  options: { label: string; value: string }[];
  modelValue: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<style scoped lang="scss">
.radio-buttons {
  padding: 1.6rem 0;
  &:not(:last-child) {
    border-bottom: 0.1rem solid $gray-light;
  }
}
.radio-options {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.radio-option {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  padding-left: 3rem;
  font-size: 1.6rem;
  cursor: pointer;

  input {
    display: none;

    &:checked + span::before {
      opacity: 1;
      visibility: visible;
    }

    &:checked + span::after {
      border-color: $blue;
    }
  }

  span {
    position: relative;
    padding-left: 2.4rem;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 1.2rem;
      height: 1.2rem;
      background-color: $blue;
      border-radius: 50%;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease;
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: -0.4rem;
      transform: translateY(-50%);
      width: 2rem;
      height: 2rem;
      border: 2px solid $light;
      border-radius: 50%;
      transition: all 0.2s ease;
    }
  }
}

.radio-buttons {
  @include flex-space;
}
</style>
