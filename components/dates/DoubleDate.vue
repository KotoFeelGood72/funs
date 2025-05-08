<template>
  <div class="date-picker" ref="pickerRef">
    <!-- ───────── Инпуты ───────── -->
    <div class="inputs">
      <div class="input-group" @click="toggleCalendar">
        <input readonly :value="displayRangeStart" placeholder="Туда" />
        <button v-if="rangeStart" class="clear-btn" @click.stop="clearStart">×</button>
      </div>
      <div class="input-group" @click="toggleCalendar">
        <input readonly :value="displayRangeEnd" placeholder="Обратно" />
        <button v-if="rangeEnd" class="clear-btn" @click.stop="clearEnd">×</button>
      </div>
    </div>

    <!-- ───────── Два календаря ───────── -->
    <div v-if="showCalendar" class="double-calendar">
      <!-- Левый -->
      <div class="calendar">
        <div class="calendar__header">
          <button class="nav-btn" @click="prevMonth">&lt;</button>
          <div class="month-selector" @click="openLeft = !openLeft">
            {{ months[currentMonth] }} {{ currentYear }}
            <span class="chevron">▾</span>
            <ul v-if="openLeft" class="month-list">
              <!-- Текущий год -->
              <li class="year-label">{{ currentYear }}</li>
              <!-- Месяцы текущего года -->
              <li
                v-for="(m, idx) in months"
                :key="`l-${currentYear}-${idx}`"
                @click.stop="selectMonth(idx, currentYear)"
                :class="{ active: currentYear === selYear && idx === currentMonth }"
              >
                {{ m }}
              </li>

              <!-- Следующий год -->
              <li class="year-label">{{ currentYear + 1 }}</li>
              <!-- Месяцы следующего года -->
              <li
                v-for="(m, idx) in months"
                :key="`l-${currentYear + 1}-${idx}`"
                @click.stop="selectMonth(idx, currentYear + 1)"
                :class="{ active: currentYear + 1 === selYear && idx === currentMonth }"
              >
                {{ m }}
              </li>
            </ul>
          </div>
        </div>
        <div class="calendar__weekdays">
          <span v-for="d in weekdays" :key="'l-w-' + d">{{ d }}</span>
        </div>
        <div class="calendar__days" @mouseleave="resetHover">
          <span v-for="blank in blankDays" :key="'l-b-' + blank" class="day blank"></span>
          <span
            v-for="day in daysInMonth"
            :key="'l-d-' + day"
            class="day"
            :class="dayClasses(currentYear, currentMonth, day)"
            @click="selectDay(currentYear, currentMonth, day)"
            @mouseenter="onHover(currentYear, currentMonth, day)"
            >{{ day }}</span
          >
        </div>
      </div>

      <!-- Правый -->
      <div class="calendar">
        <div class="calendar__header">
          <div class="month-selector" @click="openRight = !openRight">
            {{ months[nextMonthIndex] }} {{ nextYear }}
            <span class="chevron">▾</span>
            <ul v-if="openRight" class="month-list">
              <!-- Текущий год для правого -->
              <li class="year-label">{{ nextYear }}</li>
              <li
                v-for="(m, idx) in months"
                :key="`r-${nextYear}-${idx}`"
                @click.stop="selectMonth(idx, nextYear)"
                :class="{ active: nextYear === selYear && idx === nextMonthIndex }"
              >
                {{ m }}
              </li>

              <!-- Следующий год -->
              <li class="year-label">{{ nextYear + 1 }}</li>
              <li
                v-for="(m, idx) in months"
                :key="`r-${nextYear + 1}-${idx}`"
                @click.stop="selectMonth(idx, nextYear + 1)"
                :class="{ active: nextYear + 1 === selYear && idx === nextMonthIndex }"
              >
                {{ m }}
              </li>
            </ul>
          </div>
          <button class="nav-btn" @click="nextMonth">&gt;</button>
        </div>
        <div class="calendar__weekdays">
          <span v-for="d in weekdays" :key="'r-w-' + d">{{ d }}</span>
        </div>
        <div class="calendar__days" @mouseleave="resetHover">
          <span
            v-for="blank in blankDaysNext"
            :key="'r-b-' + blank"
            class="day blank"
          ></span>
          <span
            v-for="day in daysInMonthNext"
            :key="'r-d-' + day"
            class="day"
            :class="dayClasses(nextYear, nextMonthIndex, day)"
            @click="selectDay(nextYear, nextMonthIndex, day)"
            @mouseenter="onHover(nextYear, nextMonthIndex, day)"
            >{{ day }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";

// Локализация
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

// Состояние
const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());
const selYear = computed(() => currentYear.value); // для подсветки active в списках

const showCalendar = ref(false);
function toggleCalendar() {
  showCalendar.value = !showCalendar.value;
}

// Клик вне
const pickerRef = ref(null);
function handleClickOutside(e) {
  if (pickerRef.value && !pickerRef.value.contains(e.target)) {
    showCalendar.value = false;
  }
}
onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() => document.removeEventListener("click", handleClickOutside));

// Дропдауны
const openLeft = ref(false);
const openRight = ref(false);

// Диапазон
const rangeStart = ref(null);
const rangeEnd = ref(null);
const hoverDate = ref(null);
function onHover(y, m, d) {
  if (rangeStart.value && !rangeEnd.value) {
    hoverDate.value = new Date(y, m, d);
  }
}
function resetHover() {
  hoverDate.value = null;
}

