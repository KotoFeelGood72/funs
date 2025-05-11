<template>
  <div class="date-picker" ref="pickerRef">
    <div class="inputs">
      <div class="input-group" @click="openCalendar">
        <input
          readonly
          :value="displayStart"
          :placeholder="placeStart ? placeStart : 'Дата начала'"
        />
        <button v-if="start" class="clear-btn" @click.stop="clearStart">
          <Icon name="material-symbols:close" />
        </button>
      </div>
      <div class="input-group" @click="openCalendar">
        <input
          readonly
          :value="displayEnd"
          :placeholder="placeEnd ? placeEnd : 'Дата окончания'"
        />
        <button v-if="end" class="clear-btn" @click.stop="clearEnd">
          <Icon name="material-symbols:close" />
        </button>
      </div>
    </div>

    <div v-if="showCalendar" class="double-calendar">
      <!-- Левый календарь -->
      <div class="calendar">
        <div class="calendar__header">
          <button class="nav-btn" :disabled="!canPrevMonth" @click="prevMonth">
            <Icon name="material-symbols-light:chevron-left" :size="24" />
          </button>
          <div class="month-selector" @click.stop="openLeft = !openLeft">
            <p>{{ months[currentMonth] }} {{ currentYear }}</p>
            <span class="chevron"
              ><Icon name="flowbite:chevron-sort-outline" :size="20"
            /></span>
            <ul v-if="openLeft" class="month-list">
              <template v-for="year in yearOptions" :key="year">
                <li class="year-label">{{ year }}</li>
                <li
                  v-for="(m, idx) in months"
                  :key="`l-${year}-${idx}`"
                  :class="{
                    active: currentYear === year && currentMonth === idx,
                  }"
                  @click.stop="selectMonth(idx, year)"
                >
                  {{ m }}
                </li>
              </template>
            </ul>
          </div>
        </div>

        <div class="calendar__weekdays">
          <span v-for="d in weekdays" :key="d">{{ d }}</span>
        </div>

        <div class="calendar__days" @mouseleave="resetHover">
          <span v-for="blank in blankDays" :key="'b' + blank" class="day blank"></span>
          <span
            v-for="day in daysInMonth"
            :key="day"
            class="day"
            :class="[
              dayClasses(currentYear, currentMonth, day),
              { disabled: isDisabledDay(currentYear, currentMonth, day) },
            ]"
            @click="
              !isDisabledDay(currentYear, currentMonth, day) &&
                selectDay(currentYear, currentMonth, day)
            "
            @mouseenter="
              !isDisabledDay(currentYear, currentMonth, day) &&
                onHover(currentYear, currentMonth, day)
            "
          >
            {{ day }}
          </span>
        </div>
      </div>

      <!-- Правый календарь -->
      <div class="calendar">
        <div class="calendar__header">
          <div class="month-selector" @click.stop="openRight = !openRight">
            <p>{{ months[nextMonthIndex] }} {{ nextYear }}</p>
            <span class="chevron"
              ><Icon name="flowbite:chevron-sort-outline" :size="20"
            /></span>
            <ul v-if="openRight" class="month-list">
              <template v-for="year in yearOptions" :key="year">
                <li class="year-label">{{ year }}</li>
                <li
                  v-for="(m, idx) in months"
                  :key="`r-${year}-${idx}`"
                  :class="{
                    active: nextYear === year && nextMonthIndex === idx,
                  }"
                  @click.stop="selectMonth(idx, year)"
                >
                  {{ m }}
                </li>
              </template>
            </ul>
          </div>
          <button class="nav-btn" :disabled="!canNextMonth" @click="nextMonth">
            <Icon name="material-symbols-light:chevron-right" :size="24" />
          </button>
        </div>

        <div class="calendar__weekdays">
          <span v-for="d in weekdays" :key="d + 'r'">{{ d }}</span>
        </div>

        <div class="calendar__days" @mouseleave="resetHover">
          <span
            v-for="blank in blankDaysNext"
            :key="'bn' + blank"
            class="day blank"
          ></span>
          <span
            v-for="d in daysInNextMonth"
            :key="'dn' + d"
            class="day"
            :class="[
              dayClasses(nextYear, nextMonthIndex, d),
              { disabled: isDisabledDay(nextYear, nextMonthIndex, d) },
            ]"
            @click="
              !isDisabledDay(nextYear, nextMonthIndex, d) &&
                selectDay(nextYear, nextMonthIndex, d)
            "
            @mouseenter="
              !isDisabledDay(nextYear, nextMonthIndex, d) &&
                onHover(nextYear, nextMonthIndex, d)
            "
          >
            {{ d }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDateRange } from "@/composables/useDateRange";

