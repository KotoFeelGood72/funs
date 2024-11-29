<template>
  <div class="hotel">
    <ContentView title="Проверьте правильность введённых данных">
      <div class="body">
        <!-- Аккордион -->
        <div class="accordion">
          <div
            v-for="(passenger, index) in passengers"
            :key="index"
            class="accordion-item"
          >
            <button class="accordion-header" @click="toggleAccordion(index)">
              {{ tabs[index] }}
              <span class="arrow" :class="{ open: openIndex === index }"
                >▼</span
              >
            </button>
            <div class="accordion-content" v-show="openIndex === index">
              <div class="form">
                <div class="form-row">
                  <Inputs
                    v-model="passenger.lastName"
                    label="Фамилия"
                    placeholder="Введите фамилию как в загранпаспорте"
                  />
                  <Inputs
                    v-model="passenger.firstName"
                    label="Имя"
                    placeholder="Введите имя как в загранпаспорте"
                  />
                </div>
                <div class="form-row">
                  <Calendar
                    v-model="passenger.birthDate"
                    label="Дата рождения"
                    placeholder="ДД.ММ.ГГГГ"
                  />
                  <Inputs
                    v-model="passenger.email"
                    label="Email"
                    placeholder="Введите email"
                    type="email"
                  />
                </div>
                <div class="form-row">
                  <Select
                    v-model="passenger.placement"
                    label="Размещение"
                    :options="placements"
                    placeholder="Выберите объект проживания"
                  />
                  <Select
                    v-model="passenger.hotelClass"
                    label="Класс отеля"
                    :options="hotelClasses"
                    placeholder="Выберите класс"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Информация и стоимость -->
        <div class="info">
          <p>
            Отель без полной предоплаты для подачи на визу. Проверяем
            бронирование на срок до 14 дней. Соответствует требованиям
            большинства консульств.
          </p>
        </div>

        <!-- Подтверждение -->
        <div class="footer">
          <div class="checkbox">
            <input type="checkbox" id="agree" v-model="isAgreed" />
            <label for="agree">
              Я соглашаюсь с условиями договора, правилами и условиями обработки
              и хранения персональных данных
            </label>
          </div>
          <div class="footer-row">
            <p>
              Общая стоимость <span>{{ totalCost }} ₽</span>
            </p>
            <button
              class="btn-primary"
              :disabled="!isAgreed"
              @click="submitBooking"
            >
              Оплатить
            </button>
          </div>
        </div>
      </div>
    </ContentView>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import ContentView from "~/components/shared/ContentView.vue";
import Inputs from "~/components/ui/inputs/Inputs.vue";
import Calendar from "~/components/ui/inputs/Calendar.vue";
import Select from "~/components/ui/inputs/Select.vue";

// Состояние аккордиона
const openIndex = ref<number | null>(0);

// Вкладки
const tabs = ["Взрослый №1", "Взрослый №2", "Ребёнок №1"];

// Данные пассажиров
const passengers = reactive([
  {
    lastName: "",
    firstName: "",
    birthDate: "",
    email: "",
    placement: "",
    hotelClass: "",
  },
  {
    lastName: "",
    firstName: "",
    birthDate: "",
    email: "",
    placement: "",
    hotelClass: "",
  },
  {
    lastName: "",
    firstName: "",
    birthDate: "",
    email: "",
    placement: "",
    hotelClass: "",
  },
]);

// Опции для размещения и класса отеля
const placements = ["Отель", "Апартаменты", "Хостел"];
const hotelClasses = ["1 звезда", "2 звезды", "3 звезды", "Люкс"];

// Итоговая стоимость
const totalCost = ref(600);

// Состояние чекбокса
const isAgreed = ref(false);

// Открытие/закрытие аккордиона
const toggleAccordion = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};

// Подтверждение бронирования
const submitBooking = () => {
  console.log("Данные пассажиров:", passengers);
  alert("Данные отправлены!");
};
</script>

<style scoped lang="scss">
.hotel {
  .accordion {
    .accordion-item {
      margin-bottom: 1rem;
      border: 1px solid #ddd;
      border-radius: 5px;

      .accordion-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: #f9f9f9;
        cursor: pointer;
        font-weight: bold;

        .arrow {
          transition: transform 0.2s;
        }

        .arrow.open {
          transform: rotate(180deg);
        }
      }

      .accordion-content {
        padding: 1rem;
        border-top: 1px solid #ddd;
      }
    }
  }

  .info {
    font-size: 0.9rem;
    color: #555;
    margin-top: 1.5rem;
  }

  .footer {
    margin-top: 2rem;

    .checkbox {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      input {
        margin-right: 0.5rem;
      }

      label {
        font-size: 0.9rem;
        color: #555;
      }
    }

    .footer-row {
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

        &:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>
