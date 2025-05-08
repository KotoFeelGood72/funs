<template>
  <div class="visit-history__w">
    <div class="visit-history">
      <div
        v-for="(rec, idx) in localRecords"
        :key="rec.country"
        class="visit-history__item"
      >
        <!-- Вопрос Да/Нет -->
        <div class="visit-history__question">
          <span class="visit-history__country">{{ rec.country }}?</span>

          <!-- Toggle switch -->
          <label class="switch">
            <input type="checkbox" v-model="rec.visited" />
            <span class="slider"></span>
          </label>
          <!-- <span class="switch-label">{{ rec.visited ? "Да" : "Нет" }}</span> -->
        </div>

        <!-- Форма, если ответ «Да» -->
        <div v-if="rec.visited" class="visit-history__form">
          <div class="visit-history__field">
            <Select
              v-model="rec.lastYear"
              :options="yearOptions"
              label="Год последнего посещения"
              placeholder="Выберите год"
            />
          </div>
          <div class="visit-history__field">
            <Inputs
              v-model="rec.totalVisits"
              label="Сколько всего визитов вы совершили?"
              placeholder="Введите количество"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import Inputs from "../ui/inputs/Inputs.vue";
import Select from "../ui/inputs/Select.vue";

interface VisitRecord {
  country: string;
  visited: boolean;
  lastYear: string;
  totalVisits: string;
}

interface Option {
  name: string;
  value: any;
}

// Props & Emits
const props = defineProps<{
  countries: string[];
  modelValue?: VisitRecord[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: VisitRecord[]): void;
}>();

// Локальная копия записей визитов
const localRecords = ref<VisitRecord[]>(
  props.modelValue && props.modelValue.length
    ? props.modelValue
    : props.countries.map((country) => ({
        country,
        visited: false,
        lastYear: "",
        totalVisits: "",
      }))
);

// Синхронизация при изменении пропсов
watch(
  () => props.modelValue,
  (val) => {
    if (val && val.length) localRecords.value = val;
  }
);

watch(
  () => props.countries,
  (countries) => {
    localRecords.value = countries.map((country) => {
      const exist = localRecords.value.find((r) => r.country === country);
      return (
        exist || {
          country,
          visited: false,
          lastYear: "",
          totalVisits: "",
        }
      );
    });
  }
);

// Эмитим при любых изменениях
watch(localRecords, (val) => emit("update:modelValue", val), {
  deep: true,
});

// Генерим список годов (текущий и три предыдущих)
const currentYear = new Date().getFullYear();
const yearOptions = computed<Option[]>(() =>
  Array.from({ length: 4 }, (_, i) => {
    const y = (currentYear - i).toString();
    return { name: y, value: y };
  })
);
</script>

<style scoped lang="scss">
.visit-history {
  @include flex-space;
  gap: 2rem;
  flex-wrap: wrap;
  & > div {
    flex: 1 1 30%;
    flex-grow: 1;
  }
}

.visit-history__item {
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  border-radius: 1rem;

  .visit-history__question {
    @include flex-start;
    gap: 2rem;
    font-size: 1.6rem;
  }
}

/* Стили для switch */
.switch {
  position: relative;
  width: 4rem;
  height: 2rem;
  cursor: pointer;

  input {
    display: none;
  }

  .slider {
    position: absolute;
    inset: 0;
    background-color: #ccc;
    border-radius: 1rem;
    transition: 0.2s;

    &::before {
      content: "";
      position: absolute;
      left: 0.2rem;
      bottom: 0.2rem;
      width: 1.6rem;
      height: 1.6rem;
      background: #fff;
      border-radius: 50%;
      transition: 0.2s;
    }
  }

  input:checked + .slider {
    background-color: $blue;
  }

  input:checked + .slider::before {
    transform: translateX(2rem);
  }
}

.visit-history__form {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  grid-gap: 1rem;
}
</style>
