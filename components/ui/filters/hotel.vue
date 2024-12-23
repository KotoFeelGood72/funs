<template>
  <div class="filters">
    <div class="filter-group">
      <SearchSelect label="Город" :options="places" v-model="hotelData.city" />
    </div>
    <div class="filter-group date">
      <Calendar
        v-model:startDate="hotelData.check_in_date"
        v-model:endDate="hotelData.check_out_date"
        :isRange="true"
      />
    </div>
    <div class="filter-group">
      <SelectPeople
        v-model:class_type="hotelData.hotel_class"
        v-model:adults="hotelData.num_adults"
        v-model:children="hotelData.num_children"
      />
    </div>
    <btn name="Забронировать" icon="right" @click="applyFilters" />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useFiltersStoreRefs } from "~/store/useFilterStore";
import SearchSelect from "../inputs/SearchSelect.vue";
import DatePicker from "../inputs/DatePicker.vue";
import SelectPeople from "../inputs/SelectPeople.vue";
import btn from "../buttons/btn.vue";
import { useFiltersStore } from "~/store/useFilterStore";
import Calendar from "../inputs/Calendar.vue";
import { useRouter } from "vue-router";

// Доступ к фильтрам через хранилище
const { places, hotelData } = useFiltersStoreRefs();
const { setHotelUser, fetchPlace } = useFiltersStore();
const router = useRouter();

watch(
  () => hotelData.value.city,
  (newValue) => {
    if (newValue.name) fetchPlace(newValue.name);
  }
);
// Метод для применения фильтров
const applyFilters = () => {
  const data = {
    city: hotelData.value.city || "",
    check_in_date: hotelData.value.check_in_date || "",
    check_out_date: hotelData.value.check_out_date || "",
    num_adults: hotelData.value.num_adults || 1,
    num_children: hotelData.value.num_children || 0,
    hotel_class: hotelData.value.hotel_class || "ECONOMY",
  };

  console.log("Отправляемые данные:", data);
  setHotelUser(data);
  router.push("/hotel");
};
</script>

<style scoped lang="scss">
.filters {
  @include flex-space;
  gap: 2.4rem;
}

.filter-group {
  @include flex-start;
  gap: 2.4rem;
  flex-grow: 1;
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
}

.filter-change__ic {
  @include flex-center;
}
</style>
