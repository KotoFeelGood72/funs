<template>
  <div class="info">
    <div class="info-start">
      <div class="info_start__col">
        <div class="info-ic">
          <Icon name="f:start" :size="25" />
        </div>
      </div>
      <div class="info_start__col">
        <h3 class="time">22:35</h3>
        <p class="city">Москва 11 ноя, пн</p>
        <span class="tags">MSK</span>
      </div>
    </div>
    <AirLine :num="count" />
    <div class="info-end">
      <div class="info_end__col">
        <div class="info-ic">
          <Icon name="f:end" :size="25" />
        </div>
      </div>
      <div class="info_end__col">
        <h3 class="time">01:30</h3>
        <p class="city">Амстердам 9 дек, пн</p>
        <span class="tags">AMS</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AirLine from "./AirLine.vue";
defineProps<{
  start: any;
  end: any;
  count: number;
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
