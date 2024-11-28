<template>
  <div class="textarea">
    <label :for="id" :class="{ active: localValue || isFocused }">{{
      label
    }}</label>
    <textarea
      v-model="localValue"
      :id="id"
      :rows="4"
      @focus="isFocused = true"
      @blur="isFocused = false"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string;
    id?: string;
  }>(),
  {
    modelValue: "",
    label: "",
    id: "",
  }
);

const emit = defineEmits(["update:modelValue"]);
const isFocused = ref(false);
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
}

label {
  position: absolute;
  left: 1.6rem;
  top: 1rem;
  font-size: 1.8rem;
  color: $blue;
  pointer-events: none;
  transition: all 0.2s ease-in-out;
}

textarea {
  border: 0;
  width: 100%;
  padding: 1.6rem;
  font-size: 1.8rem;
  border-bottom: 0.1rem solid $blue;
  outline: none;
  resize: none;
  font-family: $font_2;
}

textarea:focus {
  border-color: $blue;
}

label.active {
  left: 1.4rem;
  top: -1rem;
  font-size: 1.4rem;
  color: $blue;
  background-color: $white;
  padding: 0.5rem 1rem 0.5rem 0.4rem;
  margin: -0.5rem 0 0 -0.5rem;
}
</style>
