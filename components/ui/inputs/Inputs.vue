<template>
  <div class="input">
    <label :for="id" :class="{ active: localValue || isFocused }">{{
      label
    }}</label>
    <input
      :type="type"
      v-model="localValue"
      :id="id"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    id?: string;
    type?: "text" | "email";
    label: string;
  }>(),
  {
    modelValue: "",
    id: "",
    label: "",
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
.input {
  position: relative;
  display: inline-block;
  width: 100%;
}

label {
  position: absolute;
  left: 1.6rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.8rem;
  color: $blue;
  pointer-events: none;
  transition: all 0.2s ease-in-out;
}

input {
  width: 100%;
  padding: 1.6rem;
  font-size: 1.8rem;
  border: none;
  border-bottom: 0.1rem solid $blue;
  outline: none;
}

input:focus {
  border-bottom: 0.1rem solid $blue;
  // border: 0.1rem solid $blue;
  // border-radius: 0.4rem;
}

label.active {
  left: 0;
  top: -0.2rem;
  font-size: 1.4rem;
  color: $blue;
  background-color: $white;
  padding: 0.4rem 1rem;
}
</style>
