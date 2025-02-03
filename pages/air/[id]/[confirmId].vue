<template>
  <ContentView
    title="Проверьте правильность введённых данных"
    :isLoading="false"
  >
    <div class="row">
      <div class="ticket__list">
        <AirCard :card="currentTicket" :price="false" />
      </div>
      <div class="ticket_data">
        <PaymentForm />
        <div class="accordion">
          <div
            v-for="(passenger, index) in ticket.passengers"
            :key="'passenger-' + index"
            class="accordion_item"
          >
            <div class="accordion_item__head" @click="toggleAccordion(index)">
              <p>Пассажир №{{ index + 1 }}, эконом</p>
              <div class="accordion__icon">
                <Icon
                  :name="
                    activeTab === index
                      ? 'mynaui:chevron-up-solid'
                      : 'mynaui:chevron-down-solid'
                  "
                />
              </div>
            </div>
            <div v-if="activeTab === index" class="accordion_item__body">
              <Inputs
                label="Фамилия"
                v-model="passenger.lastName"
                :id="route.params.id + 'lastName' + index"
              />
              <Inputs
                label="Имя"
                v-model="passenger.firstName"
                :id="route.params.id + 'firstName' + index"
              />
              <Inputs
                type="date"
                label="Дата рождения"
                v-model="passenger.birthDate"
                :id="route.params.id + 'birthDate' + index"
              />
              <Select
                :options="['Мужчина', 'Женщина']"
                v-model="passenger.gender"
                label="Пол"
              />
              <Inputs
                label="Серия загранпаспорта"
                v-model="passenger.seriaPassport"
                :id="route.params.id + 'passportSeries' + index"
              />
              <Inputs
                label="Номер загранпаспорта"
                v-model="passenger.numberPassport"
                :id="route.params.id + 'passportNumber' + index"
              />
              <Select
                :options="['Россия', 'Украина', 'Беларусь']"
                v-model="passenger.nationality"
                label="Гражданство"
              />
              <Inputs
                type="date"
                label="Срок действия"
                v-model="passenger.validityPeriod"
                :id="route.params.id + 'validityPeriod' + index"
              />
            </div>
          </div>
        </div>
        <div class="ticket_total">
          <p>
            Бронирование действительно 10 дней, начиная со дня оплаты. Вы также
            сможете выкупить нужный билет по истечении срока бронирования
            (применяются правила)
          </p>
          <Checkbox
            id="agreement-hotel"
            label="Я соглашаюсь с условиями договора, правилами и условиями обработки и хранения персональных данных"
            value="Я соглашаюсь с условиями договора, правилами и условиями обработки и хранения персональных данных"
            v-model="agreement"
            name="agreement"
          />
          <div class="ticket_total__price">
            <div class="col">
              <p>Общая стоимость</p>
              <span>{{ currentTicket.price }} €</span>
            </div>
            <btn name="Оплатить" @click="bookingTicketAir(route.params.id)" />
          </div>
        </div>
      </div>
    </div>
  </ContentView>
</template>

<script setup lang="ts">
import ContentView from "~/components/shared/ContentView.vue";
import Inputs from "~/components/ui/inputs/Inputs.vue";
import Select from "~/components/ui/inputs/Select.vue";
import AirCard from "~/components/ui/card/AirCard.vue";
import btn from "~/components/ui/buttons/btn.vue";
import PaymentForm from "~/components/shared/PaymentForm.vue";
import {
  useTicketAirStoreRefs,
  useTicketAirStore,
} from "~/store/useTicketAirStore";
import { useRoute } from "vue-router";
import Checkbox from "~/components/ui/inputs/Checkbox.vue";

const { ticket, currentTicket } = useTicketAirStoreRefs();
const { fetchTickedId, bookingTicketAir } = useTicketAirStore();

const route = useRoute();
const activeTab = ref<number | null>(0);
const agreement = ref<boolean>(false);

const toggleAccordion = (index: number) => {
  activeTab.value = activeTab.value === index ? null : index;
};

onMounted(() => {
  fetchTickedId(route.params.id);
});
</script>

<style scoped lang="scss">
.accordion {
  .accordion_item {
    margin-bottom: 1.6rem;
    border: 1px solid #ddd;
    border-radius: 0.8rem;

    &__head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.6rem;
      background-color: #f9f9f9;
      cursor: pointer;
      font-size: 1.6rem;
      font-weight: bold;
    }

    &__body {
      padding: 1.6rem;
      background-color: #fff;
    }

    .accordion__icon {
      font-size: 2rem;
    }
  }
}

.row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  gap: 3.2rem;
}

.accordion_item__body {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  gap: 2rem;
}

.ticket_total__price {
  @include flex-space;
  align-items: flex-end;
  gap: 2rem;

  .col {
    p {
      color: $gray;
    }
    span {
      font-size: 3.2rem;
      font-family: $font_3;
    }
  }
}

.ticket_total {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  & > p {
    color: $gray;
  }
}
</style>
