<template>
  <ContentView
    title="Проверьте правильность введённых данных"
    :is-loading="false"
  >
    <div class="hotel_passenger">
      <div class="hotel_passenger__head">
        <div class="hotel_passenger__title">Ваши данные</div>
        <div class="hotel_passenger__row">
          <div class="hotel_passenger__email">
            E-Mail:
            <p>{{ ticket.email_address }}</p>
          </div>
          <div class="hotel_passenger__phone">
            Телефон:
            <p>{{ ticket.phone_number }}</p>
          </div>
        </div>
      </div>
      <div class="hotel_passenger__list" v-if="ticket && ticket.adults">
        <div class="hotel_passenger__item" v-for="(item, i) in ticket.adults">
          <div class="hotel_passenger__title">Гость {{ i + 1 }}</div>
          <ul>
            <li>
              <p>Дата рождения:</p>
              <span>{{ item.birth_date }}</span>
            </li>
            <li>
              <p>Имя:</p>
              <span>{{ item.first_name }}</span>
            </li>
            <li>
              <p>Фамилия:</p>
              <span>{{ item.last_name }}</span>
            </li>
            <li>
              <p>Номер паспорта:</p>
              <span>{{ item.number_seria_passport }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bottom">
      <Checkbox
        id="agreement-hotel"
        label="Я соглашаюсь с условиями договора, правилами и условиями обработки и хранения персональных данных"
        value="Я соглашаюсь с условиями договора, правилами и условиями обработки и хранения персональных данных"
        v-model="agreement"
        name="agreement"
      />
      <p>
        Бронирование формируется в срок до 3-х часов. Лист бронирования
        официальной платформы направим на указанный электронный адрес не позднее
        19 ч МСК
      </p>
      <div class="row">
        <div class="price">
          <span>Общая стоимость</span>
          <p>600</p>
        </div>
        <btn name="Оплатить" theme="primary" @click="openModal('payment')" />
      </div>
    </div>
  </ContentView>
</template>

<script setup lang="ts">
import ContentView from "~/components/shared/ContentView.vue";
import btn from "~/components/ui/buttons/btn.vue";
import Checkbox from "~/components/ui/inputs/Checkbox.vue";
import { useHotelStore, useHotelStoreRefs } from "~/store/useHotelStore";
import { useModalStore } from "~/store/useModalStore";

const route = useRoute();
const { getHotelId } = useHotelStore();
const { ticket } = useHotelStoreRefs();
const { openModal } = useModalStore();

const agreement = ref<boolean>(false);
onMounted(() => {
  getHotelId(route.params.id);
});
</script>

<style scoped lang="scss">
.header {
  margin-bottom: 3.2rem;
}

.bottom {
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  & > p {
    margin-bottom: 2rem;
    padding-left: 3rem;
  }
}

.hotel_passenger__head {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hotel_passenger__title {
  font-size: 2.4rem;
  color: $blue;
  font-family: $font_2;
  font-weight: 600;
}

.hotel_passenger__row {
  @include flex-start;
  gap: 2rem;
  font-size: 2rem;
  font-weight: 600;
  color: $dark;
  p {
    font-weight: 500;
    font-family: $font_2;
  }
  div {
    @include flex-start;
    gap: 1rem;
  }
}

.hotel_passenger {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-bottom: 6rem;
}

.hotel_passenger__list,
.hotel_passenger__item {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hotel_passenger__item {
  ul {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    li {
      border-bottom: 0.1rem solid $gray-light;
      padding-bottom: 1.5rem;
      @include flex-start;
      gap: 1rem;
    }
  }
}

.row {
  @include flex-space;

  p {
    font-size: 2.4rem;
    font-family: $font_2;
    font-weight: 600;
  }
}
</style>
