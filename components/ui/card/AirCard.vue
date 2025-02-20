<template>
  <div class="air">
    <div class="air_action" v-if="price">
      <div class="price">{{ card.price }} <span class="walet">₽</span></div>
      <!-- <div class="badge" v-if="false">
        <p>Багаж</p>
        <div class="ic">
          <Icon name="f:tright" :size="16" />
        </div>
      </div> -->
      <btn
        name="Бронировать для визы"
        @click="nextToAir()"
        theme="primary"
        size="normal"
      />
    </div>
    <div class="air-content">
      <AirHead
        :title="card?.airline"
        :logo="card?.itineraries[0].segments[0].carrier_logo"
      />
      <div class="air_info__list">
        <AirInfo
          v-for="(item, i) in card?.itineraries"
          :key="'card-itineraries' + i"
          :info="item"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import btn from "../buttons/btn.vue";
import AirHead from "../air/AirHead.vue";
import AirInfo from "../air/AirInfo.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const nextToAir = () => {
  router.push(`/air/${props.card.id}`);
};

const props = withDefaults(
  defineProps<{
    card?: any;
    price?: boolean;
  }>(),
  {
    price: true,
    card: {},
  }
);
</script>

<style scoped lang="scss">
.air {
  border: 0.1rem solid #d9d9d9;
  padding: 1.6rem;
  border-radius: 0.8rem;
  display: flex;
  gap: 1.6rem;

  @include bp($point_2) {
    flex-direction: column;
  }
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
  @include bp($point_2) {
    min-width: 100%;
    order: 1;
  }
}

.air_info__list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  :deep(.info) {
    &:nth-child(2) {
      border-top: 0.1rem solid #e3e3e3;
      padding-top: 1.5rem;
    }
  }
}

.walet {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
