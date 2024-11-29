<template>
  <div class="hotel">
    <ContentView title="Отели в Амстердаме">
      <div class="top">
        <hotel />
      </div>
      <div class="body">
        <div class="tabs">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            :class="{ active: currentTab === index }"
            @click="currentTab = index"
          >
            {{ tab }}
          </button>
        </div>
        <div class="form">
          <div class="form-row">
            <Inputs
              label="Фамилия"
              placeholder="Введите фамилию как в загранпаспорте"
            />
            <Inputs
              label="Имя"
              placeholder="Введите имя как в загранпаспорте"
            />
          </div>
          <div class="form-row">
            <Calendar label="Дата рождения" placeholder="ДД.ММ.ГГГГ" />
            <Inputs label="Email" placeholder="Введите email" type="email" />
          </div>
          <div class="form-row">
            <Select
              label="Размещение"
              :options="placements"
              placeholder="Выберите объект проживания"
            />
            <Select
              label="Класс отеля"
              :options="hotelClasses"
              placeholder="Выберите класс"
            />
          </div>
          <div class="info">
            <p>
              Отель без полной предоплаты для подачи на визу. Проверяем
              бронирование на срок до 14 дней. Соответствует требованиям
              большинства консульств.
            </p>
          </div>
          <div class="footer">
            <p>
              Общая стоимость <span>{{ totalCost }} ₽</span>
            </p>
            <button class="btn-primary" @click="submitBooking">Далее</button>
          </div>
        </div>
      </div>
    </ContentView>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ContentView from "~/components/shared/ContentView.vue";
import Inputs from "~/components/ui/inputs/Inputs.vue";
import Calendar from "~/components/ui/inputs/Calendar.vue";
import Select from "~/components/ui/inputs/Select.vue";
import hotel from "~/components/ui/filters/hotel.vue";

// Состояние вкладок (взрослые, дети)
const tabs = ["Взрослый №1", "Взрослый №2", "Ребёнок №1"];
const currentTab = ref(0);

// Данные для выбора
const placements = ["Отель", "Апартаменты", "Хостел"];
const hotelClasses = ["Эконом", "Стандарт", "Люкс"];

// Итоговая стоимость
const totalCost = ref(600);

// Подтверждение бронирования
const submitBooking = () => {
  alert("Данные отправлены!");
};
</script>

<style scoped lang="scss">
.hotel {
  .tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;

    button {
      padding: 0.8rem 1.6rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      cursor: pointer;
      background: white;
      font-weight: bold;

      &.active {
        background: #007aff;
        color: white;
      }
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .info {
      font-size: 0.9rem;
      color: #555;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.2rem;

      span {
        font-weight: bold;
        color: #007aff;
      }

      .btn-primary {
        padding: 0.8rem 1.6rem;
        background: #007aff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          background: #005bb5;
        }
      }
    }
  }
}
</style>
