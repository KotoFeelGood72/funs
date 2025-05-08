<template>
  <div class="india-trip-info">
    <div class="india-trip-info__grid">
      <Inputs
        v-model="localAddress"
        label="Адрес первого места проживания"
        placeholder="Введите адрес"
      />

      <Inputs
        v-model="localVisaType"
        label="Тип полученной ранее визы (туризм, лечебная, бизнес и т.д.)"
        placeholder="Введите тип визы"
      />

      <Inputs
        v-model="localVisaCity"
        label="Город выдачи визы"
        placeholder="Введите название города"
      />
      <Inputs
        v-model="localVisitedPlaces"
        label="Какие города и места в Индии вы посещали в этой поездке?"
        placeholder="Перечислите места посещения"
      />

      <Inputs
        v-model="localVisaNumber"
        label="Номер визы"
        placeholder="Укажите номер визы"
      />

      <Inputs
        v-model="localVisaDate"
        label="Дата выдачи визы"
        placeholder="ДД-MM-ГГГГ"
        type="date"
      />
    </div>

    <div class="india-trip-info__note">
      Если вы получали визу, но не использовали её, то просим вас ответить «Нет» на вопрос
      о посещении Индии ранее, и перейти к следующим пунктам анкеты.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Inputs from "../ui/inputs/Inputs.vue";

interface Props {
  address: string;
  visaType: string;
  visaCity: string;
  visitedPlaces: string;
  visaNumber: string;
  visaDate: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:address", val: string): void;
  (e: "update:visaType", val: string): void;
  (e: "update:visaCity", val: string): void;
  (e: "update:visitedPlaces", val: string): void;
  (e: "update:visaNumber", val: string): void;
  (e: "update:visaDate", val: string): void;
}>();

// Компьютеды-прокси для каждого поля
const localAddress = computed<string>({
  get: () => props.address,
  set: (v) => emit("update:address", v),
});
const localVisaType = computed<string>({
  get: () => props.visaType,
  set: (v) => emit("update:visaType", v),
});
const localVisaCity = computed<string>({
  get: () => props.visaCity,
  set: (v) => emit("update:visaCity", v),
});
const localVisitedPlaces = computed<string>({
  get: () => props.visitedPlaces,
  set: (v) => emit("update:visitedPlaces", v),
});
const localVisaNumber = computed<string>({
  get: () => props.visaNumber,
  set: (v) => emit("update:visaNumber", v),
});
const localVisaDate = computed<string>({
  get: () => props.visaDate,
  set: (v) => emit("update:visaDate", v),
});
</script>

<style scoped lang="scss">
.india-trip-info__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  grid-gap: 1rem 2rem;
  margin-bottom: 3rem;
}

.india-trip-info__note {
  font-size: 1.6rem;
  color: $gray;
}
</style>
