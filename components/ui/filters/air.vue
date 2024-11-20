<template>
  <div class="filters">
    <div class="filter-group">
      <SearchSelect
        label="Откуда"
        :options="airData.city"
        @selected="onSelect"
        v-model="air.selectedCityFrom"
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
        :options="airData.city"
        @selected="onSelect"
        v-model="air.selectedCityTo"
      />
    </div>
    <div class="filter-group">
      <Calendar v-model="air.selectedDateTo" />
    </div>
    <div class="filter-group">
      <Select
        :options="airData.people"
        v-model="air.selectedPeople"
        label="Пассажиров"
      >
        <div class="people-ic">
          <Icon name="f:user" />
        </div>
      </Select>
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

// Доступ к фильтрам через хранилище
const { air, airData } = useFiltersStoreRefs();
const emit = defineEmits();

// Применить фильтры
const applyFilters = () => {
  emit("filter-applied", air.value);
};

// Обработчик для "меняем местами"
const swapCities = () => {
  const temp = air.value.selectedCityFrom;
  air.value.selectedCityFrom = air.value.selectedCityTo;
  air.value.selectedCityTo = temp;
};

// Логирование выбранного значения
const onSelect = (value: string) => {
  console.log("Выбранный вариант:", value);
};
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
