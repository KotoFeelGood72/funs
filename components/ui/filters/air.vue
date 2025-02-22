<template>
  <div class="filters">
    <div class="filter-group">
      <SearchSelect label="Откуда" v-model="tickets.data.departure" />
    </div>
    <SwapBtn @click="swapCities" />
    <div class="filter-group">
      <SearchSelect label="Куда" v-model="tickets.data.arrival" />
    </div>
    <div class="filter-group">
      <Calendar
        v-model:startDate="tickets.data.date_forward"
        v-model:endDate="tickets.data.date_backward"
        :isRange="true"
        :isError="true"
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
    />
  </div>
</template>

<script setup lang="ts">
import SearchSelect from "../inputs/SearchSelect.vue";
import Calendar from "../inputs/Calendar.vue";
import SelectPeople from "../inputs/SelectPeople.vue";
import SwapBtn from "../SwapBtn.vue";
import btn from "../buttons/btn.vue";
import { useRouter, useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";
// import { useToast } from "vue-toastification";
// import { useFetchPlace } from "@/composables/usePlace";
// import { useFetchTickets } from "@/composables/useTicket";
import { useTicketStore, useTicketStoreRefs } from "~/store/useTicketStore";

// const toast = useToast();
// const { fetchPlace, places } = useFetchPlace();
// const { getTickets } = useTicketStore();
const { tickets, isLoading } = useTicketStoreRefs();
// const { getTickets, tickets } = useFetchTickets();
const route = useRoute();
const router = useRouter();
const emit = defineEmits(["getTicket"]);

const onTicket = () => {
  emit("getTicket");
  console.log("emit getTicket сработало!");
};

// Функция для запроса билетов
const getTicketsUi = async () => {
  // getTickets();

  if (route.name !== "air") {
    await router.push({
      name: "air",
      query: {
        session_id: tickets.value.request_id,
      },
    });
  }
};

// Функция смены городов местами
const swapCities = () => {
  const temp = tickets.value.data.departure;
  tickets.value.data.departure = tickets.value.data.arrival;
  tickets.value.data.arrival = temp;
};

// При монтировании подтягиваем данные, если они уже есть
// onMounted(() => {
// if (route.name === "air") {
//   getTicketsUi();
// }
// });
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
