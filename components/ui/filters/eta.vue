<template>
  <div class="filters">
    <div class="filter-group">
      <SearchSelect label="Выберите страну" v-model="eta.country" />
    </div>
    <div class="filter-group">
      <Calendar
        v-model:startDate="eta.date_forward"
        v-model:endDate="eta.date_backward"
        :isRange="true"
        :isError="true"
      />
    </div>
    <div class="filter-group">
      <SelectPeople v-model:adults="eta.adults" />
    </div>
    <btn
      name="Оплатить визу"
      icon="right"
      @click="onTicket()"
      theme="primary"
    />
  </div>
</template>

<script setup lang="ts">
import SearchSelect from "../inputs/SearchSelect.vue";
import Calendar from "../inputs/Calendar.vue";
import SelectPeople from "../inputs/SelectPeople.vue";
import btn from "../buttons/btn.vue";
import { useETAStoreRefs } from "~/store/useETAStore";

const { eta } = useETAStoreRefs();

const emit = defineEmits(["getEta"]);

const onTicket = () => {
  emit("getEta");
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
