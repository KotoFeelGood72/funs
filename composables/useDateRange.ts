// src/composables/useDateRange.ts
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

function parseDate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatDate(d: Date): string {
  const yy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yy}-${mm}-${dd}`;
}

// зафиксируем сегодня в 00:00
const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

export function useDateRange(
  props: { start: string | null; end: string | null },
  emit: {
    (e: 'update:start', v: string | null): void;
    (e: 'update:end',   v: string | null): void;
  }
) {
  // локальный парсинг и формат
  const startDate = computed<Date | null>({
    get: () => (props.start ? parseDate(props.start) : null),
    set: val => {
      if (val) {
        const shifted = new Date(val);
        shifted.setDate(shifted.getDate() + 1);
        emit('update:start', formatDate(shifted));
      } else {
        emit('update:start', null);
      }
    },
  });

  const endDate = computed<Date | null>({
    get: () => (props.end ? parseDate(props.end) : null),
    set: val => {
      if (val) {
        const shifted = new Date(val);
        shifted.setDate(shifted.getDate() + 1);
        emit('update:end', formatDate(shifted));
      } else {
        emit('update:end', null);
      }
    },
  });

  // состояние календаря
  const now           = new Date();
  const currentMonth  = ref(now.getMonth());
  const currentYear   = ref(now.getFullYear());
  const showCalendar  = ref(false);
  const pickerRef     = ref<HTMLElement | null>(null);
  const openLeft      = ref(false);
  const openRight     = ref(false);

  function toggleCalendar() {
    showCalendar.value = !showCalendar.value;
  }
  function handleClickOutside(e: MouseEvent) {
    if (pickerRef.value && !(pickerRef.value as HTMLElement).contains(e.target as Node)) {
      showCalendar.value = false;
      openLeft.value = openRight.value = false;
    }
  }
  onMounted(() => document.addEventListener('click', handleClickOutside));
  onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside));

  // переключение месяцев
  const nextMonthIndex = computed(() => (currentMonth.value + 1) % 12);
  const nextYear       = computed(() =>
    currentMonth.value === 11 ? currentYear.value + 1 : currentYear.value
  );
  // блокировка листания назад/вперед
  const canPrevMonth = computed(
    () =>
      currentYear.value > TODAY.getFullYear() ||
      (currentYear.value === TODAY.getFullYear() && currentMonth.value > TODAY.getMonth())
  );
  const canNextMonth = computed(
    () => currentYear.value < TODAY.getFullYear() + 1
  );

  function prevMonth() {
    if (!canPrevMonth.value) return;
    if (currentMonth.value > 0) currentMonth.value--;
    else {
      currentMonth.value = 11;
      currentYear.value--;
    }
    openLeft.value = openRight.value = false;
  }
  function nextMonth() {
    if (!canNextMonth.value) return;
    if (currentMonth.value < 11) currentMonth.value++;
    else {
      currentMonth.value = 0;
      currentYear.value++;
    }
    openLeft.value = openRight.value = false;
  }
  function selectMonth(m: number, y: number) {
    currentMonth.value = m;
    currentYear.value  = y;
    openLeft.value = openRight.value = false;
  }

  // дни в месяце
  const makeDays  = (y: number, m: number) =>
    Array.from({ length: new Date(y, m + 1, 0).getDate() }, (_, i) => i + 1);
  const makeBlank = (y: number, m: number) =>
    (new Date(y, m, 1).getDay() + 6) % 7;
  const daysInMonth     = computed(() => makeDays(currentYear.value, currentMonth.value));
  const blankDays       = computed(() => makeBlank(currentYear.value, currentMonth.value));
  const daysInNextMonth = computed(() => makeDays(nextYear.value, nextMonthIndex.value));
  const blankDaysNext   = computed(() => makeBlank(nextYear.value, nextMonthIndex.value));

  // выбор и подсветка диапазона
  const hoverDate = ref<Date | null>(null);
  function onHover(y: number, m: number, d: number) {
    if (startDate.value && !endDate.value) hoverDate.value = new Date(y, m, d);
  }
  function resetHover() {
    hoverDate.value = null;
  }
  function selectDay(y: number, m: number, d: number) {
    const picked = new Date(y, m, d);
    if (!startDate.value || (startDate.value && endDate.value)) {
      startDate.value = picked;
      endDate.value   = null;
    } else if (picked < startDate.value) {
      startDate.value = picked;
    } else {
      endDate.value     = picked;
      showCalendar.value = false;
      openLeft.value = openRight.value = false;
    }
  }
  function isSame(dt: Date | null, y: number, m: number, d: number) {
    return dt?.getFullYear() === y && dt?.getMonth() === m && dt?.getDate() === d;
  }
  function dayClasses(y: number, m: number, d: number) {
    const cls: Record<string, boolean> = {
      'selected-start': isSame(startDate.value, y, m, d),
      'selected-end':   isSame(endDate.value,   y, m, d),
    };
    const end = endDate.value || hoverDate.value;
    if (startDate.value && end) {
      const t = new Date(y, m, d).getTime();
      const a = startDate.value.getTime();
      const b = end.getTime();
      if ((t > a && t < b) || (t < a && t > b)) cls['in-range'] = true;
    }
    return cls;
  }

  // блокировка дат
  function isBeforeToday(y: number, m: number, d: number): boolean {
    const dt = new Date(y, m, d);
    dt.setHours(0, 0, 0, 0);
    return dt.getTime() < TODAY.getTime();
  }
  function isDisabledDay(y: number, m: number, d: number): boolean {
    if (isBeforeToday(y, m, d)) return true;
    if (startDate.value && !endDate.value) {
      const picked = new Date(y, m, d);
      picked.setHours(0, 0, 0, 0);
      const start = new Date(startDate.value);
      start.setHours(0, 0, 0, 0);
      return picked.getTime() <= start.getTime();
    }
    return false;
  }

  // форматированные подписи
  const displayStart = computed(() =>
    startDate.value
      ? new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' }).format(startDate.value)
      : ''
  );
  const displayEnd = computed(() =>
    endDate.value
      ? new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' }).format(endDate.value)
      : ''
  );

  function clearStart() {
    startDate.value = null;
    endDate.value   = null;
  }
  function clearEnd() {
    endDate.value = null;
  }

  return {
    pickerRef,
    showCalendar, toggleCalendar,
    openLeft, openRight,
    canPrevMonth, canNextMonth,
    currentMonth, currentYear, nextMonthIndex, nextYear,
    startDate, endDate,
    displayStart, displayEnd,
    prevMonth, nextMonth, selectMonth,
    daysInMonth, blankDays, daysInNextMonth, blankDaysNext,
    selectDay, onHover, resetHover, dayClasses,
    clearStart, clearEnd,
    isDisabledDay,
  };
}
