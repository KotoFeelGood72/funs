<template>
  <div class="custom_calendar__w" ref="calendarWrapper">
    <!-- Поле ввода для даты -->
    <input
      type="text"
      v-model="inputDate"
      @focus="showCalendar = true"
      placeholder="Выберите дату"
      class="date-input"
    />
    <div v-if="showCalendar" class="custom-calendar" @mousedown.stop>
      <!-- Текущая дата -->
      <div class="current-date">
        {{ formattedToday }}
      </div>

      <!-- Месяц и год -->
      <div class="header">
        <div class="month-year">
          <span>{{ months[currentMonth] }}</span>
          <select v-model="currentYear" class="year-select">
            <option v-for="year in yearsRange" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        <div class="nav">
          <div class="nav-btn" @click="prevMonth">
            <Icon name="f:c-left" :size="22" />
          </div>
          <div class="nav-btn" @click="nextMonth">
            <Icon name="f:c-right" :size="22" />
          </div>
        </div>
      </div>

      <!-- Дни недели -->
      <div class="weekdays">
        <div v-for="day in weekdays" :key="day" class="weekday">
          {{ day }}
        </div>
      </div>

      <!-- Дни месяца -->
      <div class="days">
        <div
          v-for="(day, index) in days"
          :key="index"
          :class="[
            'day',
            {
              'is-today': isToday(day.date),
              'is-selected': isSelected(day.date),
              'is-disabled': !day.currentMonth,
            },
          ]"
          @click="day.currentMonth && selectDate(day.date)"
        >
          {{ day.date.getDate() }}
        </div>
      </div>

      <!-- Кнопки управления -->
      <div class="actions">
        <btn name="Очистить" @click="clearDate" theme="white" />
        <btn name="Готово" @click="confirmDate" theme="primary" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import btn from "../buttons/btn.vue";

// Пропсы
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  disablePast: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

// Локальные состояния
const today = new Date();
const showCalendar = ref(false);
const currentDate = ref<Date | null>(null);
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());
const inputDate = ref(props.modelValue);

const calendarWrapper = ref<HTMLDivElement | null>(null);

// Синхронизация v-model
watch(inputDate, (newVal) => emit("update:modelValue", newVal));

// Данные для календаря
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const yearsRange = computed(() => {
  const startYear = today.getFullYear() - 100;
  const endYear = today.getFullYear() + 10;
  return Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );
});

const formattedToday = computed(() =>
  today.toLocaleDateString("ru-RU", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
);

const days = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);

  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // День недели начала месяца
  const endDay = (7 - ((startDay + daysInMonth) % 7)) % 7; // День недели конца месяца

  const previousMonthLastDay = new Date(
    currentYear.value,
    currentMonth.value,
    0
  ).getDate();

  // Дни предыдущего месяца
  const prevMonthDays = Array.from(
    { length: startDay },
    (_, i) => previousMonthLastDay - startDay + i + 1
  ).map((day) => ({
    date: new Date(currentYear.value, currentMonth.value - 1, day),
    currentMonth: false,
  }));

  // Дни текущего месяца
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
    date: new Date(currentYear.value, currentMonth.value, i + 1),
    currentMonth: true,
  }));

  // Дни следующего месяца
  const nextMonthDays = Array.from({ length: endDay }, (_, i) => ({
    date: new Date(currentYear.value, currentMonth.value + 1, i + 1),
    currentMonth: false,
  }));

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
});

// Методы выбора и навигации
const isToday = (date: Date | null) => {
  if (!date) return false;
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const isSelected = (date: Date | null) => {
  if (!date || !currentDate.value) return false;
  return (
    date.getDate() === currentDate.value.getDate() &&
    date.getMonth() === currentDate.value.getMonth() &&
    date.getFullYear() === currentDate.value.getFullYear()
  );
};

const selectDate = (date: Date | null) => {
  if (
    date &&
    (!props.disablePast ||
      date >= new Date(today.getFullYear(), today.getMonth(), today.getDate()))
  ) {
    currentDate.value = date;
    inputDate.value = date.toLocaleDateString("ru-RU");
    emit("update:modelValue", inputDate.value); // Передача выбранной даты
    showCalendar.value = false; // Закрытие календаря
  }
};

const clearDate = () => {
  currentDate.value = null;
  inputDate.value = "";
  showCalendar.value = false;
};

const confirmDate = () => {
  if (currentDate.value) {
    inputDate.value = currentDate.value.toLocaleDateString("ru-RU");
    emit("update:modelValue", inputDate.value); // Передача выбранной даты
  }
  showCalendar.value = false;
};

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value -= 1;
  } else {
    currentMonth.value -= 1;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
  } else {
    currentMonth.value += 1;
  }
};

// Закрытие календаря при клике вне его
const handleClickOutside = (event: MouseEvent) => {
  if (
    calendarWrapper.value &&
    !calendarWrapper.value.contains(event.target as Node)
  ) {
    showCalendar.value = false;
  }
};

// Подписка и отписка от событий
onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>

<style scoped lang="scss">
.custom_calendar__w {
  position: relative;
}

.date-input {
  @include app;
  width: 100%;
  border-bottom: 0.1rem solid $blue;
  height: 4.8rem;
  padding: 1.6rem;
  font-size: 1.8rem;
  &::-webkit-input-placeholder {
    color: $black;
  }
}

.custom-calendar {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  // padding: 16px;
}

.current-date {
  padding: 1.6rem 2.4rem 1.6rem 2.4rem;
  font-size: 3.2rem;
  border-bottom: 0.1rem solid #a2d0ff33;
}

.header {
  @include flex-space;
  padding: 0.4rem 1.2rem 0.4rem 2.4rem;
}

.month-year {
  span {
    font-size: 1.4rem;
    color: $blue;
    font-family: $font_3;
  }

  select {
    border: none;
    font-size: 1.4rem;
    color: $blue;
    font-family: $font_3;
    max-height: 20rem;
  }
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 8px;
  padding: 0.4rem 2.4rem;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  padding: 0.4rem 2.4rem;
}

.day {
  @include flex-center;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 100%;
}

.day.is-selected {
  background-color: #007bff;
  color: white;
}

.day.is-disabled {
  color: #ccc; /* Цвет для неактивных дней */
  pointer-events: none; /* Отключает выбор */
}

.nav {
  @include flex-space;

  & > div {
    width: 4.8rem;
    height: 4.8rem;
    @include flex-center;
    cursor: pointer;
  }
}

.actions {
  @include flex-center;
  padding: 2.4rem;
}
</style>
