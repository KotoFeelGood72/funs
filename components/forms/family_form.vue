<template>
  <div class="name-change">
    <div class="name-change__grid">
      <Inputs v-model="localLastName" label="Фамилия" placeholder="Введите фамилию" />
      <Inputs v-model="localFirstName" label="Имя" placeholder="Введите имя" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Inputs from "../ui/inputs/Inputs.vue";

interface Props {
  previousLastName: string;
  previousFirstName: string;
}

// Получаем два v-model-пропса
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:previousLastName", val: string): void;
  (e: "update:previousFirstName", val: string): void;
}>();

// Прокси-компьютеды для каждого поля
const localLastName = computed<string>({
  get: () => props.previousLastName,
  set: (val) => emit("update:previousLastName", val),
});

const localFirstName = computed<string>({
  get: () => props.previousFirstName,
  set: (val) => emit("update:previousFirstName", val),
});
</script>

<style scoped lang="scss">
.name-change {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  background: #fafafa;

  &__text {
    font-size: 14px;
    color: #333;
    margin-bottom: 12px;
  }

  &__grid {
    display: flex;
    gap: 16px;

    > * {
      flex: 1;
    }
  }
}
</style>
