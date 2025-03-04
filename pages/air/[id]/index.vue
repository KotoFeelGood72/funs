<template>
  <ContentView
    :title="tickets.data?.departure.name + ' - ' + tickets.data?.arrival.name"
    :isLoading="false"
  >
    <div class="passenger-form" v-if="currentOrder.adults.length > 0">
      <PaymentForm />
      <PassengerTabs
        :tabs="currentOrder.adults"
        :activeTab="activeTab"
        @update:activeTab="setActiveTab"
      />
      <div class="tab-content">
        <div class="form-grid">
          <Inputs
            label="Фамилия"
            v-model="currentOrder.adults[activeTab].last_name"
            :id="'lastName' + activeTab"
          />
          <Inputs
            label="Имя"
            v-model="currentOrder.adults[activeTab].first_name"
            :id="'firstName' + activeTab"
          />
          <Inputs
            type="date"
            label="Дата рождения"
            v-model="currentOrder.adults[activeTab].birth_date"
            :id="'birthDate' + activeTab"
          />

          <Select
            :options="[
              { name: 'Мужчина', value: 'M' },
              { name: 'Женщина', value: 'W' },
            ]"
            v-model="currentOrder.adults[activeTab].gender"
            label="Пол"
          />
          <InputsMask
            v-model="currentOrder.adults[activeTab].number_seria_passport"
            :id="'passportNumber' + activeTab"
            label="Номер загранпаспорта"
            type="text"
            mask="##-## ###-###"
          />
          <Inputs
            label="Гражданство"
            v-model="currentOrder.adults[activeTab].nationality"
            :id="'nationality' + activeTab"
            mode="english"
          />
          <Inputs
            type="date"
            label="Срок действия"
            v-model="currentOrder.adults[activeTab].validity_period"
            :id="'validityPeriod' + activeTab"
          />
        </div>
        <div class="note">
          Бронирование будет направлено на ваш email с доступом в вашем личном
          кабинете
        </div>
        <div class="bottom">
          <div class="total">
            <span>Общая стоимость</span>
            <p class="price">{{ currentOrder?.price }} €</p>
          </div>
          <btn
            name="Далее"
            theme="primary"
            size="normal"
            @click="
              router.push({
                name: 'air-id-confirmId',
                params: {
                  id: route.params.id,
                  confirmId: String(route.query.ticketsId),
                },
              })
            "
          />
        </div>
      </div>
    </div>
  </ContentView>
</template>

<script setup lang="ts">
import ContentView from "~/components/shared/ContentView.vue";
import Inputs from "~/components/ui/inputs/Inputs.vue";
import btn from "~/components/ui/buttons/btn.vue";
import Select from "~/components/ui/inputs/Select.vue";
import PassengerTabs from "~/components/ui/PassengerTabs.vue";
import { useRouter, useRoute } from "vue-router";
import InputsMask from "~/components/ui/inputs/InputsMask.vue";
import PaymentForm from "~/components/shared/PaymentForm.vue";

import { useTicketStore, useTicketStoreRefs } from "~/store/useTicketStore";

const { getTickerForRequestToId, getTickerForRequest } = useTicketStore();
const { currentOrder, tickets } = useTicketStoreRefs();
const route = useRoute();
const router = useRouter();
const currentTicket = ref<any>(null);
const activeTab = ref(0);

const setActiveTab = (index: number) => {
  activeTab.value = index;
};
onMounted(() => {
  getTickerForRequest(route.query.ticketsId);
  currentTicket.value = getTickerForRequestToId(
    route.query.ticketsId,
    route.params.id
  );
});
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

      @include bp($point_2) {
        padding: 1rem 1.5rem;
      }
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

    @include bp($point_2) {
      flex-direction: column;
    }

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
</style>
