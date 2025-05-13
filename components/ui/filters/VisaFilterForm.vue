<template>
  <div class="filters">
    <div class="filter-group">
      <Select
        v-if="eta.country"
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
      />
    </div>
    <div class="filter-group">
      <SelectPeople v-model:adults="eta.adults" />
    </div>
    <btn :name="isTextBtn" icon="right" @click="onBooking()" theme="primary" />
  </div>
</template>

<script setup lang="ts">
import SearchSelect from "../inputs/SearchSelect.vue";
import Calendar from "../inputs/Calendar.vue";
import Select from "../inputs/Select.vue";
import SelectPeople from "../inputs/SelectPeople.vue";
import btn from "../buttons/btn.vue";
import { useETAStoreRefs, useETAStore } from "~/store/useETAStore";
import { useRouter, useRoute } from "vue-router";
import { useCheckAuth } from "@/composables/useCheckAuth";
import DoubleDate from "@/components/dates/DoubleDate.vue";

const { eta } = useETAStoreRefs();
const { getVisaTypes } = useETAStore();

const router = useRouter();
const route = useRoute();

const { checkAuthThen } = useCheckAuth();

const onBooking = () => {
  checkAuthThen(() => {
    getVisaTypes(route, router, eta.value.country);
  });
};

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
