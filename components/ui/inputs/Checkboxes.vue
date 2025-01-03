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
    <label :for="id"
      >{{ label }}
      <div class="ic-check"><Icon name="f:check" /></div
    ></label>
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
  input {
    display: none;
    &:checked + label {
      .ic-check {
        opacity: 1;
      }
      &:before {
        background-color: $blue;
        border-color: $blue;
      }
    }
  }
}

label {
  position: relative;
  padding-left: 2.8rem;
  cursor: pointer;
  user-select: none;
  font-size: 1.4rem;
  &:hover {
    &:before {
      border-color: $blue;
    }
  }
  &:before {
    content: "";
    border-radius: 0.4rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 1.6rem;
    height: 1.6rem;
    border: 0.1rem solid $light;
    transition: all 0.2s ease-in-out;
  }

  .ic-check {
    position: absolute;
    top: 50%;
    left: 0.05rem;
    transform: translateY(-50%);
    @include flex-center;
    width: 1.5rem;
    height: 1.5rem;
    opacity: 0;
    transition: all 0.2s ease-in-out;
  }
}
</style>
