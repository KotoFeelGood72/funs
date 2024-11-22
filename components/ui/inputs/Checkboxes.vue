<template>
  <div class="checkbox">
    <input
      type="checkbox"
      :id="id"
      :value="value"
      :checked="isChecked"
      @change="updateValue"
      :name="name"
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue?: any[]; // Массив значений
  id: string;
  label: string;
  value: any;
  name?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

// Проверяем, содержится ли значение в массиве выбранных
const isChecked = computed(() => props.modelValue?.includes(props.value));

// Обновляем массив выбранных значений
const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const newValue = [...(props.modelValue || [])];

  if (target.checked) {
    // Добавляем значение, если чекбокс выбран
    newValue.push(props.value);
  } else {
    // Убираем значение, если чекбокс снят
    const index = newValue.indexOf(props.value);
    if (index !== -1) newValue.splice(index, 1);
  }

  emit("update:modelValue", newValue);
};
</script>

<style scoped lang="scss">
.checkbox {
  display: flex;
  align-items: center;

  input[type="checkbox"] {
    margin-right: 0.5rem;
  }

  label {
    cursor: pointer;
  }
}
</style>
