<template>
  <ContentView title="Москва — Амстердам, 11 ноя — 9 дек, 2024">
    <div class="passenger-form">
      <PassengerTabs
        :tabs="passengers"
        :activeTab="activeTab"
        @update:activeTab="setActiveTab"
      />
      <div class="tab-content">
        <div class="form-grid">
          <Inputs
            label="Фамилия"
            placeholder="Введите фамилию как в загранпаспорте"
            v-model="passengers[activeTab].lastName"
            :id="'lastName' + activeTab"
          />
          <Inputs
            label="Имя"
            placeholder="Введите имя как в загранпаспорте"
            v-model="passengers[activeTab].firstName"
            :id="'firstName' + activeTab"
          />
          <DatePicker
            :disablePast="true"
            v-model="passengers[activeTab].dateOfBirth"
          />
          <Select
            :options="['Мужчина', 'Женщина']"
            v-model="passengers[activeTab].gender"
            label="Пол"
            placeholder="Выберите пол"
          />
          <Inputs
            label="Серия загранпаспорта"
            placeholder="Введите серию"
            v-model="passengers[activeTab].passportSeries"
            :id="'passportSeries' + activeTab"
          />
          <Inputs
            label="Номер загранпаспорта"
            placeholder="Введите номер"
            v-model="passengers[activeTab].passportNumber"
            :id="'passportNumber' + activeTab"
          />
          <Select
            :options="['Россия', 'Украина', 'Беларусь']"
            v-model="passengers[activeTab].citizenship"
            label="Гражданство"
            placeholder="Выберите страну"
          />
          <Inputs
            label="Email"
            type="email"
            placeholder="Введите email"
            v-model="passengers[activeTab].email"
            :id="'email' + activeTab"
            icon="email"
          />
        </div>
        <div class="note">
          Бронирование будет направлено на ваш email с доступом в вашем личном
          кабинете
        </div>
        <div class="bottom">
          <div class="total">
            <span>Общая стоимость</span>
            <p class="price">550 ₽</p>
          </div>
          <btn
            name="Далее"
            theme="primary"
            size="normal"
            @click="
              router.push({
                name: 'air-id-confirmId',
                params: { id: 1, confirmId: 2 },
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
import DatePicker from "~/components/ui/inputs/DatePicker.vue";
import Select from "~/components/ui/inputs/Select.vue";
import PassengerTabs from "~/components/ui/PassengerTabs.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

// Массив пассажиров
const passengers = ref([
  {
    lastName: "",
    firstName: "",
    dateOfBirth: null,
    gender: "",
    passportSeries: "",
    passportNumber: "",
    citizenship: "",
    email: "",
    class: "эконом",
  },
  {
    lastName: "",
    firstName: "",
    dateOfBirth: null,
    gender: "",
    passportSeries: "",
    passportNumber: "",
    citizenship: "",
    email: "",
    class: "эконом",
  },
]);

// Активная вкладка
const activeTab = ref(0);

// Устанавливаем активный таб
const setActiveTab = (index: number) => {
  activeTab.value = index;
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
</style>
