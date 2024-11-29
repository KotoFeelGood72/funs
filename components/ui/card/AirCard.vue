<template>
  <div class="air">
    <div class="air_action">
      <div class="price">600 ₽</div>
      <div class="badge">
        <p>Багаж</p>
        <div class="ic">
          <Icon name="f:tright" :size="16" />
          <!-- <Icon name="f:tleft" :size="16" /> -->
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
  display: flex;
  gap: 1.6rem;
}

.price {
  font-size: 3.2rem;
  margin-bottom: 2.4rem;
  font-family: $font_2;
}

.badge {
  @include flex-start;
  gap: 0.8rem;
  margin-bottom: 2.8rem;
  // &.active {
  p {
    color: $blue;
    font-size: 1.8rem;
    font-family: $font_3;
  }
  // }
  .ic {
    @include flex-center;
  }
}
</style>
