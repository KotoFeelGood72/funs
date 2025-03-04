<template>
  <div class="filters">
    <div class="filter-group">
      <SearchSelect label="Откуда" v-model="tickets.data.departure" />
    </div>
    <SwapBtn @click="swapCities" />
    <div class="filter-group">
      <SearchSelect label="Куда" v-model="tickets.data.arrival" />
    </div>
    <div class="filter-group">
      <Calendar
        v-model:startDate="tickets.data.date_forward"
        v-model:endDate="tickets.data.date_backward"
        :isRange="true"
        :isError="true"
      />
    </div>
    <div class="filter-group">
      <SelectPeople
        v-model:adults="tickets.data.adults"
        v-model:classType="tickets.data.class_type"
      />
    </div>
    <btn
      name="Искать для визы"
      icon="right"
      @click="onTicket()"
      theme="primary"
      :loading="isLoading"
    />
  </div>
</template>

<script setup lang="ts">
import SearchSelect from "../inputs/SearchSelect.vue";
import Calendar from "../inputs/Calendar.vue";
import SelectPeople from "../inputs/SelectPeople.vue";
import SwapBtn from "../SwapBtn.vue";
import btn from "../buttons/btn.vue";
import { useTicketStoreRefs } from "~/store/useTicketStore";

const { tickets, isLoading } = useTicketStoreRefs();
const emit = defineEmits(["getTicket"]);

const onTicket = () => {
  emit("getTicket");
};

const swapCities = () => {
  const temp = tickets.value.data.departure;
  tickets.value.data.departure = tickets.value.data.arrival;
  tickets.value.data.arrival = temp;
};
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  @include bp($point_2) {
    width: 100%;
  }
}

.people-ic {
  @include flex-center;
  color: $blue;
}
</style>
