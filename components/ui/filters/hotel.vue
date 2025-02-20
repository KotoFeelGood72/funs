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
      @click="nextHotelBooking"
      theme="primary"
    />
  </div>
</template>

<script setup lang="ts">
import SearchSelect from "../inputs/SearchSelect.vue";
import btn from "../buttons/btn.vue";
import Calendar from "../inputs/Calendar.vue";
import { useRouter, useRoute } from "vue-router";
import { useHotelStore, useHotelStoreRefs } from "~/store/useHotelStore";
// import SelectPeopleHotel from "../inputs/SelectPeopleHotel.vue";
import SelectPeople from "../inputs/SelectPeople.vue";

const { bookingHotel, getHotelId } = useHotelStore();
const { ticket } = useHotelStoreRefs();

const router = useRouter();
const route = useRoute();

const requestId = ref<any>(null);

const nextHotelBooking = async () => {
  // const query = {
  //   cityName: ticketHotel.value.city.name,
  //   cityValue: ticketHotel.value.city.value,
  //   check_in_date: ticketHotel.value.check_in_date || "",
  //   check_out_date: ticketHotel.value.check_out_date || "",
  //   adults: ticketHotel.value.adults.toString(),
  //   hotel_class: ticketHotel.value.hotel_class,
  // };
  requestId.value = await bookingHotel();
  console.log(requestId.value);

  await router.push(`/hotels/?hotelId=${requestId.value}`);
};

onMounted(() => {
  // fillHotelTicketFromQuery(route.query);
  // getHotelId(route.params.id);
});
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
