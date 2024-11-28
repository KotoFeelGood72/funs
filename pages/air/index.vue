<template>
  <div class="air">
    <ContentView title="Москва — Амстердам">
      <div class="top">
        <air />
      </div>
      <div class="row">
        <Sidebar />
        <div class="content">
          <div class="top-content">
            <InputsSearch />
            <RadioGroup :items="sort" name="sortering" v-model="selectedSort" />
            <btn name="Обновить" icon="reset" theme="white" />
          </div>
          <div class="content-col">
            <AirCard v-for="(item, i) in 7" :key="'air-items-' + i" />
          </div>
        </div>
      </div>
    </ContentView>
  </div>
</template>

<script setup lang="ts">
import ContentView from "~/components/shared/ContentView.vue";
import Sidebar from "~/components/shared/Sidebar.vue";
import air from "~/components/ui/filters/air.vue";
import InputsSearch from "~/components/ui/inputs/InputsSearch.vue";
import RadioGroup from "~/components/ui/inputs/RadioGroup.vue";
import btn from "~/components/ui/buttons/btn.vue";
import AirCard from "~/components/ui/card/AirCard.vue";
import { useFiltersStore, useFiltersStoreRefs } from "~/store/useFilterStore";

// Список сортировки
const sort = ref<any>([
  { name: "Новые", val: "new" },
  { name: "Популярные", val: "popular" },
  { name: "Сначала дешевле", val: "downprice" },
  { name: "Сначала дороже", val: "upprice" },
]);

const { fetchTickets } = useFiltersStore();
const {} = useFiltersStoreRefs();
const selectedSort = ref<any>();

// Функция для получения текущей даты в формате YYYY-MM-DD
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

onMounted(() => {
  const currentDate = getCurrentDate(); // Получаем текущую дату

  // Передаем текущую дату в fetchTickets
  fetchTickets({
    departure: "MOW",
    arrival: "HAM",
    date_forward: currentDate, // Текущая дата
    date_backward: currentDate, // Текущая дата
    adults: 1,
    class_type: "ECONOMY",
    children: 0,
    infants: 0,
  });
});
</script>

<style scoped lang="scss">
.row {
  @include flex-start;
  align-items: flex-start;
  gap: 3.2rem;
}

.top-content {
  @include flex-space;
  gap: 1.6rem;
  padding-bottom: 4.8rem;
}

.content-col,
.content {
  width: 100%;
}

.top {
  // padding: 3.2rem;
  padding-bottom: 3.2rem;
}
</style>