// Навигация
function prevMonth() {
  if (currentMonth.value > 0) currentMonth.value--;
  else {
    currentMonth.value = 11;
    currentYear.value--;
  }
}
function nextMonth() {
  if (currentMonth.value < 11) currentMonth.value++;
  else {
    currentMonth.value = 0;
    currentYear.value++;
  }
}

// Правый
const nextMonthIndex = computed(() => (currentMonth.value + 1) % 12);
const nextYear = computed(() =>
  currentMonth.value === 11 ? currentYear.value + 1 : currentYear.value
);

// Дни
function makeDays(y, m) {
  return Array.from({ length: new Date(y, m + 1, 0).getDate() }, (_, i) => i + 1);
}
function makeBlank(y, m) {
  return (new Date(y, m, 1).getDay() + 6) % 7;
}

const daysInMonth = computed(() => makeDays(currentYear.value, currentMonth.value));
const blankDays = computed(() => makeBlank(currentYear.value, currentMonth.value));
const daysInMonthNext = computed(() => makeDays(nextYear.value, nextMonthIndex.value));
const blankDaysNext = computed(() => makeBlank(nextYear.value, nextMonthIndex.value));

// Выбор месяца из дропдауна (idx, год)
function selectMonth(idx, year) {
  currentMonth.value = idx;
  currentYear.value = year;
  openLeft.value = openRight.value = false;
}

// Выбор дат
function selectDay(y, m, d) {
  const c = new Date(y, m, d);
  if (!rangeStart.value || (rangeStart.value && rangeEnd.value)) {
    rangeStart.value = c;
    rangeEnd.value = null;
  } else if (c < rangeStart.value) {
    rangeStart.value = c;
  } else {
    rangeEnd.value = c;
    showCalendar.value = false;
  }
}

// Классы ячеек
function isSame(dt, y, m, d) {
  return dt?.getFullYear() === y && dt?.getMonth() === m && dt?.getDate() === d;
}
function dayClasses(y, m, d) {
  const cls = {
    "selected-start": isSame(rangeStart.value, y, m, d),
    "selected-end": isSame(rangeEnd.value, y, m, d),
  };
  const end = rangeEnd.value || hoverDate.value;
  if (rangeStart.value && end) {
    const t = new Date(y, m, d).getTime(),
      a = rangeStart.value.getTime(),
      b = end.getTime();
    if ((t > a && t < b) || (t < b && t > a)) cls["in-range"] = true;
  }
  return cls;
}

// Инпуты
const displayRangeStart = computed(() => {
  if (!rangeStart.value) return "";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    weekday: "short",
  }).format(rangeStart.value);
});
const displayRangeEnd = computed(() => {
  if (!rangeEnd.value) return "";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    weekday: "short",
  }).format(rangeEnd.value);
});

// Эмиты ISO
const dateForwardIso = computed(() =>
  rangeStart.value ? rangeStart.value.toISOString().slice(0, 10) : ""
);
const dateBackwardIso = computed(() =>
  rangeEnd.value ? rangeEnd.value.toISOString().slice(0, 10) : ""
);
const emit = defineEmits(["update:date_forward", "update:date_backward"]);
watch(dateForwardIso, (val) => emit("update:date_forward", val));
watch(dateBackwardIso, (val) => emit("update:date_backward", val));

// Очистка
function clearStart() {
  rangeStart.value = null;
  rangeEnd.value = null;
}
function clearEnd() {
  rangeEnd.value = null;
}
</script>

<style scoped>
.date-picker {
  display: inline-block;
}
.inputs {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}
.input-group {
  position: relative;
  flex: 1;
}
.input-group input {
  width: 100%;
  padding: 6px 28px 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95em;
  background: #fff;
  cursor: pointer;
}
.clear-btn {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  font-size: 1.1em;
  line-height: 1;
  cursor: pointer;
}
.double-calendar {
  position: absolute;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  display: flex;
  gap: 16px;
  margin-top: 4px;
}
.calendar {
  width: 280px;
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 6px;
  user-select: none;
}
.calendar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.nav-btn {
  background: none;
  border: none;
  font-size: 1.1em;
  cursor: pointer;
}
.month-selector {
  position: relative;
  cursor: pointer;
  font-weight: bold;
}
.month-selector .chevron {
  margin-left: 4px;
  font-size: 0.8em;
}
.month-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: max-content;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ccc;
  margin-top: 4px;
  padding: 0;
  list-style: none;
  z-index: 10;
}
.month-list li {
  padding: 4px 8px;
  cursor: pointer;
}
.month-list li.active {
  background: #f0f0f0;
}
.month-list li.year-label {
  color: #999;
  cursor: default;
  pointer-events: none;
}
.calendar__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 0.85em;
  color: #666;
  margin-bottom: 4px;
}
.calendar__days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  gap: 2px;
}
.day {
  padding: 6px 2px;
  cursor: pointer;
  border-radius: 4px;
}
.day.blank {
  visibility: hidden;
  cursor: default;
}
.day:hover {
  background: #eef;
}
.day.in-range {
  background: #cbe8ff;
}
.day.selected-start {
  background: #339af0;
  color: #fff;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
}
.day.selected-end {
  background: #339af0;
  color: #fff;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
}
</style>
