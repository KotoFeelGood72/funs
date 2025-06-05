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
        </div>
        <h3 v-if="!title" class="hero_subtitle">
          Забронируйте авиабилет для визы без полной оплаты
        </h3>
        <div class="hero_bottom">
          <Tabs :tabs="list">
            <template #tab-0>
              <AirFilterForm />
            </template>
            <template #tab-1>
              <HotelFilterForm />
            </template>
            <template #tab-2>
              <VisaFilterForm />
            </template>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AirFilterForm from "@/components/ui/filters/AirFilterForm.vue";
import HotelFilterForm from "@/components/ui/filters/HotelFilterForm.vue";
import VisaFilterForm from "@/components/ui/filters/VisaFilterForm.vue";
import Tabs from "../ui/Tabs.vue";
import { useTicketStore } from "~/store/useTicketStore";
import { useRouter } from "vue-router";
withDefaults(
  defineProps<{
    title?: boolean;
  }>(),
  {
    title: true,
  }
);

const router = useRouter();
const requestId = ref<string | null>(null);

const { getTickets } = useTicketStore();

const list = [{ label: "Билеты" }, { label: "Отели" }, { label: "ETA" }];

const getTicket = async () => {
  requestId.value = await getTickets();
  await router.push({ name: "air", query: { ticketsId: requestId.value } });
};
</script>

<style scoped lang="scss">
.hero {
  @include bp($point_2) {
    margin: 0 1.6rem 6rem 1.6rem !important;
  }
}
.hero_main {
  color: $blue;
  background-color: $white;
  padding: 3.2rem;
  border-radius: 3.2rem;
  @include bp($point_2) {
    border-radius: 1.6rem;
    padding: 1.6rem;
  }
  h2 {
    font-size: 10rem;
    line-height: 9.5rem;
    @include bp($point_2) {
      font-size: 3.8rem;
      line-height: 4.5rem;
    }
  }

  img {
    @include bp($point_2) {
      max-width: 10rem;
    }
  }
}

.hero_row {
  @include flex-start;
  @include bp($point_2) {
    gap: 1rem;
    align-items: flex-start;
  }

  img {
    max-width: 26rem;
    @include bp($point_2) {
      max-width: 10rem;
      margin-top: 1rem;
    }
  }
  h1 {
    font-size: 10rem;
    line-height: 9.5rem;
    @include bp($point_2) {
      font-size: 3rem;
      line-height: 4.5rem;
    }
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
  @include bp($point_2) {
    font-size: 1.4rem;
  }
}

.hero__content {
  background-color: $white;
  border-radius: 3.2rem;
  margin-bottom: 5rem;
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
