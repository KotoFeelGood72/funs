<template>
  <div class="filters">
    <div class="filter-group">
      <SearchSelect label="Откуда" v-model="filters.departure" />
    </div>
    <SwapBtn @click="swapCities" />
    <div class="filter-group">
      <SearchSelect label="Куда" :options="places" v-model="filters.arrival" />
    </div>
    <div class="filter-group">
      <Calendar
        v-model:startDate="filters.date_forward"
        v-model:endDate="filters.date_backward"
        :isRange="true"
        :isError="true"
      />
    </div>
    <div class="filter-group">
      <SelectPeople
        v-model:adults="filters.adults"
        v-model:classType="filters.class_type"
      />
    </div>
    <btn
      name="Искать для визы"
      icon="right"
      @click="getTicketsUi()"
      theme="primary"
    />
  </div>
</template>

<script setup lang="ts">
import SearchSelect from "../inputs/SearchSelect.vue";
import Calendar from "../inputs/Calendar.vue";
import SelectPeople from "../inputs/SelectPeople.vue";
import SwapBtn from "../SwapBtn.vue";
import btn from "../buttons/btn.vue";
// import {
//   useTicketAirStore,
//   useTicketAirStoreRefs,
// } from "~/store/useTicketAirStore";
import { useRouter, useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useFetchPlace } from "@/composables/usePlace";
import { useFetchTickets } from "@/composables/useTicket";

const toast = useToast();

const { fetchPlace, places } = useFetchPlace();

const { getTickets } = useFetchTickets();

const route = useRoute();
const router = useRouter();

// const { ticket } = useTicketAirStoreRefs();
// const { fetchTickets, clearPlace, createPassengers } = useTicketAirStore();
const emit = defineEmits();

const filters = ref<any>({
  departure: "",
  arrival: "",
  date_forward: "",
  date_backward: "",
  class_type: "ECONOMY",
  adults: 1,
});

// const applyFilters = () => {
//   if (
//     !ticket.value.departure.name ||
//     !ticket.value.arrival.name ||
//     !ticket.value.date_forward
//   ) {
//     toast.error("Заполните все поля перед поиском!");
//     return;
//   }

//   fetchTickets(router, route);
// };

// const swapCities = () => {
//   const temp = ticket.value.arrival;
//   ticket.value.arrival = ticket.value.departure;
//   ticket.value.departure = temp;
//   // clearPlace();
// };

// createPassengers();

const getTicketsUi = () => {
  getTickets({
    departure: filters.value.departure.value,
    arrival: filters.value.arrival.value,
    date_forward: filters.value.date_forward,
    date_backward: filters.value.date_backward,
    class_type: filters.value.class_type,
    adults: filters.value.adults,
  });
};
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
