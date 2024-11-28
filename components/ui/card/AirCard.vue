<template>
  <div class="air">
    <div class="air_action">
      <div class="price">600 ₽</div>
      <div class="badge">
        <p>Багаж</p>
        <div class="ic">
          <Icon name="f:tright" />
        </div>
      </div>
      <btn name="Бронировать для визы" />
    </div>
    <div class="air-content">
      <AirHead title="" logo="" />
      <AirInfo start="" end="" :count="2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import btn from "../buttons/btn.vue";
import AirHead from "../air/AirHead.vue";
import AirInfo from "../air/AirInfo.vue";
</script>

<style scoped lang="scss">
.air {
  border: 0.1rem solid #d9d9d9;
  padding: 1.6rem;
  border-radius: 0.8rem;
}
</style>
