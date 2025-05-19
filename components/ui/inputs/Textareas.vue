<template>
  <div class="textarea" :class="{ error: error }">
    <label :for="id">{{ label }}</label>
    <textarea v-model="localValue" :id="id" :rows="4"></textarea>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string;
    id?: string;
    error: string | null;
  }>(),
  {
    modelValue: "",
    label: "",
    id: "",
  }
);

const emit = defineEmits(["update:modelValue"]);
const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});
</script>

<style scoped lang="scss">
.textarea {
  position: relative;
  display: inline-block;
  width: 100%;
  border: 0;
  @include app;

  &.error {
    textarea {
      border-color: red;
    }
    label {
      color: red;
    }
  }
}

label {
  font-size: 1.6rem;
  color: #757575;
  margin-bottom: 1rem;
  display: flex;

  @include bp($point_2) {
    font-size: 1.4rem;
  }
}

textarea {
  border: 0;
  width: 100%;
  padding: 1.6rem;
  font-size: 1.8rem;
  border: 0.1rem solid #d8d7d7;
  outline: none;
  resize: none;
  font-family: $font_2;
  border-radius: 0.5rem;

  @include bp($point_2) {
    font-size: 1.4rem;
  }
}

textarea:focus {
  border-color: $blue;
}
</style>
