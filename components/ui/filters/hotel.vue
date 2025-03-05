<template>
  <div class="filters">
    <div class="filter-group">
      <SearchSelect label="Город" v-model="ticket.city" />
    </div>
    <div class="filter-group date">
      <Calendar
        label="Дата заезда"
        v-model:startDate="ticket.check_in_date"
        v-model:endDate="ticket.check_out_date"
        :isRange="true"
      />
    </div>
    <div class="filter-group">
      <SelectPeople
        v-model:adults="ticket.adults_count"
        v-model:stars="ticket.hotel_class"
      />
    </div>
    <btn
      name="Забронировать"
      icon="right"
      @click="validateAndBook"
      theme="primary"
      :loading="load"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useHotelStore, useHotelStoreRefs } from "~/store/useHotelStore";
import { watch, ref } from "vue";
import SearchSelect from "../inputs/SearchSelect.vue";
import btn from "../buttons/btn.vue";
import Calendar from "../inputs/Calendar.vue";
import SelectPeople from "../inputs/SelectPeople.vue";
import { useToast } from "vue-toastification";

const { bookingHotel, bookingHotelAddInfo } = useHotelStore();
const { ticket, load } = useHotelStoreRefs();
const router = useRouter();
const route = useRoute();
const requestId = ref<any>(null);

const toast = useToast();

const validateAndBook = async () => {
  let errors = [];

  if (!ticket.value.city || !ticket.value.city.name) {
    errors.push("Выберите город");
  }
  if (!ticket.value.check_in_date) {
    errors.push("Выберите дату заезда");
  }
  if (!ticket.value.check_out_date) {
    errors.push("Выберите дату выезда");
  }
  if (!ticket.value.adults_count || ticket.value.adults_count < 1) {
    errors.push("Выберите количество взрослых");
  }

  if (errors.length > 0) {
    toast.error(errors.join("\n"));
    return;
  }

  requestId.value = await bookingHotel();
  await router.push(`/hotels/?hotelId=${requestId.value}`);
};

watch(
  () => ticket.value.adults_count,
  async (newValue, oldValue) => {
    if (route.query.hotelId && newValue !== oldValue) {
      await bookingHotelAddInfo(route.query.hotelId, "patch");
    }
  }
);
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
  @include flex-start;
  gap: 2.4rem;
  flex-grow: 1;
  width: 33%;
  @include bp($point_2) {
    width: 100%;
  }
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
