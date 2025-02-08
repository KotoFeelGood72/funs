<template>
  <div
    class="input"
    :class="{ active: localValue || isFocused || type === 'date' }"
  >
    <label :for="id">
      {{ label }}
    </label>
    <input
      :type="isPasswordVisible ? 'text' : type"
      v-model="localValue"
      :id="id"
      :placeholder="type === 'date' ? '' : placeholder"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <div
      v-if="type !== 'date' && (type === 'password' || icon)"
      class="input_ic"
      @click="togglePasswordVisibility"
    >
      <Icon
        :name="
          type === 'password'
            ? isPasswordVisible
              ? 'fluent:eye-16-filled'
              : 'fluent:eye-off-16-filled'
            : icon
        "
        :size="22"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: any;
    id?: string;
    type?: "text" | "email" | "password" | "date" | "tel";
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
const isFocused = ref<boolean>(false);
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
  height: 4.2rem;
  border: 0.1rem solid transparent;
  border-bottom: 0.1rem solid $blue;
  transition: all 0.3s ease-in-out;

  @include bp($point_2) {
    height: 3rem;
  }

  &.active {
    label {
      top: 0;
      font-size: 1.4rem;
      color: $blue;
      @include bp($point_2) {
        font-size: 1rem;
        top: -0.2rem;
      }
    }
  }
}

label {
  padding-left: 1.6rem;
  color: $blue;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0.9rem;
  padding: 0 0.7rem;
  transition: all 0.3s ease-in-out;
  font-family: $font_2;
  font-size: 1.8rem;
  color: $dark;

  @include bp($point_2) {
    font-size: 1.4rem;
    padding: 0;
  }
}

input {
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
  font-size: 1.8rem;
  border: none;
  outline: none;
  padding: 1.1rem 1.6rem;
  font-size: 1.8rem;

  @include bp($point_2) {
    font-size: 1.4rem;
    padding: 1rem;
  }

  &::-webkit-input-placeholder {
    opacity: 1;
    color: $dark;
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
</style>
