<template>
  <div class="filters">
    <div class="filter-group">
      <SearchSelect
        label="Откуда"
        :options="places"
        @selected="onSelect"
        v-model="selectedCityFrom"
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
      <SearchSelect
        label="Куда"
        :options="places"
        @selected="onSelect"
        v-model="selectedCityTo"
      />
    </div>
    <div class="filter-group">
      <Calendar
        v-model:startDate="filterData.date_backward"
        v-model:endDate="filterData.date_forward"
        :isRange="true"
      />
    </div>
    <div class="filter-group">
      <SelectPeople
        v-model:class_type="filterData.class_type"
        v-model:adults="filterData.adults"
        v-model:children="filterData.children"
        v-model:infants="filterData.infants"
      />
    </div>
    <btn name="Искать для визы" icon="right" @click="applyFilters" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useFiltersStoreRefs } from "~/store/useFilterStore";
import SearchSelect from "../inputs/SearchSelect.vue";
import Calendar from "../inputs/Calendar.vue";
import SelectPeople from "../inputs/SelectPeople.vue";
import btn from "../buttons/btn.vue";
import { useFiltersStore } from "~/store/useFilterStore";

// Доступ к фильтрам через хранилище
const { places, filterData, selectedCityFrom, selectedCityTo } =
  useFiltersStoreRefs();
const { fetchPlace, fetchTickets, clearPlace } = useFiltersStore();
const emit = defineEmits();

const applyFilters = () => {
  fetchTickets();
};

const swapCities = () => {
  const temp = selectedCityFrom.value;
  selectedCityFrom.value = selectedCityTo.value;
  selectedCityTo.value = temp;
  clearPlace();
};

watch(
  () => selectedCityFrom.value,
  (newValue) => {
    if (newValue.name) fetchPlace(newValue.name);
  }
);

watch(
  () => selectedCityTo.value,
  (newValue) => {
    if (newValue.name) fetchPlace(newValue.name);
  }
);
</script>

<style scoped lang="scss">
.filters {
  @include flex-space;
  gap: 2.4rem;
}

.filter-group {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
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
