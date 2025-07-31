<template>
  <div class="air">
    <ContentView
      title="Оформить лист бронирования авиаперелета на 14 дней. Легко продлить."
      :isLoading="isLoading"
    >
      <div class="top">
        <AirFilterForm />
      </div>
      <div class="row">
        <FiltersSidebar v-model="filters" :airlines="airlines" v-if="tickets" />
        <div class="content">
          <div class="top-content" v-if="tickets">
            <InputsSearch v-model="searchQuery" />
          </div>
          <div class="content-col" v-if="finalTickets.length > 0">
            <ul class="air-list">
              <li v-for="(item, index) in finalTickets" :key="'air-items-' + index">
                <AirCard :card="item" />
              </li>
            </ul>
          </div>
          <empty :title="emptyStateTitle" :txt="emptyStateText" v-else />
        </div>
      </div>
    </ContentView>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import ContentView from "~/components/shared/ContentView.vue";
import FiltersSidebar from "~/components/shared/Sidebar.vue";
import AirFilterForm from "~/components/ui/filters/AirFilterForm.vue";
import InputsSearch from "~/components/ui/inputs/InputsSearch.vue";
import AirCard from "~/components/ui/card/AirCard.vue";
import { useTicketStore, useTicketStoreRefs } from "~/store/useTicketStore";
import empty from "~/components/ui/empty.vue";
import { useCheckAuth } from "@/composables/useCheckAuth";

const { getTickets, getTickerForRequest } = useTicketStore();
const { tickets, isLoading, airlines } = useTicketStoreRefs();
const { checkAuthThen } = useCheckAuth();
const route = useRoute();
const router = useRouter();

const filters = ref({
  transfer: [] as number[],
  airline: [] as string[],
});

const searchQuery = ref("");
const hasSearched = ref(false);

const finalTickets = computed(() => {
  if (!tickets.value?.offers || !Array.isArray(tickets.value.offers)) {
    return [];
  }

  let result = [...tickets.value.offers];

  result = result.filter((offer: any) => {
    const matchesTransfers =
      !filters.value.transfer.length ||
      offer.itineraries?.some((itinerary: any) =>
        filters.value.transfer.includes(itinerary.stops)
      );

    const matchesAirlines =
      !filters.value.airline.length ||
      filters.value.airline.includes("Все") ||
      filters.value.airline.includes(offer.airline);

    return matchesTransfers && matchesAirlines;
  });

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.trim().toLowerCase();
    result = result.filter((offer: any) => {
      const airlineName = offer.airline?.toLowerCase() || "";
      const departureName = offer.departure?.name?.toLowerCase() || "";
      const arrivalName = offer.arrival?.name?.toLowerCase() || "";

      return (
        airlineName.includes(query) ||
        departureName.includes(query) ||
        arrivalName.includes(query)
      );
    });
  }

  return result;
});

// Логика для определения empty состояния
const emptyStateTitle = computed(() => {
  if (!route.query.ticketsId) {
    return "Сначала найдите рейсы";
  }
  return "К сожалению, по вашим параметрам не нашли подходящие рейсы";
});

const emptyStateText = computed(() => {
  if (!route.query.ticketsId) {
    return "Проверяемые маршрутные листы подходят для всех целей туризма Продление доступно в личном кабинете, также пришлем письмо до истечения срока брони";
  }
  return "Попробуйте изменить параметры поиска или даты поездки";
});

// const getTicket = async () => {
//   await checkAuthThen(async () => {
//     const requestId = await getTickets();
//     await router.push({ name: "air", query: { ticketsId: requestId } });
//   });
// };

onMounted(() => {
  getTickerForRequest(route.query.ticketsId as string);
});

useSeoMeta({
  title: `Оформить лист бронирования авиаперелета на 14 дней. Легко продлить.`,
});
</script>

<style scoped lang="scss">
.row {
  @include flex-start;
  align-items: flex-start;
  gap: 3.2rem;

  @include bp($point_2) {
    flex-direction: column;
  }
}

.top-content {
  @include flex-space;
  gap: 1.6rem;
  padding-bottom: 4.8rem;

  @include bp($point_2) {
    display: none;
  }
}

.content-col,
.content {
  width: 100%;
}

.content-col {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

.top {
  padding-bottom: 3.2rem;
}

.air-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.air-empty {
  @include flex-center;
  flex-direction: column;
  text-align: center;
  gap: 2rem;
  min-height: 50rem;

  h3 {
    font-size: 4rem;
  }
  p {
    max-width: 50rem;
    font-size: 1.4rem;
    color: $gray;
  }
}
</style>
