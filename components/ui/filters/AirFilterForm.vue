<template>
  <div class="filters">
    <div class="selects-group">
      <SearchSelect
        label="Откуда"
        v-model="tickets.data.departure"
        :error="vuelidate.data.departure.$error"
      />
      <SwapBtn @click="swapCities" />
      <SearchSelect
        label="Куда"
        v-model="tickets.data.arrival"
        :error="vuelidate.data.arrival.$error"
      />
    </div>
    <div class="filter-group dates">
      <DoubleDate
        v-model:start="tickets.data.date_forward"
        v-model:end="tickets.data.date_backward"
        :errorStart="vuelidate.data.date_forward.$error"
        :errorEnd="vuelidate.data.date_backward.$error"
      />
    </div>
    <div class="filter-group">
      <SelectPeople
        v-model:adults="tickets.data.adults"
        v-model:classType="tickets.data.class_type"
      />
    </div>
    <btn
      name="Искать для визы"
      icon="right"
      @click="onTicket()"
      theme="primary"
      :loading="isLoading"
    />
  </div>
</template>

<script setup lang="ts">
import SearchSelect from "../inputs/SearchSelect.vue";
import SelectPeople from "../inputs/SelectPeople.vue";
import SwapBtn from "../SwapBtn.vue";
import btn from "../buttons/btn.vue";
import DoubleDate from "~/components/dates/DoubleDate.vue";

import { useTicketStoreRefs } from "~/store/useTicketStore";
import { useCheckAuth } from "@/composables/useCheckAuth";
import { useValidation } from "@/composables/useValidation";

import { computed } from "vue";

const { tickets, isLoading } = useTicketStoreRefs();
const emit = defineEmits(["getTicket"]);
const { checkAuthThen } = useCheckAuth();

const { v$, requiredName, minValue, showValidationErrors } = useValidation();

// Правила валидации
const rules = computed(() => ({
  data: {
    departure: { requiredName },
    arrival: { requiredName },
    date_forward: { requiredName },
    date_backward: { requiredName },
    adults: { minValue: minValue(1, "Минимум 1 взрослый") },
  },
}));

const vuelidate = v$(rules, tickets);

// Поиск билетов с проверкой
const onTicket = () => {
  vuelidate.value.$touch();

  if (vuelidate.value.$invalid) {
    showValidationErrors(vuelidate.value);
    return;
  }

  checkAuthThen(() => {
    emit("getTicket");
  });
};

const swapCities = () => {
  const temp = tickets.value.data.departure;
  tickets.value.data.departure = tickets.value.data.arrival;
  tickets.value.data.arrival = temp;
};
</script>

<style scoped lang="scss">
.filters {
  @include flex-space;
  gap: 1.4rem;
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

.selects-group {
  @include flex-start;
  gap: 1rem;
}
.dates {
  max-width: 40rem;
}
</style>
