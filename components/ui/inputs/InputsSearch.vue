<template>
  <div class="search">
    <input type="search" v-model="localValue" :id="id" placeholder="Поиск" />
    <div class="submit">
      <Icon name="f:search" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    id?: string;
  }>(),
  {
    modelValue: "",
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
