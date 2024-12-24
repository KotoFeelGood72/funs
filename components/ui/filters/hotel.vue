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
import { onMounted, watch } from "vue";
import { useFiltersStoreRefs } from "~/store/useFilterStore";
import SearchSelect from "../inputs/SearchSelect.vue";
import SelectPeople from "../inputs/SelectPeople.vue";
import btn from "../buttons/btn.vue";
import { useFiltersStore } from "~/store/useFilterStore";
import Calendar from "../inputs/Calendar.vue";
import { useRouter } from "vue-router";
import { usePassengerData } from "~/composables/usePassengerData";

// Доступ к фильтрам через хранилище
const { places, hotelData } = useFiltersStoreRefs();
const { setHotelUser, fetchPlace } = useFiltersStore();
const router = useRouter();

// Подключаем функцию из composable
const { generatePassengerData } = usePassengerData();

// Следим за изменением города
watch(
  () => hotelData.value.city,
  (newValue) => {
    if (newValue.name) fetchPlace(newValue.name);
  }
);

// Функция для инициализации данных пассажиров
const initializePassengers = () => {
  const passengerData = generatePassengerData(
    hotelData.value.num_adults || 1,
    hotelData.value.num_children || 0,
    hotelData.value.hotel_class
  );

  hotelData.value.adults = passengerData.adults;
  hotelData.value.children = passengerData.children;

  console.log("Инициализация пассажиров:", passengerData);
};

// Следим за изменением количества взрослых и детей
watch(
  () => [hotelData.value.num_adults, hotelData.value.num_children],
  ([newAdults, newChildren]) => {
    if (process.client) {
      try {
        // Генерация данных пассажиров
        const passengerData = generatePassengerData(
          newAdults,
          newChildren,
          hotelData.value.hotel_class
        );

        // Обновляем данные пассажиров в hotelData
        hotelData.value.adults = passengerData.adults;
        hotelData.value.children = passengerData.children;

        console.log("Пассажиры обновлены:", passengerData);
      } catch (error) {
        console.error("Ошибка обновления пассажиров:", error);
      }
    }
  },
  { immediate: true }
);

// Инициализация данных при загрузке компонента
onMounted(() => {
  initializePassengers();
});

const applyFilters = async () => {
  const data = {
    city: hotelData.value.city || "",
    check_in_date: hotelData.value.check_in_date || "",
    check_out_date: hotelData.value.check_out_date || "",
    num_adults: hotelData.value.num_adults || 1,
    num_children: hotelData.value.num_children || 0,
    hotel_class: hotelData.value.hotel_class || "ECONOMY",
  };

  try {
    // Создание полезной нагрузки
    const payload = {
      ...data,
      adults: hotelData.value.adults,
      children: hotelData.value.children,
    };

    console.log("Отправляемые данные:", payload);

    // Обновляем данные в хранилище
    setHotelUser(payload);

    // Переход на страницу отеля
    await router.push("/hotel");
  } catch (error) {}
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
