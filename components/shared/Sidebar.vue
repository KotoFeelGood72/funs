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
    <Range
      :min="0"
      :max="10000"
      :step="100"
      :valueMin="priceMin"
      :valueMax="priceMax"
      format="currency"
      @update:valueMin="priceMin = $event"
      @update:valueMax="priceMax = $event"
    />
    <Range
      :min="0"
      :max="3600"
      :step="30"
      :valueMin="timeMin"
      :valueMax="timeMax"
      format="time"
      @update:valueMin="timeMin = $event"
      @update:valueMax="timeMax = $event"
    />
  </div>
</template>

<script setup lang="ts">
import Checkboxes from "../ui/inputs/Checkboxes.vue";
import Range from "../ui/inputs/Range.vue";

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

<style scoped lang="scss"></style>
