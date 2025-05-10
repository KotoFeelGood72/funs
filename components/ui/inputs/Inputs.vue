<template>
  <div class="input__w">
    <div class="label" v-if="label">{{ label }}</div>
    <div class="input">
      <input
        :type="isPasswordVisible ? 'text' : type"
        v-model="localValue"
        :id="id"
        :placeholder="placeholder"
        @input="validateInput"
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
  </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";

const toast = useToast();

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    id?: string;
    type?: "text" | "email" | "password" | "date";
    label?: string;
    icon?: string;
    placeholder?: string;
    mode?: "english" | "default";
  }>(),
  {
    modelValue: "",
    id: "",
    label: "",
    icon: "",
    placeholder: "",
    mode: "default",
  }
);

const emit = defineEmits(["update:modelValue"]);
const isPasswordVisible = ref<boolean>(false);

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});

const togglePasswordVisibility = () => {
  if (props.type === "password") {
    isPasswordVisible.value = !isPasswordVisible.value;
  }
};

const validateInput = (event: Event) => {
  if (props.mode === "english") {
    const input = (event.target as HTMLInputElement).value;
    const englishOnly = /^[A-Za-z0-9@._-]*$/;

    if (!englishOnly.test(input)) {
      toast.warning("Разрешен ввод только на английском языке!");
      localValue.value = input.replace(/[^A-Za-z0-9@._-]/g, "");
    }
  }
};
</script>

<style scoped lang="scss">
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
</style>
