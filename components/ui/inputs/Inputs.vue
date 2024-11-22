<template>
  <div class="input">
    <label :for="id">{{ label }}</label>
    <input :type="type" v-model="localValue" :id="id" />
  </div>
</template>

<script setup lang="ts">
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
const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});
</script>

<style scoped lang="scss"></style>
