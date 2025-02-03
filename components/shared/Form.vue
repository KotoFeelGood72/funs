<template>
  <div class="form">
    <Inputs id="form-name" label="Имя" v-model="formData.name" />
    <Inputs
      type="email"
      id="form-email"
      label="Email"
      v-model="formData.email"
    />
    <Textareas
      id="form-descriptiion"
      v-model="formData.text"
      label="Обращение"
    />
    <btn
      :name="isLoadingFormAnonim ? 'Отправляется...' : 'Отправить'"
      icon="right"
      @click="sendFormAnonim"
      style="width: 100%; justify-content: center"
      :loading="isLoadingFormAnonim"
    />
  </div>
</template>

<script setup lang="ts">
import Inputs from "../ui/inputs/Inputs.vue";
import Textareas from "../ui/inputs/Textareas.vue";
import { useFormSend } from "~/composables/useFormSend";
import btn from "../ui/buttons/btn.vue";

const { sendFormAnonim, formData, isLoadingFormAnonim } = useFormSend();
</script>

<style scoped lang="scss">
.form {
  @include flex-start;
  flex-direction: column;
  gap: 2.4rem;
  flex-grow: 1;
}
</style>
