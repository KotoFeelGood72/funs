<template>
  <div class="air">
    <ContentView
      :title="`${ticket.departure.name} - ${ticket.arrival.name}`"
      :isLoading="loadTicket"
    >
      <div class="top">
        <air />
      </div>
      <div class="row">
        <!-- Боковая панель с фильтрами -->
        <FiltersSidebar v-model="filters" :airlines="airlines" />

        <div class="content">
          <div class="top-content">
            <!-- Поле поиска -->
            <InputsSearch v-model="searchQuery" />

            <!-- Сортировка -->
            <RadioGroup :items="sort" name="sortering" v-model="selectedSort" />

            <btn name="Обновить" icon="reset" theme="white" />
          </div>

          <!-- Вывод списка авиабилетов -->
          <div class="content-col" v-if="finalTickets.length">
            <ul class="air-list">
              <li
                v-for="(item, index) in finalTickets"
                :key="'air-items-' + index"
              >
                <AirCard :card="item" />
              </li>
            </ul>
          </div>
          <div class="air-empty" v-else>
            <h3>Рейсов не найдено 😔</h3>
            <p>
              К сожалению, мы не нашли подходящих авиабилетов по вашему запросу.
              Попробуйте изменить параметры поиска: выберите другие даты,
              аэропорты или пересмотрите фильтры. ✈️💙
            </p>
          </div>
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
import air from "~/components/ui/filters/air.vue";
import InputsSearch from "~/components/ui/inputs/InputsSearch.vue";
import RadioGroup from "~/components/ui/inputs/RadioGroup.vue";
import btn from "~/components/ui/buttons/btn.vue";
import AirCard from "~/components/ui/card/AirCard.vue";

import {
  useTicketAirStoreRefs,
  useTicketAirStore,
} from "~/store/useTicketAirStore";

const { tickets, loadTicket, ticket, airlines } = useTicketAirStoreRefs();
const { fetchTickets } = useTicketAirStore();

const route = useRoute();
const router = useRouter();

// Список сортировки
const sort = ref([
  // { name: "Новые", val: "new" },
  // { name: "Популярные", val: "popular" },
  { name: "Сначала дешевле", val: "downprice" },
  { name: "Сначала дороже", val: "upprice" },
]);

// Текущее значение сортировки
const selectedSort = ref("new");

// Фильтры для Sidebar
const filters = ref({
  transfer: [] as number[],
  airline: [] as string[],
});

// Строка поиска
const searchQuery = ref("");

// Делаем общее вычисляемое свойство, которое:
// 1) Фильтрует по пересадкам/авиакомпаниям
// 2) Фильтрует по поисковой строке
// 3) Сортирует по выбранному типу
const finalTickets = computed(() => {
  // Если данных нет, сразу возвращаем пустой массив
  if (!tickets.value?.offers || !Array.isArray(tickets.value.offers)) {
    return [];
  }

  let result = [...tickets.value.offers];

  // ФИЛЬТРАЦИЯ: пересадки и авиакомпании
  result = result.filter((offer: any) => {
    // Проверяем пересадки (stops)
    const matchesTransfers =
      !filters.value.transfer.length ||
      offer.itineraries?.some((itinerary: any) =>
        filters.value.transfer.includes(itinerary.stops)
      );

    // Проверяем авиакомпании
    const matchesAirlines =
      !filters.value.airline.length ||
      filters.value.airline.includes("Все") ||
      filters.value.airline.includes(offer.airline);

    return matchesTransfers && matchesAirlines;
  });

  // ФИЛЬТРАЦИЯ ПО ПОИСКУ (пример: ищем совпадение в имени авиакомпании,
  // названии пунктов вылета/прилёта и т. д. — корректируйте под свои поля)
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

  // СОРТИРОВКА
  switch (selectedSort.value) {
    case "downprice":
      // Предположим, что цена лежит в offer.price
      result.sort((a: any, b: any) => a.price - b.price);
      break;
    case "upprice":
      result.sort((a: any, b: any) => b.price - a.price);
      break;
    case "new":
      // Пример: сортируем по дате добавления или ID
      // Здесь всё зависит от того, как распознать «новые»
      result.sort((a: any, b: any) => b.id - a.id);
      break;
    case "popular":
      // Пример: сортируем по некому рейтингу или количеству заказов
      result.sort((a: any, b: any) => b.popularity - a.popularity);
      break;
    default:
      break;
  }

  return result;
});

onMounted(() => {
  // При монтировании подгружаем билеты по текущему маршруту/запросу
  fetchTickets(router, route, route.query);

  // Дополнительно защитимся от undefined
  if (!tickets.value?.offers) {
    tickets.value = { offers: [] };
  }
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
