<template>
  <div class="textarea">
    <label :for="id">{{ label }}</label>
    <textarea v-model="localValue" :id="id"></textarea>
  </div>
</template>

<script setup lang="ts">
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
const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});
</script>

<style scoped lang="scss"></style>
