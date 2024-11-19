<template>
  <div class="custom-calendar">
    <!-- Поле ввода -->
    <div class="inputs">
      <input
        type="text"
        class="date-input"
        :value="formattedDateRange"
        readonly
        placeholder="Выберите даты"
        @click="toggleCalendar"
      />
    </div>

    <!-- Календарь -->
    <div v-if="isCalendarOpen" class="calendar-container">
      <div class="calendar" v-for="index in 2" :key="index">
        <div class="calendar-header">
          <button
            @click="prevMonth(index)"
            :disabled="index === 1 && isPrevDisabled"
          >
            ‹
          </button>
          <span>
            {{ months[currentMonth(index)] }} {{ currentYear(index) }}
          </span>
          <button @click="nextMonth(index)">›</button>
        </div>

        <!-- Дни недели -->
        <div class="calendar-grid calendar-days">
          <div v-for="day in days" :key="day" class="day-name">
            {{ day }}
          </div>
        </div>

        <!-- Дни месяца -->
        <div class="calendar-grid">
          <div
            v-for="(date, dateIndex) in dates(
              currentYear(index),
              currentMonth(index)
            )"
            :key="dateIndex"
            class="calendar-date"
            :class="{
              today: isToday(date),
              selected: isSelected(date),
              range: isInRange(date),
              'range-hover': isInHoverRange(date),
              disabled: isDisabledDate(date),
            }"
            @click="!isDisabledDate(date) && selectDate(date)"
            @mouseover="hoverDate(date)"
            @mouseleave="clearHover()"
          >
            {{ date.getDate() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Пропсы
const props = defineProps<{
  modelValueFrom: Date | null; // Дата "от"
  modelValueTo: Date | null; // Дата "до"
}>();

// Эмиссия событий
const emit = defineEmits(["update:modelValueFrom", "update:modelValueTo"]);

// Локальное состояние
const isCalendarOpen = ref(false);
const selectedFromDate = ref<Date | null>(props.modelValueFrom || null); // Начальная дата
const selectedToDate = ref<Date | null>(props.modelValueTo || null); // Конечная дата
const hoveredDate = ref<Date | null>(null); // Наведённая дата
const currentBaseMonth = ref(new Date().getMonth());
const currentBaseYear = ref(new Date().getFullYear());

// Минимальная дата (сегодня)
const today = new Date();
today.setHours(0, 0, 0, 0);

// Дни недели и месяцы
const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
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

// Форматирование диапазона дат
const formattedDateRange = computed(() => {
  if (selectedFromDate.value && selectedToDate.value) {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
    };
    const from = selectedFromDate.value.toLocaleDateString("ru-RU", options);
    const to = selectedToDate.value.toLocaleDateString("ru-RU", {
      ...options,
      year: "numeric",
    });
    return `${from} — ${to}`;
  }
  return "Выберите даты";
});

// Управление открытием/закрытием календаря
const toggleCalendar = () => {
  isCalendarOpen.value = !isCalendarOpen.value;
};

// Проверка, можно ли переключаться назад
const isPrevDisabled = computed(() => {
  const minYear = today.getFullYear();
  const minMonth = today.getMonth();
  return (
    currentBaseYear.value < minYear ||
    (currentBaseYear.value === minYear && currentBaseMonth.value <= minMonth)
  );
});

// Даты для календаря
function dates(year: number, month: number) {
  const datesArray: Date[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Добавляем дни перед началом месяца
  const startOffset = (firstDay.getDay() || 7) - 1;
  for (let i = 0; i < startOffset; i++) {
    datesArray.push(
      new Date(firstDay.getTime() - (startOffset - i) * 24 * 60 * 60 * 1000)
    );
  }

  // Добавляем дни месяца
  for (let day = 1; day <= lastDay.getDate(); day++) {
    datesArray.push(new Date(year, month, day));
  }

  // Добавляем дни после конца месяца
  const endOffset = 42 - datesArray.length;
  for (let i = 1; i <= endOffset; i++) {
    datesArray.push(new Date(lastDay.getTime() + i * 24 * 60 * 60 * 1000));
  }

  return datesArray;
}

// Выбор даты
const selectDate = (date: Date) => {
  if (
    !selectedFromDate.value ||
    (selectedFromDate.value && selectedToDate.value)
  ) {
    selectedFromDate.value = date;
    selectedToDate.value = null;

    // Эмитим "от"
    emit("update:modelValueFrom", date);
    emit("update:modelValueTo", null);
  } else if (selectedFromDate.value && !selectedToDate.value) {
    if (date > selectedFromDate.value) {
      selectedToDate.value = date;

      // Эмитим "до"
      emit("update:modelValueTo", date);
      isCalendarOpen.value = false; // Закрыть календарь
    } else {
      selectedFromDate.value = date; // Обновить "от", если выбрана более ранняя дата
      emit("update:modelValueFrom", date);
    }
  }
};

// Переключение месяца
const nextMonth = (index: number) => {
  if (index === 1) {
    if (currentBaseMonth.value === 11) {
      currentBaseMonth.value = 0;
      currentBaseYear.value++;
    } else {
      currentBaseMonth.value++;
    }
  }
};

const prevMonth = (index: number) => {
  if (index === 1) {
    if (!isPrevDisabled.value) {
      if (currentBaseMonth.value === 0) {
        currentBaseMonth.value = 11;
        currentBaseYear.value--;
      } else {
        currentBaseMonth.value--;
      }
    }
  }
};

// Вычисление года и месяца для второго календаря
const currentYear = (index: number) =>
  currentBaseYear.value + Math.floor((currentBaseMonth.value + index - 1) / 12);
const currentMonth = (index: number) =>
  (currentBaseMonth.value + index - 1) % 12;

// Проверка на недоступную дату
const isDisabledDate = (date: Date) => date < today;

// Проверка на сегодняшнюю дату
const isToday = (date: Date) => date.getTime() === today.getTime();

// Проверка на выбранную дату
const isSelected = (date: Date) => {
  return (
    (selectedFromDate.value &&
      date.getTime() === selectedFromDate.value.getTime()) ||
    (selectedToDate.value && date.getTime() === selectedToDate.value.getTime())
  );
};

// Проверка на диапазон
const isInRange = (date: Date) => {
  if (selectedFromDate.value && selectedToDate.value) {
    return date > selectedFromDate.value && date < selectedToDate.value;
  }
  return false;
};

// Проверка на диапазон при наведении
const isInHoverRange = (date: Date) => {
  if (!hoveredDate.value || !selectedFromDate.value) return false;
  return date > selectedFromDate.value && date <= hoveredDate.value;
};

// Установка наведённой даты
const hoverDate = (date: Date) => {
  hoveredDate.value = date;
};

// Сброс наведённой даты
const clearHover = () => {
  hoveredDate.value = null;
};
</script>

<style scoped lang="scss">
.custom-calendar {
  position: relative;
  display: inline-block;
  font-family: Arial, sans-serif;

  .inputs {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .date-input {
      padding: 0.8rem 1rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      cursor: pointer;
      background-color: white;
      width: 250px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .toggle-return {
      border: none;
      background: none;
      color: #007bff;
      cursor: pointer;
      font-size: 0.9rem;
      padding: 0;
    }
  }

  .calendar-container {
    display: flex;
    gap: 2rem;
    margin-top: 1rem;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    padding: 1rem;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .calendar {
    width: 280px;

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      font-size: 1rem;
      font-weight: bold;

      button {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: #007bff;

        &:disabled {
          color: #ccc;
          cursor: not-allowed;
        }
      }
    }

    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.5rem;
      text-align: center;
    }

    .day-name {
      font-weight: bold;
      color: #666;
    }

    .calendar-date {
      padding: 0.5rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: #f0f0f0;
      }

      &.today {
        background-color: #e6f7ff;
        font-weight: bold;
      }

      &.selected {
        background-color: #007bff;
        color: white;
      }

      &.range {
        background-color: #d4e9ff;
      }

      &.range-hover {
        background-color: #e0f3ff;
      }

      &.disabled {
        color: #ccc;
        pointer-events: none;
      }
    }
  }
}
</style>
