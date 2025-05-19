<template>
  <div class="input" :class="{ active: localValue || isFocused || type === 'date' }">
    <label :for="id">{{ label }}</label>
    <input
      :type="isPasswordVisible ? 'text' : type"
      v-model="localValue"
      :id="id"
      :placeholder="type === 'date' ? '' : placeholder"
      v-maska="maskOptions"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <div
      v-if="type === 'password' || icon"
      class="input_ic"
      @click="togglePasswordVisibility"
    >
      <Icon
        :name="isPasswordVisible ? 'fluent:eye-16-filled' : 'fluent:eye-off-16-filled'"
        :size="22"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { vMaska } from "maska/vue";

const props = defineProps<{
  modelValue?: string;
  id?: string;
  type?: "text" | "email" | "password" | "date" | "tel";
  label: string;
  icon?: string;
  placeholder?: string;
  mask?: string;
}>();

const emit = defineEmits(["update:modelValue"]);
const isFocused = ref(false);
const isPasswordVisible = ref(false);

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});

// Опции для maska
const maskOptions = computed(() => ({
  mask: props.mask || "", // Передаем маску из props
}));

const togglePasswordVisibility = () => {
  if (props.type === "password") {
    isPasswordVisible.value = !isPasswordVisible.value;
  }
};

// Экспорт, если понадобится доступ к input
defineExpose({ localValue });
</script>

<style scoped lang="scss">
.input__w {
  flex-grow: 1;
  width: 100%;
}
.input {
  position: relative;
  width: 100%;
  height: 4.2rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
}

input {
  border-radius: 0.5rem;
  width: 100%;
  height: 4.6rem;
  font-size: 1.8rem;
  border: none;
  outline: none;
  padding: 1.1rem 1.6rem;
  font-size: 1.6rem;
  border: 0.1rem solid #d8d7d7;

  &:focus {
    border: 0.1rem solid $light-blue;
  }
}

.input_ic {
  position: absolute;
  top: 50%;
  right: 1.6rem;
  transform: translateY(-50%);
  cursor: pointer;
  @include flex-center;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
}

.label {
  font-size: 1.6rem;
  color: $gray;
  margin-bottom: 1rem;
  display: flex;
}
</style>
