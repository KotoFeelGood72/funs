<template>
  <div class="filters">
    <div class="filter-group">
      <SearchSelect
        label="Откуда"
        :options="places"
        v-model="ticket.departure"
      />
    </div>
    <div class="filter-change" @click="swapCities">
      <div class="filter-change__ic">
        <Icon name="f:right" />
      </div>
      <div class="filter-change__ic">
        <Icon name="f:left" />
      </div>
    </div>
    <div class="filter-group">
      <SearchSelect label="Куда" :options="places" v-model="ticket.arrival" />
    </div>
    <div class="filter-group">
      <Calendar
        v-model:startDate="ticket.date_forward"
        v-model:endDate="ticket.date_backward"
        :isRange="true"
        :isError="true"
      />
    </div>
    <div class="filter-group">
      <SelectPeople />
    </div>
    <btn
      name="Искать для визы"
      icon="right"
      @click="getTicketsUi()"
      theme="primary"
    />
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import SearchSelect from "../inputs/SearchSelect.vue";
import Calendar from "../inputs/Calendar.vue";
import SelectPeople from "../inputs/SelectPeople.vue";
import btn from "../buttons/btn.vue";
import {
  useTicketAirStore,
  useTicketAirStoreRefs,
} from "~/store/useTicketAirStore";
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

const { ticket } = useTicketAirStoreRefs();
const { fetchTickets, clearPlace, createPassengers } = useTicketAirStore();
const emit = defineEmits();



const errorMessage = ref("");

const applyFilters = () => {
  if (
    !ticket.value.departure.name ||
    !ticket.value.arrival.name ||
    !ticket.value.date_forward
  ) {
    toast.error("Заполните все поля перед поиском!");
    errorMessage.value = "";
    return;
  }
  errorMessage.value = "";
  fetchTickets(router, route);
};

const swapCities = () => {
  const temp = ticket.value.arrival;
  ticket.value.arrival = ticket.value.departure;
  ticket.value.departure = temp;
  clearPlace();
};

watch(
  () => ticket.value.departure,
  (newValue) => {
    if (newValue.name) fetchPlace(newValue.name);
  }
);

watch(
  () => ticket.value.arrival,
  (newValue) => {
    if (newValue.name) fetchPlace(newValue.name);
  }
);

createPassengers();

const getTicketsUi = () => {
  getTickets();
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

.filter-change {
  @include flex-center;
  flex-direction: column;
  gap: 0.4rem;
  cursor: pointer;

  @include bp($point_2) {
    display: none;
  }
}

.filter-change__ic {
  @include flex-center;
}
</style>
