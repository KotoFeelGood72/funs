<template>
  <div class="air">
    <div class="air_action">
      <div class="price">600 ₽</div>
      <div class="badge">
        <p>Багаж</p>
        <div class="ic">
          <Icon name="f:tright" :size="16" />
        </div>
      </div>
      <btn name="Бронировать для визы" @click="nextToAir()" theme="primary" size="normal"/>
    </div>
    <div class="air-content">
      <AirHead title="TURKISH AIRLINES" logo="" />
      <AirInfo start="" end="" :count="1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import btn from "../buttons/btn.vue";
import AirHead from "../air/AirHead.vue";
import AirInfo from "../air/AirInfo.vue";
import { useRouter } from "vue-router";

const router = useRouter()

const nextToAir = () => {
  router.push('/air/1')
}
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
  p {
    color: $blue;
    font-size: 1.8rem;
    font-family: $font_3;
  }
  .ic {
    @include flex-center;
  }
}

.air-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  flex-grow: 1;
}

.air_action {
  min-width: 25.7rem;
}
</style>
