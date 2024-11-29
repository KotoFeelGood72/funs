<template>
  <div class="sidebar">
    <div class="sidebar-head">
      <p>Фильтры</p>
      <div class="clear">
        <p>Сбросить</p>
        <div class="ic"><Icon name="f:close" /></div>
      </div>
    </div>
    <div class="row">
      <div class="row-head">Пересадки</div>
      <div class="list">
        <Checkboxes
          :id="'transfer-item-' + i"
          :label="item"
          :value="item"
          v-for="(item, i) in transfer"
          :key="'transfer-item-' + i"
          v-model="selectedTransfer"
          name="transfers"
        />
      </div>
    </div>
    <div class="row">
      <div class="row-head">Авиакомпании</div>
      <div class="list">
        <Checkboxes
          :id="'avia-item-' + i"
          :label="item"
          :value="item"
          v-for="(item, i) in avia"
          :key="'avia-item-' + i"
          v-model="selectedAvia"
          name="avia"
        />
      </div>
    </div>
    <PriceRange
      :min="0"
      :max="10000"
      :step="100"
      format="currency"
      v-model:min-value="priceMin"
      v-model:max-value="priceMax"
    />
    <TimeRange
      :min="0"
      :max="3510"
      :step="30"
      :minValue="timeMin"
      :maxValue="timeMax"
    />
    <TimeRange
      :min="0"
      :max="3510"
      :step="30"
      :minValue="timeMin"
      :maxValue="timeMax"
    />
    <TimeRange
      :min="0"
      :max="3510"
      :step="30"
      :minValue="timeMin"
      :maxValue="timeMax"
    />
  </div>
</template>

<script setup lang="ts">
import Checkboxes from "../ui/inputs/Checkboxes.vue";
import PriceRange from "../ui/inputs/PriceRange.vue";
import TimeRange from "../ui/inputs/TimeRange.vue";

const priceMin = ref(1000);
const priceMax = ref(9000);

const timeMin = ref(1470); // 24ч 30м
const timeMax = ref(3510); // 58ч 30м

const transfer = ["1 пересадка", "2 пересадка", "3 пересадка"];
const avia = [
  "Все",
  "Аэрофлот",
  "Уральские Авиалинии",
  "Qatar",
  "Emirates",
  "Азимут",
  "Pegasus Airlines",
  "Белавиа",
  "Georgian Airways",
];
const selectedTransfer = ref<any>();
const selectedAvia = ref<any>();
</script>

<style scoped lang="scss">
.sidebar {
  border: 0.1rem solid #d9d9d9;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 1.6rem;
  border-radius: 0.8rem;
  width: 100%;
  max-width: 29rem;
}

.sidebar-head {
  @include flex-start;
  gap: 1.2rem;

  & > p {
    font-size: 2.4rem;
    font-family: $font_2;
  }
}

.clear {
  @include flex-center;
  background-color: $gray-light;
  padding: 0.5rem;
  border-radius: 0.8rem;
  cursor: pointer;
  font-size: 1.6rem;
  gap: 0.8rem;
  font-family: $font_2;
}

.ic {
  @include flex-center;
}

.row-head {
  font-size: 1.4rem;
  margin-bottom: 1.6rem;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}
</style>
