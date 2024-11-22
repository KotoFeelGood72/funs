<template>
  <div class="radios">
    <div class="radio" v-for="(item, i) in items" :key="'radio-items-' + i">
      <label :for="'radio-items-' + i">{{ item.name }}</label>
      <input
        type="radio"
        :id="'radio-items-' + i"
        :name="name"
        :value="item.val"
        v-model="localValue"
      />
      <div class="ic"><Icon name="f:check" /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: any[];
  name?: string;
  modelValue: any;
}>();

const emit = defineEmits(["update:modelValue"]);

// Локальная привязка к значению
const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});
</script>

<style scoped lang="scss"></style>
