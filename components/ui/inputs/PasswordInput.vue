<template>
  <div class="input">
    <label :for="id">
      {{ label }}
    </label>
    <input
      :type="showPassword ? 'text' : type"
      v-model="localValue"
      :id="id"
      :placeholder="placeholder"
    />
    <div class="input_ic" v-if="icon">
      <Icon :name="'f:' + icon" :size="18" />
    </div>
    <div
      class="toggle-password"
      v-if="type === 'password' && !confirmationValue"
      @click="togglePasswordVisibility"
    >
      <Icon
        :name="
          showPassword ? 'fluent:eye-off-32-regular' : 'fluent:eye-32-regular'
        "
        :size="24"
      />
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    id?: string;
    type?: "text" | "email" | "password";
    label: string;
    icon?: string;
    placeholder?: string;
    confirmationValue?: string | any; // значение для подтверждения пароля
  }>(),
  {
    modelValue: "",
    id: "",
    label: "",
    icon: "",
    placeholder: "",
    confirmationValue: null,
  }
);

const emit = defineEmits(["update:modelValue", "input-error"]);

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});

const showPassword = ref(false);
const error = computed(() => {
  if (props.type === "password" && props.confirmationValue !== null) {
    return props.confirmationValue !== localValue.value
      ? "Пароли не совпадают"
      : null;
  }
  return null;
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped lang="scss">
.input {
  position: relative;
  width: 100%;
  height: 4.8rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  padding-left: 1.6rem;
  font-size: 1.4rem;
  color: $blue;
  pointer-events: none;
  // line-height: 1rem;
}

input {
  width: 100%;
  height: 100%;
  padding: 0.3rem 1.6rem 0.6rem 1.6rem;
  font-size: 1.8rem;
  border: none;
  border-bottom: 0.1rem solid $blue;
  outline: none;

  &::-webkit-input-placeholder {
    opacity: 1;
    color: $dark;
  }
}

input:focus {
  border-bottom: 0.1rem solid $blue;
}

.input_ic {
  position: absolute;
  top: 60%;
  right: 3.6rem; // Сдвинуто из-за иконки для пароля
  transform: translateY(-50%);
  @include flex-center;
}

.toggle-password {
  position: absolute;
  top: 60%;
  right: 1.6rem;
  transform: translateY(-50%);
  cursor: pointer;
  @include flex-center;
  color: $blue;
}

.error-message {
  color: red;
  font-size: 1.2rem;
  margin-top: 0.4rem;
}
</style>
