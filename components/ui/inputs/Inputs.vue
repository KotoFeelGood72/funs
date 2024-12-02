<template>
  <div class="input">
    <label :for="id" :class="{ active: localValue || isFocused }">
      {{ label }}
    </label>
    <input
      ref="inputRef"
      :type="type"
      v-model="localValue"
      :id="id"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <div class="input_ic" v-if="icon">
      <Icon :name="'f:' + icon" />
    </div>
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
    icon?: string;
  }>(),
  {
    modelValue: "",
    id: "",
    label: "",
    icon: "",
  }
);

const emit = defineEmits(["update:modelValue"]);

// Локальные состояния
const isFocused = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

// Реактивное значение для v-model
const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});

// Обработчики событий фокуса и потери фокуса
const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};

// Публичный метод для установки фокуса
const focusInput = () => {
  inputRef.value?.focus();
};

// Экспорт метода для родительского компонента
defineExpose({
  focus: focusInput,
});
</script>

<style scoped lang="scss">
.input {
  position: relative;
  width: 100%;
  height: 4.8rem;
  display: flex;
  align-items: flex-end;
}

label {
  position: absolute;
  left: 1.8rem;
  top: 1.8rem;
  font-size: 1.8rem;
  color: $blue;
  pointer-events: none;
  transition: all 0.2s ease-in-out;
  color: $black;
}

input {
  width: 100%;
  padding: 0.3rem 1.6rem 0.6rem 1.6rem;
  font-size: 1.8rem;
  border: none;
  border-bottom: 0.1rem solid $blue;
  outline: none;
}

input:focus {
  border-bottom: 0.1rem solid $blue;
}

label.active {
  left: 1.6rem;
  top: 0;
  font-size: 1.4rem;
  color: $blue;
}
</style>