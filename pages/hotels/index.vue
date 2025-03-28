<template>
  <ContentView
    :back="false"
    :title="ticket.city?.name ? 'Отели в ' + ticket.city.name : 'Отели в'"
    :isLoading="false"
  >
    <div class="passenger-header">
      <hotel />
    </div>
    <div class="passenger-form">
      <PaymentFormHotel />
      <PassengerTabs
        :tabs="ticket.adults"
        :activeTab="activeTab"
        @update:activeTab="setActiveTab"
      />
      <div class="tab-content" v-if="ticket.adults && ticket.adults.length > 0">
        <div class="form-grid">
          <Inputs
            label="ФИО"
            v-model="ticket.adults[activeTab].first_name"
            :id="'lastName' + activeTab"
          />

          <Inputs
            v-if="'birth_date' in ticket.adults[activeTab]"
            type="date"
            label="Дата рождения"
            v-model="ticket.adults[activeTab].birth_date"
            :id="'birthDate' + activeTab"
          />

          <!-- <InputsMask
            label="Номер загранпаспорта"
            v-model="ticket.adults[activeTab].number_seria_passport"
            mask="##-## ###-###"
            :id="'number_serias_passport' + activeTab"
          /> -->
        </div>
        <div class="note">
          Бронирование будет направлено на ваш email с доступом в вашем личном кабинете
          --> Направим лист с маршрутом на ваш email. Также он доступен в Личном кабинете.
        </div>
        <div class="bottom">
          <div class="total">
            <span>Общая стоимость</span>
            <p class="price">{{ price?.price }} ₽</p>
          </div>
          <btn
            name="Далее"
            theme="primary"
            size="normal"
            @click="bookingHotelForNextPage()"
          />
        </div>
      </div>
    </div>
  </ContentView>
</template>

<script setup lang="ts">
import ContentView from "~/components/shared/ContentView.vue";
import PaymentFormHotel from "~/components/shared/PaymentFormHotel.vue";
import PassengerTabs from "~/components/ui/PassengerTabs.vue";
import hotel from "~/components/ui/filters/hotel.vue";
import btn from "~/components/ui/buttons/btn.vue";
import Inputs from "~/components/ui/inputs/Inputs.vue";
import { useRouter, useRoute } from "vue-router";
import { useHotelStore, useHotelStoreRefs } from "~/store/useHotelStore";
import InputsMask from "~/components/ui/inputs/InputsMask.vue";

// const isLoading = ref<boolean>(true);
const route = useRoute();
const router = useRouter();
const { ticket } = useHotelStoreRefs();
const { bookingHotelAddInfo, getHotelPrice, getHotelId } = useHotelStore();
const activeTab = ref<number>(0);

const setActiveTab = (index: number) => {
  activeTab.value = index;
};

const price = ref<any>(null);

onMounted(async () => {
  price.value = await getHotelPrice();
  if (route.query.hotelId) {
    getHotelId(route.query.hotelId);
  }
});

const bookingHotelForNextPage = async () => {
  await bookingHotelAddInfo(route.query.hotelId, "post");
  if (ticket.value && ticket.value.id) {
    await router.push({
      name: "hotels-id",
      params: { id: String(route.query.hotelId) },
    });
  }
};
</script>

<style scoped lang="scss">
.passenger-form {
  margin: 0 auto;
  width: 100%;
  max-width: 94.8rem;
  .tab-links {
    @include flex-start;
    gap: 0.4rem;
    flex-wrap: wrap;
    font-size: 1.8rem;
    font-family: $font_2;
    margin-bottom: 2.4rem;

    @include bp($point_2) {
      font-size: 1.4rem;
    }

    .tab-link {
      background-color: $gray-light;
      border-radius: 0.8rem;
      color: $dark;
      padding: 1rem 0.8rem 0.8rem 0.8rem;
      cursor: pointer;
      &.active {
        color: $blue;
        background-color: #a2d0ff4a;
      }
    }
  }

  .tab-content {
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.4rem;
      margin-bottom: 2.4rem;
    }
  }

  .note {
    color: #999;
    margin-bottom: 2.4rem;
    font-size: 1.4rem;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1.6rem;

    .total {
      span {
        font-size: 1.4rem;
        color: #999;
        display: block;
        margin-bottom: 0.8rem;
      }
      p {
        font-size: 3.2rem;
        font-weight: bold;
      }
    }
  }
}

.passenger-header {
  margin-bottom: 4rem;
}
</style>
