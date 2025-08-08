<template>
  <div class="filters">
    <div class="filter-group">
      <Select
        placeholder="Выберите страну"
        v-model="eta.country"
        :options="countries"
      />
    </div>
    <div class="filter-group">
      <DoubleDate
        v-model:end="eta.date_backward"
        v-model:start="eta.date_forward"
        placeStart="Дата начала поездки"
        placeEnd="Дата окончания поездки"
        :errorStart="vuelidate.data.date_forward.$error"
        :errorEnd="vuelidate.data.date_backward.$error"
      />
    </div>

    <btn
      :name="isTextBtn"
      icon="right"
      @click="onBooking()"
      theme="primary"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import Select from "../inputs/Select.vue";
import btn from "../buttons/btn.vue";
import { useETAStoreRefs, useETAStore } from "~/store/useETAStore";
import { useRouter, useRoute } from "vue-router";
import { useCheckAuth } from "@/composables/useCheckAuth";
import DoubleDate from "@/components/dates/DoubleDate.vue";
import { useValidation } from "~/composables/useValidation";

const { eta, loading } = useETAStoreRefs();
const { getVisaTypes } = useETAStore();
const { v$, required, requiredDate, showValidationErrors } = useValidation();

const router = useRouter();
const route = useRoute();

const { checkAuthThen } = useCheckAuth();

const onBooking = () => {
  vuelidate.value.$touch();

  if (vuelidate.value.$invalid) {
    showValidationErrors(vuelidate.value);
    return;
  }

  getVisaTypes(route, router, eta.value.country);
  // checkAuthThen(() => {
  // });
};

const rules = computed(() => ({
  data: {
    date_forward: { requiredDate },
    date_backward: { requiredDate },
  },
}));

const vuelidate = v$(rules, { data: eta });

const isTextBtn = computed(() => {
  return route.name === "eta" ? "Обновить" : "Оплатить визу";
});

const countries = [
  { label: "Индия", value: "1" },
  { label: "Саудовская Аравия", value: "2" },
];
</script>

<style scoped lang="scss">
.filters {
  @include flex-space;
  gap: 2.4rem;
  @include bp($point_2) {
    flex-direction: column;
    gap: 1rem;
  }
}

.filter-group {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  @include bp($point_2) {
    width: 100%;
  }
}

.people-ic {
  @include flex-center;
  color: $blue;
}
</style>
