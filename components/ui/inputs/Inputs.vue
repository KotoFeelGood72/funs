<template>
  <div class="input">
    <label :for="id">
      {{ label }}
    </label>
    <input
      :type="isPasswordVisible ? 'text' : type"
      v-model="localValue"
      :id="id"
      :placeholder="placeholder"
    />
    <div
      class="input_ic"
      v-if="type === 'password' || icon"
      @click="togglePasswordVisibility"
    >
      <Icon
        :name="
          type === 'password'
            ? isPasswordVisible
              ? 'fluent:eye-16-filled'
              : 'fluent:eye-off-16-filled'
            : ''
        "
        :size="18"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: any;
    id?: string;
    type?: "text" | "email" | "password";
    label: string;
    icon?: string;
    placeholder?: string;
  }>(),
  {
    modelValue: "",
    id: "",
    label: "",
    icon: "",
    placeholder: "",
  }
);

const emit = defineEmits(["update:modelValue"]);

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});

// Состояние видимости пароля
const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  if (props.type === "password") {
    isPasswordVisible.value = !isPasswordVisible.value;
  }
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
  line-height: 1rem;
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
  top: 50%;
  right: 1.6rem;
  transform: translateY(-50%);
  cursor: pointer;

  @include flex-center;
}
</style>