const props = defineProps<{
  start: string | null;
  end: string | null;
  placeStart?: string;
  placeEnd?: string;
}>();
const emit = defineEmits<{
  (e: "update:start", v: string | null): void;
  (e: "update:end", v: string | null): void;
}>();

const {
  pickerRef,
  showCalendar,
  openLeft,
  openRight,
  displayStart,
  displayEnd,
  isDisabledDay,
  startDate: start,
  endDate: end,
  prevMonth,
  nextMonth,
  canPrevMonth,
  canNextMonth,
  toggleCalendar,
  currentMonth,
  currentYear,
  nextMonthIndex,
  nextYear,
  daysInMonth,
  blankDays,
  daysInNextMonth,
  blankDaysNext,
  selectDay,
  onHover,
  resetHover,
  dayClasses,
  clearStart,
  clearEnd,
  selectMonth,
} = useDateRange(props, emit);

const months = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Май",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
];
const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
// диапазон годов: текущий и следующий
const thisYear = new Date().getFullYear();
const yearOptions = [thisYear, thisYear + 1];

const openCalendar = () => {
  if (!showCalendar.value) {
    toggleCalendar(); // открываем только если закрыто
  }
};
</script>

<style scoped lang="scss">
.date-picker {
}
.inputs {
  @include flex-start;
  gap: 1rem;
}
.input-group {
  position: relative;
  flex-grow: 1;
}
.input-group input {
  @include app;
  border: 0.1rem solid $light-blue;
  padding: 1.2rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  height: 4.6rem;
  font-size: 1.8rem;
}
.clear-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.6rem;
  @include flex-center;
  cursor: pointer;
  &:hover {
    color: red;
  }
}
.double-calendar {
  position: absolute;
  background-color: $white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  z-index: 100;
  @include flex-start;
  align-items: flex-start;
  gap: 2rem;
}
.calendar {
  width: 32rem;
  user-select: none;
}
.calendar__header {
  @include flex-space;
  margin-bottom: 2rem;
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
  font-family: $font_3;
  font-size: 2rem;
  @include flex-start;
  gap: 0.5rem;
}
.month-selector .chevron {
  @include flex-center;
  margin-top: -0.5rem;
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
  span {
    @include flex-center;
    font-family: $font_2;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 1.4rem;
    color: $light-blue;
  }
}
.calendar__days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  gap: 0.6rem;
}
.day {
  @include flex-center;
  font-size: 1.6rem;
  font-family: $font_2;
  padding: 1rem;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
  line-height: 0;
}
.day.blank {
  visibility: hidden;
  cursor: default;
}
.day:hover:not(.selected-end, .selected-start) {
  background: #eef;
}
.day.in-range {
  background: #cbe8ff;
}
.day.selected-start {
  background-color: $blue;
  color: $white !important;
  @include flex-center;
}
.day.selected-end {
  background-color: $blue;
  color: $white !important;
  @include flex-center;
}

.day.disabled {
  color: #ccc;
  cursor: not-allowed;
}

.nav-btn {
  background-color: #5fd2f864;
  @include flex-center;
  color: $blue;
  width: 4.5rem;
  height: 3.5rem;
  border-radius: 0.4rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: $light;
  }
}

input {
  width: 100%;
}
</style>
