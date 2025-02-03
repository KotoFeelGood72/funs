<template>
  <div class="info">
    <div class="info-start">
      <div class="info_start__col">
        <div class="info-ic">
          <Icon name="f:start" :size="25" />
        </div>
      </div>
      <div class="info_start__col">
        <h3 class="time">
          {{ formatDate(info.segments[0].departure_time, "time") }}
        </h3>
        <p class="city">
          {{ formatDate(info.segments[0].departure_time, "date") }}
        </p>
        <span class="tags">{{ info.segments[0].departure_airport }}</span>
      </div>
    </div>
    <AirLine :num="info.stops" :time="info.duration" />
    <div class="info-end">
      <div class="info_end__col">
        <div class="info-ic">
          <Icon name="f:end" :size="25" />
        </div>
      </div>
      <div class="info_end__col">
        <h3 class="time">
          {{ formatDate(info.segments[1].arrival_time, "time") }}
        </h3>
        <p class="city">
          {{ formatDate(info.segments[1].arrival_time, "date") }}
        </p>
        <span class="tags">{{ info.segments[0].arrival_airport }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AirLine from "./AirLine.vue";
// @ts-ignore
import { formatDate } from "../../utils/formatDate.js";
const props = defineProps<{
  info?: any;
}>();
</script>

<style scoped lang="scss">
.info {
  @include flex-space;
  gap: 1.6rem;
  padding-right: 9.3rem;
}

.time {
  font-size: 2.4rem;
}

.city {
  font-size: 1.4rem;
  color: $gray;
  padding: 0.8rem 0 2.8rem 0;
}

.tags {
  font-size: 1.4rem;
  color: $blue;
  font-family: $font_3;
  text-transform: uppercase;
}

.info-ic {
  @include flex-center;
}

.info-start {
  @include flex-start;
  align-items: flex-start;
  gap: 2.4rem;
}
.info-end {
  @include flex-start;
  align-items: flex-start;
  gap: 2.4rem;
}
</style>
