<template>
  <div class="filters">
    <div class="filter-group">
      <SearchSelect
        label="Город"
        :options="places"
        @selected="onSelect"
        v-model="selectedCityFrom"
      />
    </div>
    <div class="filter-group date">
      <Calendar
        v-model:startDate="selectedDateTo"
        v-model:endDate="selectedDateFrom"
      />
    </div>
    <div class="filter-group">
      <Calendar
        v-model:startDate="selectedDateTo"
        v-model:endDate="selectedDateFrom"
      />
    </div>
    <div class="filter-group">
      <SelectPeople />
    </div>
    <btn name="Искать для визы" icon="right" @click="applyFilters" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useFiltersStoreRefs } from "~/store/useFilterStore";
import SearchSelect from "../inputs/SearchSelect.vue";
import Select from "../inputs/Select.vue";
import Calendar from "../inputs/Calendar.vue";
import SelectPeople from "../inputs/SelectPeople.vue";
import btn from "../buttons/btn.vue";
import { useFiltersStore } from "~/store/useFilterStore";

// Доступ к фильтрам через хранилище
const {
  airData,
  places,
  selectedCityFrom,
  selectedCityTo,
  selectedDateFrom,
  selectedDateTo,
  selectedPeople,
} = useFiltersStoreRefs();
const { fetchPlace, fetchTickets, clearPlace } = useFiltersStore();
const emit = defineEmits();

// Применить фильтры
const applyFilters = () => {
  // Собираем параметры из текущих значений
  const queryParams = {
    departure: selectedCityFrom.value?.value || "", // Код города отправления
    arrival: selectedCityTo.value?.value || "", // Код города прибытия
    date_forward: selectedDateFrom.value || "", // Дата отправления
    date_backward: selectedDateTo.value || "", // Дата возвращения
    class_type: "ECONOMY", // Тип класса (может быть динамическим)
    adults: 1, // Количество взрослых (замените на динамическое значение)
    children: 0, // Количество детей (замените на динамическое значение)
    infants: 0, // Количество младенцев (замените на динамическое значение)
  };

  // Вызываем fetchTickets с параметрами
  fetchTickets(queryParams);

  // Если нужно, эмитим событие для других компонентов
  emit("filter-applied", queryParams);
};

const swapCities = () => {
  const temp = selectedCityFrom.value;
  selectedCityFrom.value = selectedCityTo.value;
  selectedCityTo.value = temp;
  clearPlace(); // Очищаем места после смены
};

// Логирование выбранного значения
const onSelect = (value: string) => {
  // console.log("Выбранный вариант:", value);
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
