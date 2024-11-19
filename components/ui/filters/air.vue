<template>
  <div class="filters">
    <div class="filter-group">
      <SearchSelect
        label="Откуда"
        :options="airData.city"
        @selected="onSelect"
        v-model="air.selectedCityTo"
      />
    </div>
    <div class="filter-group">
      <label for="to">Куда</label>
      <SearchSelect
        :options="airData.city"
        @selected="onSelect"
        v-model="air.selectedCityFrom"
      />
    </div>
    <div class="filter-group">
      <label for="date">Дата поездки</label>
      <Calendar
        v-model:modelValueFrom="air.selectedDateTo"
        v-model:modelValueTo="air.selectedDateFrom"
      />
    </div>
    <div class="filter-group">
      <label for="passengers">Пассажиров</label>
      <Select :options="airData.people" v-model="air.selectedPeople" />
    </div>
    <btn name="Искать для визы" icon="right" @click="applyFilters" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useFiltersStoreRefs } from "~/stores/useFilterStore";
import SearchSelect from "../inputs/SearchSelect.vue";
import Select from "../inputs/Select.vue";
import Calendar from "../inputs/Calendar.vue";
import btn from "../buttons/btn.vue";

const { air, airData } = useFiltersStoreRefs();
const emit = defineEmits();

const applyFilters = () => {
  emit("filter-applied", air.value);
};

const onSelect = (value: string) => {
  console.log("Выбранный вариант:", value);
};
</script>

<style scoped lang="scss">
.filters {
  @include flex-space;
}
</style>
