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
    <div
      v-if="showCalendar"
      class="custom-calendar"
      @mousedown.stop
    >
      <!-- Текущая дата -->
      <div class="current-date">
        {{ formattedToday }}
      </div>

      <!-- Месяц и год -->
      <div class="header">
        <button @click="prevMonth" class="nav-button">‹</button>
        <div class="month-year">
          <span>{{ months[currentMonth] }}</span>
          <select v-model="currentYear" class="year-select">
            <option v-for="year in yearsRange" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        <button @click="nextMonth" class="nav-button">›</button>
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
              'is-today': isToday(day),
              'is-selected': isSelected(day),
              'is-disabled': !day,
            },
          ]"
          @click="selectDate(day)"
        >
          {{ day?.getDate() || "" }}
        </div>
      </div>

      <!-- Кнопки управления -->
      <div class="actions">
        <button @click="clearDate" class="clear-button">Очистить</button>
        <button @click="confirmDate" class="confirm-button">Готово</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";

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
  return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
});

const formattedToday = computed(() =>
  today.toLocaleDateString("ru-RU", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
);

// Генерация дней для текущего месяца
const days = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
  const daysInMonth = lastDay.getDate();

  const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  const totalCells = Math.ceil((daysInMonth + startDay) / 7) * 7;

  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const daysArray = Array(totalCells)
    .fill(null)
    .map((_, index) => {
      const day = index - startDay + 1;
      const date =
        day > 0 && day <= daysInMonth
          ? new Date(currentYear.value, currentMonth.value, day)
          : null;

      if (props.disablePast && date && date < todayStart) {
        return null;
      }

      return date;
    });

  return daysArray;
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
  if (date && (!props.disablePast || date >= new Date(today.getFullYear(), today.getMonth(), today.getDate()))) {
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
  border-bottom: .1rem solid $blue;
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
  padding: 16px;
}

.current-date {
  font-size: 1rem;
  text-align: center;
  margin-bottom: 8px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 8px;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.day {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
}

.day.is-selected {
  background-color: #007bff;
  color: white;
}
</style>