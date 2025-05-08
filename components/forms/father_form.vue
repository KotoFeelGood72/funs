<template>
  <div class="parents-info">
    <div class="parents-info__header">Сведения о ваших отце и матери:</div>
    <div class="parents-info__columns">
      <!-- Колонка ОТЕЦ -->
      <div class="parents-info__col">
        <div class="parents-info__title">Отец</div>

        <Inputs v-model="localFather.name" label="Имя" placeholder="Введите имя" />

        <Inputs
          v-model="localFather.residenceCountry"
          label="Страна проживания"
          placeholder="Введите название страны"
        />

        <Inputs
          v-model="localFather.previousCitizenship"
          label="Предыдущее гражданство, если менялось"
          placeholder="Введите гражданство"
        />

        <Inputs
          v-model="localFather.birthCountry"
          label="Страна рождения"
          placeholder="Введите название страны"
        />

        <Inputs
          v-model="localFather.birthPlace"
          label="Место рождения"
          placeholder="Введите место рождения"
        />

        <Inputs
          v-model="localFather.currentCitizenship"
          label="Текущее гражданство"
          placeholder="Введите гражданство"
        />
      </div>

      <!-- Колонка МАТЬ -->
      <div class="parents-info__col">
        <div class="parents-info__title">Мать</div>

        <Inputs v-model="localMother.name" label="Имя" placeholder="Введите имя" />

        <Inputs
          v-model="localMother.residenceCountry"
          label="Страна проживания"
          placeholder="Введите название региона"
        />

        <Inputs
          v-model="localMother.previousCitizenship"
          label="Предыдущее гражданство, если менялось"
          placeholder="Введите гражданство"
        />

        <Inputs
          v-model="localMother.birthCountry"
          label="Страна рождения"
          placeholder="Введите название страны"
        />

        <Inputs
          v-model="localMother.birthPlace"
          label="Место рождения"
          placeholder="Введите место рождения"
        />

        <Inputs
          v-model="localMother.currentCitizenship"
          label="Текущее гражданство"
          placeholder="Введите гражданство"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Inputs from "../ui/inputs/Inputs.vue";

interface ParentInfo {
  name: string;
  residenceCountry: string;
  previousCitizenship: string;
  birthCountry: string;
  birthPlace: string;
  currentCitizenship: string;
}

// Принимаем сразу два объекта: father и mother
const props = defineProps<{
  father: ParentInfo;
  mother: ParentInfo;
}>();

const emit = defineEmits<{
  (e: "update:father", val: ParentInfo): void;
  (e: "update:mother", val: ParentInfo): void;
}>();

// Прокси-компьютеды для каждого из объектов,
// чтобы v-model работал «сверху» автоматически
const localFather = computed<ParentInfo>({
  get: () => props.father,
  set: (val) => emit("update:father", val),
});

const localMother = computed<ParentInfo>({
  get: () => props.mother,
  set: (val) => emit("update:mother", val),
});
</script>

<style scoped lang="scss">
.parents-info {
  &__header {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  &__columns {
    display: flex;
    gap: 2rem;
  }

  &__col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__title {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
}
</style>
