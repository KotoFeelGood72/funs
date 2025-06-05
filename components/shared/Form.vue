<template>
  <div class="form">
    <Inputs
      id="form-name"
      label="Имя"
      v-model="formData.name"
      :error="v$.name.$error ? v$.name.$errors[0]?.$message : ''"
    />
    <Inputs
      type="email"
      id="form-email"
      label="Email"
      v-model="formData.email"
      :error="v$.email.$error ? v$.email.$errors[0]?.$message : ''"
    />
    <Textareas id="form-descriptiion" v-model="formData.text" label="Обращение" />
    <btn
      :name="isLoadingFormAnonim ? 'Отправляется...' : 'Отправить'"
      icon="mynaui:arrow-right"
      @click="handleSubmit"
      style="width: 100%; justify-content: center"
      :loading="isLoadingFormAnonim"
    />
  </div>
</template>

<script setup lang="ts">
import Inputs from "../ui/inputs/Inputs.vue";
import Textareas from "../ui/inputs/Textareas.vue";
import btn from "../ui/buttons/btn.vue";
import { useFormSend } from "~/composables/useFormSend";
import { useToast } from "vue-toastification";

import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { computed } from "vue";

// импорт из твоего composable
const { sendFormAnonim, formData, isLoadingFormAnonim } = useFormSend();
const toast = useToast();

// правила валидации
const rules = computed(() => ({
  name: { required: helpers.withMessage("Введите имя", required) },
  email: {
    required: helpers.withMessage("Введите email", required),
    email: helpers.withMessage("Некорректный email", email),
  },
  text: { required: helpers.withMessage("Введите обращение", required) },
}));

const v$ = useVuelidate(rules, formData);

const handleSubmit = async () => {
  v$.value.$touch();

  if (!v$.value.$invalid) {
    await sendFormAnonim();
  } else {
    toast.error("Заполните обязательные поля");
  }
};
</script>

<style scoped lang="scss">
.form {
  @include flex-start;
  flex-direction: column;
  gap: 2.4rem;
  flex-grow: 1;

  @include bp($point_2) {
    width: 100%;
  }
}
</style>
