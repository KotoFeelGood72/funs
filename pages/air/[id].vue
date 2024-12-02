<template>
  <div class="passenger-form">
    <ContentView title="Москва — Амстердам, 11 ноя — 9 дек, 2024">
      <ul class="tab-links">
        <li class="tab-link active">Пассажир №1, эконом</li>
        <li class="tab-link">Пассажир №2, эконом</li>
      </ul>
      <div class="tab-content">
        <div class="form-grid">
          <Inputs
            label="Фамилия"
            placeholder="Введите фамилию как в загранпаспорте"
            v-model="lastName"
            id="lastName"
          />
          <Inputs
            label="Имя"
            placeholder="Введите имя как в загранпаспорте"
            v-model="firstName"
            id="firstName"
          />
          <Calendar />
          <DatePicker :disablePast="true" v-model="firstName" />
          <Inputs
            label="Серия загранпаспорта"
            placeholder="Введите серию"
            v-model="passportSeries"
            id="passportSeries"
          />
          <Inputs
            label="Номер загранпаспорта"
            placeholder="Введите номер"
            v-model="passportNumber"
            id="passportNumber"
          />
          <Inputs
            label="Email"
            type="email"
            placeholder="Введите email"
            v-model="email"
            id="email"
          />
        </div>
        <div class="total">
          <p>Общая стоимость</p>
          <p class="price">550 ₽</p>
        </div>
        <btn name="Далее" />
      </div>
    </ContentView>
  </div>
</template>

<script setup lang="ts">
import ContentView from "~/components/shared/ContentView.vue";
import Inputs from "~/components/ui/inputs/Inputs.vue";
import btn from "~/components/ui/buttons/btn.vue";
import Calendar from "~/components/ui/inputs/Calendar.vue";
import DatePicker from "~/components/ui/inputs/DatePicker.vue";
import { ref } from "vue";
const dateRange = ref(["", ""]);
const lastName = ref("");
const firstName = ref("");
const birthDate = ref("");
const gender = ref("");
const passportSeries = ref("");
const passportNumber = ref("");
const nationality = ref("");
const email = ref("");

const countries = ["Россия", "США", "Германия", "Франция"]; // Добавьте страны
</script>

<style scoped lang="scss">
.passenger-form {
  .tab-links {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;

    .tab-link {
      padding: 8px 16px;
      border: 1px solid #ccc;
      border-radius: 8px;
      cursor: pointer;

      &.active {
        background-color: #007aff;
        color: #fff;
      }
    }
  }

  .tab-content {
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }

    .total {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;

      .price {
        font-weight: bold;
        font-size: 18px;
      }
    }

    .submit-btn {
      background-color: #007aff;
      color: #fff;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
  }
}
</style>
