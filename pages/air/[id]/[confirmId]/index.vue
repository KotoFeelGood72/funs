<template>
  <ContentView
    title="Проверьте правильность введённых данных"
    :isLoading="false"
  >
    <div class="row">
      <div class="ticket__list">
        <!-- <AirCard :card="currentTicket" :price="false" /> -->
      </div>
      <div class="ticket_data">
        <div class="ticket_pass">
          <div class="tickets__row">
            <div class="tickets_row__header">Покупатель</div>
            <div class="tickets_row__body">
              <div class="tickets_row__output">
                Телефон: <span>{{ currentOrder.phone_number }}</span>
              </div>
              <div class="tickets_row__output">
                E-Mail: <span>{{ currentOrder.email }}</span>
              </div>
            </div>
          </div>
          <div class="tickets__row__listW">
            <div class="tickets__row tickets__row__list">
              <div
                class="tickets_row__item"
                v-for="(item, i) in currentOrder.adults"
              >
                <div class="tickets_row__header">Пассажир № {{ i + 1 }}</div>
                <ul>
                  <li>
                    Дата рождения: <span>{{ item.birth_date }}</span>
                  </li>
                  <li>
                    Имя: <span>{{ item.first_name }}</span>
                  </li>
                  <li>
                    Фамилия: <span>{{ item.last_name }}</span>
                  </li>
                  <li>
                    Пол: <span>{{ item.gender }}</span>
                  </li>
                  <li>
                    Национальность: <span>{{ item.nationality }}</span>
                  </li>
                  <li>
                    Паспорт: <span>{{ item.number_seria_passport }}</span>
                  </li>
                  <li>
                    Дата выдачи: <span>{{ item.validity_period }}</span>
                  </li>
                </ul>
              </div>
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
              <span>{{ currentOrder.price }} </span>
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
import btn from "~/components/ui/buttons/btn.vue";
import { useTicketStore, useTicketStoreRefs } from "~/store/useTicketStore";
import { useRoute, useRouter } from "vue-router";
import Checkbox from "~/components/ui/inputs/Checkbox.vue";
import { useToast } from "vue-toastification";

const { currentOrder } = useTicketStoreRefs();
const { getTickerForRequestToId, getTickerForRequest } = useTicketStore();
const router = useRouter();
const route = useRoute();
const toast = useToast();
const agreement = ref<boolean>(false);

const payAirTicket = async () => {
  // await bookingTicketAir(route.params.id);
  setTimeout(() => {
    toast.success("Вы успешно оформили");
    router.push("/");
  }, 500);
};

onMounted(() => {
  // fetchTickedId(route.params.id);
  getTickerForRequest(route.params.confirmId);
  getTickerForRequestToId(route.params.confirmId, route.params.id);
});
</script>

<style scoped lang="scss">
.row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  gap: 3.2rem;

  @include bp($point_2) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    gap: 3rem;
  }
}

.ticket_pass {
  margin-bottom: 6rem;
}
.ticket_total {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  & > p {
    color: $gray;
  }
}

.ticket_pass {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.tickets_row__header {
  font-size: 2rem;
  color: $blue;
  font-family: $font_2;
  font-weight: 600;
  margin-bottom: 1rem;
}

.tickets_row__body {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  grid-gap: 2rem;
}

.tickets__row {
  border: 0.1rem solid $gray-light;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
}
.tickets_row__output {
  font-size: 1.8rem;
  color: $dark;
  font-weight: 600;
  display: flex;
  gap: 1rem;
  span {
    color: $light-blue;
  }
}

.tickets_row__item {
  ul {
    li {
      font-size: 1.6rem;
      color: $dark;
      gap: 1rem;
      @include flex-space;
      padding: 0.8rem 0;
      &:not(:last-child) {
        border-bottom: 0.1rem solid $gray-light;
      }
    }

    span {
      font-family: $font_2;
      font-weight: 500;
    }
  }
}

.ticket_total__price {
  @include flex-space;

  .col {
    span {
      font-size: 2.4rem;
      font-family: $font_2;
      font-weight: 600;
    }
  }
}
</style>
