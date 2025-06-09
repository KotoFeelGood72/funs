<template>
  <div class="filters">
    <div class="filter-group">
      <SearchSelect
        label="Город"
        v-model="ticket.city"
        :error="vuelidate.data.city.$error"
      />
    </div>
    <div class="filter-group date">
      <DoubleDate
        placeStart="Дата заезда"
        placeEnd="Дата выезда"
        v-model:start="ticket.check_in_date"
        v-model:end="ticket.check_out_date"
        :errorStart="vuelidate.data.check_in_date.$error"
        :errorEnd="vuelidate.data.check_out_date.$error"
      />
    </div>
    <div class="filter-group">
      <SelectPeople
        v-model:adults="ticket.adults_count"
        v-model:stars="ticket.hotel_class"
        :isHotel="true"
      />
    </div>
    <btn
      name="Забронировать"
      icon="right"
      @click="onBooking()"
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
import DoubleDate from "@/components/dates/DoubleDate.vue";
import SelectPeople from "../inputs/SelectPeople.vue";
import { useCheckAuth } from "@/composables/useCheckAuth";
import { useValidation } from "~/composables/useValidation";

const { bookingHotel, bookingHotelAddInfo } = useHotelStore();
const { ticket, load } = useHotelStoreRefs();
const { v$, required, requiredName, requiredDate, showValidationErrors } =
  useValidation();
const router = useRouter();
const route = useRoute();
const requestId = ref<any>(null);

const { checkAuthThen } = useCheckAuth();

const rules = computed(() => ({
  data: {
    city: { requiredName },
    check_in_date: { requiredDate },
    check_out_date: { requiredDate },
  },
}));

const vuelidate = v$(rules, { data: ticket });

const onBooking = () => {
  validateAndBook();
  // checkAuthThen(() => {
  // });
};

const validateAndBook = async () => {
  vuelidate.value.$touch();
  if (vuelidate.value.$invalid) {
    showValidationErrors(vuelidate.value);
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
