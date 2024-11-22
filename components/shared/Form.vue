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
      v-model="formData.textarea"
      label="Обращение"
    />
    <btn name="Отправить" icon="right" @click="sendForm" />
  </div>
</template>

<script setup lang="ts">
import Inputs from "../ui/inputs/Inputs.vue";
import Textareas from "../ui/inputs/Textareas.vue";
import { useFormSend } from "~/composables/useFormSend";
import btn from "../ui/buttons/btn.vue";

const { sendForm, formData } = useFormSend();
</script>

<style scoped lang="scss"></style>
