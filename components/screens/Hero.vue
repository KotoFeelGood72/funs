<template>
  <div class="hero">
    <div class="container">
      <div class="hero_main">
        <div class="hero__content" v-if="title">
          <h2>бронь — это fun</h2>
          <div class="hero_row">
            <img src="~/assets/img/pic-logo.png" />
            <h1><b>Funbooking</b> — это бронь</h1>
          </div>
          <h2>авиабилетов, отелей и визы на срок до 14 дней․</h2>
          <p class="txt">а также страховые полисы стран евросоюза</p>
        </div>
        <h3 v-if="!title" class="hero_subtitle">
          Забронируйте авиабилет для визы без полной оплаты
        </h3>
        <div class="hero_bottom">
          <Tabs :tabs="list">
            <template #tab-0>
              <air />
            </template>
            <template #tab-1>
              <hotel />
            </template>
            <template #tab-2>
              <eta />
            </template>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import air from "../ui/filters/air.vue";
import hotel from "../ui/filters/hotel.vue";
import eta from "../ui/filters/eta.vue";
import Tabs from "../ui/Tabs.vue";
const props = withDefaults(
  defineProps<{
    title?: boolean;
  }>(),
  {
    title: true,
  }
);

const list = [{ label: "Билеты" }, { label: "Отели" }, { label: "ETA" }];
</script>

<style scoped lang="scss">
.hero_main {
  color: $blue;
  background-color: $white;
  padding: 3.2rem;
  border-radius: 3.2rem;
  h2 {
    font-size: 10rem;
    line-height: 9.5rem;
  }
}

.hero_row {
  @include flex-start;
  h1 {
    font-size: 10rem;
    line-height: 9.5rem;
    b {
      font-family: $font_5;
      font-style: italic;
    }
  }
}

.txt {
  padding: 2rem 0 3.2rem 0;
  font-size: 2.4rem;
  color: $dark;
}

.hero__content {
  background-color: $white;
  border-radius: 3.2rem;
}

.hero_subtitle {
  @include flex-center;
  font-size: 2.4rem;
  font-family: $font_1;
  font-weight: 400;
  color: $dark;
  margin-bottom: 3.2rem;
}
</style>
