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
                v-model="passenger.last_name"
                :id="route.params.id + 'lastName' + index"
              />
              <Inputs
                label="Имя"
                v-model="passenger.first_name"
                :id="route.params.id + 'firstName' + index"
              />
              <Inputs
                type="date"
                label="Дата рождения"
                v-model="passenger.birth_date"
                :id="route.params.id + 'birthDate' + index"
              />
              <Select
                :options="[
                  { name: 'Мужчина', value: 'M' },
                  { name: 'Женщина', value: 'W' },
                ]"
                v-model="passenger.gender"
                label="Пол"
              />
              <InputsMask
                label="Номер загранпаспорта"
                v-model="passenger.number_seria_passport"
                :id="route.params.id + 'passportNumber' + index"
                mask="##-## ###-###"
              />
              <Inputs label="Гражданство" v-model="passenger.nationality" />
              <Inputs
                type="date"
                label="Срок действия"
                v-model="passenger.validity_period"
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
            <btn name="Оплатить" @click="payAirTicket()" />
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
import { useRoute, useRouter } from "vue-router";
import Checkbox from "~/components/ui/inputs/Checkbox.vue";
import InputsMask from "~/components/ui/inputs/InputsMask.vue";
import { useToast } from "vue-toastification";

const { ticket, currentTicket } = useTicketAirStoreRefs();
const { bookingTicketAir } = useTicketAirStore();

const router = useRouter();
const route = useRoute();
const toast = useToast();
const activeTab = ref<number | null>(0);
const agreement = ref<boolean>(false);

const toggleAccordion = (index: number) => {
  activeTab.value = activeTab.value === index ? null : index;
};

const payAirTicket = async () => {
  await bookingTicketAir(route.params.id);
  setTimeout(() => {
    toast.success("Вы успешно оформили");
    router.push("/");
  }, 500);
};

onMounted(() => {
  // fetchTickedId(route.params.id);
});
</script>

<style scoped lang="scss">
.accordion {
  .accordion_item {
    margin-bottom: 1.6rem;
    border: 0.1rem solid #a2d0ff;
    border-radius: 0.8rem;

    &__head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.6rem;
      // background-color: #f9f9f9;
      cursor: pointer;
      font-size: 1.8rem;
      font-weight: 500;
      font-family: $font_2;
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

  @include bp($point_2) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    gap: 3rem;
  }
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

  @include bp($point_2) {
    flex-direction: column;
  }

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

.accordion__icon {
  @include flex-center;
  color: $blue;
}
</style>
