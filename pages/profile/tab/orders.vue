<template>
  <div class="orders">
    <div class="small-container">
      <div class="header">
        <h3>Текущие заказы</h3>
      </div>
      <div class="body">
        <!-- <AirCard v-for="(item, i) in 7" :key="'air-items-' + i" /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AirCard from "~/components/ui/card/AirCard.vue";
</script>

<style scoped lang="scss">
.orders {
  padding: 3.2rem 0 0 0;
}

.header {
  text-align: center;
  margin-bottom: 3.2rem;
  h3 {
    font-size: 2.4rem;
    font-family: $font_2;
    font-weight: 500;
  }
}
</style>
