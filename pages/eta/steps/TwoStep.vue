<template>
  <ContentView :is-loading="false">
    <div class="grid-1">
      <!-- ─── Въезд/выезд и «быстрые» поля ─── -->
      <div class="grid-2">
        <Inputs v-model="form.entryCity" placeholder="Укажите город въезда в Индию" />
        <Inputs
          v-model="form.entryPort"
          placeholder="Например, «Мумбаи круизный терминал», «DEL»"
        />
        <Inputs v-model="form.exitCity" placeholder="Укажите город выезда из Индии" />
        <Inputs v-model="form.exitPort" placeholder="Например, «Гоа Даболим», «GOI»" />
        <Inputs
          v-model="form.shortVisitedPlaces"
          placeholder="Перечислите места посещения"
        />
        <Select
          v-model="form.visitedBefore"
          :options="yesNoOptions"
          placeholder="Посещали ли вы Индию ранее?"
        />
      </div>

      <!-- ─── Последняя поездка в Индию ─── -->
      <AccardionSingle
        v-model="tripOpen"
        title="Заполните эти сведения по вашей последней поездке в Индию:"
      >
        <last_country_form
          v-model:address="trip.address"
          v-model:visaType="trip.visaType"
          v-model:visaCity="trip.visaCity"
          v-model:visitedPlaces="trip.visitedPlaces"
          v-model:visaNumber="trip.visaNumber"
          v-model:visaDate="trip.visaDate"
        />
      </AccardionSingle>

      <!-- ─── Refusal / Control No ─── -->
      <div class="grid-2">
        <Inputs
          v-model="form.controlNo"
          label="Если вы подавали заявку на визу, но получили отказ"
          placeholder="Укажите Control No."
        />
        <Inputs v-model="form.controlDate" placeholder="ДД-ММ-ГГГГ" type="date" />
      </div>

      <!-- ─── Отметки на теле ─── -->
      <Select
        v-model="form.hasMarks"
        :options="yesNoOptions"
        placeholder="Имеете ли вы видимые родимые пятна, шрамы, татуировки…?"
      />
      <Inputs v-model="form.marksDetail" placeholder="Укажите их детально" />

      <!-- ─── Посещенные страны за 10 лет ─── -->
      <Inputs
        v-model="form.countriesLast10Years"
        label="Какие страны вы посещали за последние 10 лет?"
        placeholder="Укажите в свободном порядке"
      />

      <!-- ─── Образование / религия ─── -->
      <div class="grid-2">
        <Select
          v-model="form.highestEducation"
          :options="educationOptions"
          placeholder="Наивысший достигнутый уровень образования"
        />
        <Select
          v-model="form.religion"
          :options="religionOptions"
          placeholder="Религиозные взгляды"
        />
      </div>

      <AccardionSingle is-open title="Посещали ли вы за последние 3 года:">
        <country_form
          :countries="[
            'Пакистан',
            'Мальдивы',
            'Бангладеш',
            'Непал',
            'Бутан',
            'Шри-Ланка',
            'Афганистан',
          ]"
          v-model="visitData"
        />
      </AccardionSingle>

      <!-- ─── Смена фамилии/имени ─── -->
      <AccardionSingle v-model="familyOpen" title="Меняли ли вы свою фамилию…?">
        <family_form
          v-model:previousLastName="oldLastName"
          v-model:previousFirstName="oldFirstName"
        />
      </AccardionSingle>

      <!-- ─── Домашний адрес + телефон ─── -->
      <AccardionSingle v-model="addressOpen" title="Введите свой домашний адрес:">
        <address_form v-model:address="userAddress" v-model:phone="userPhone" />
      </AccardionSingle>

      <!-- ─── Родители ─── -->
      <AccardionSingle v-model="parentsOpen" title="Сведения о ваших отце и матери:">
        <father_form v-model:father="fatherData" v-model:mother="motherData" />
      </AccardionSingle>

      <!-- ─── Работодатель ─── -->
      <div class="grid-2">
        <Inputs
          v-model="form.employment"
          label="Ваша текущая занятость (профессия)"
          placeholder="Введите занятость"
        />
        <Inputs v-model="form.employerName" placeholder="Наименование работодателя" />
        <Inputs v-model="form.employerAddress" placeholder="Адрес работодателя" />
        <CustomSelectPhone v-model="form.employerPhone" label="Телефон работодателя" />
      </div>

      <!-- ─── Адрес в Индии ─── -->
      <AccardionSingle v-model="hotelOpen" title="Адрес в Индии (отель, жильё)">
        <div class="grid-2">
          <Inputs v-model="form.hotelAddress" placeholder="Введите адрес" />
          <CustomSelectPhone v-model="form.hotelPhone" label="Телефон отеля" />
        </div>
      </AccardionSingle>

      <!-- ─── Экстренный контакт ─── -->
      <AccardionSingle
        v-model="emergencyOpen"
        title="Для экстренных случаев: ваш доверенное лицо"
      >
        <div class="grid-3">
          <Inputs v-model="form.emergencyName" placeholder="Введите имя" />
          <Inputs v-model="form.emergencyAddress" placeholder="Введите адрес" />
          <CustomSelectPhone
            v-model="form.emergencyPhone"
            label="Телефон доверенного лица"
          />
        </div>
      </AccardionSingle>
    </div>
  </ContentView>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

import family_form from "~/components/forms/family_form.vue";
import address_form from "~/components/forms/address_form.vue";
import father_form from "~/components/forms/father_form.vue";
import country_form from "~/components/forms/country_form.vue";
import last_country_form from "~/components/forms/last_country_form.vue";
import ContentView from "~/components/shared/ContentView.vue";
import AccardionSingle from "~/components/accardions/AccardionSingle.vue";
import Inputs from "~/components/ui/inputs/Inputs.vue";
import Select from "~/components/ui/inputs/Select.vue";
import CustomSelectPhone from "~/components/ui/inputs/CustomSelectPhone.vue";

// уже существующие рефы/реактивы
const userAddress = ref("");
const userPhone = ref("");

const oldLastName = ref("");
const oldFirstName = ref("");

interface VisitRecord {
  country: string;
  visited: boolean;
  lastYear: string;
  totalVisits: string;
}
const visitData = ref<VisitRecord[]>([]);

const trip = reactive({
  address: "",
  visaType: "",
  visaCity: "",
  visitedPlaces: "",
  visaNumber: "",
  visaDate: "",
});

interface ParentInfo {
  name: string;
  residenceCountry: string;
  previousCitizenship: string;
  birthCountry: string;
  birthPlace: string;
  currentCitizenship: string;
}
const fatherData = ref<ParentInfo>({
  name: "",
  residenceCountry: "",
  previousCitizenship: "",
  birthCountry: "",
  birthPlace: "",
  currentCitizenship: "",
});
const motherData = ref<ParentInfo>({ ...fatherData.value });

// открытые аккордеоны
const tripOpen = ref(true);
const familyOpen = ref(false);
const addressOpen = ref(false);
const parentsOpen = ref(false);
const hotelOpen = ref(false);
const emergencyOpen = ref(false);

// опции для Да/Нет
const yesNoOptions = [
  { name: "Да", value: true },
  { name: "Нет", value: false },
];
// опции образования/религии (пример)
const educationOptions = [
  { name: "Среднее", value: "middle" },
  { name: "Высшее", value: "higher" },
];
const religionOptions = [
  { name: "Христианство", value: "christianity" },
  { name: "Ислам", value: "islam" },
  //…
];

// все остальные поля в одном объекте `form`
const form = reactive({
  entryCity: "",
  entryPort: "",
  exitCity: "",
  exitPort: "",
  shortVisitedPlaces: "",
  visitedBefore: null as boolean | null,

  controlNo: "",
  controlDate: "",

  hasMarks: null as boolean | null,
  marksDetail: "",

  countriesLast10Years: "",
  highestEducation: "",
  religion: "",

  employment: "",
  employerName: "",
  employerAddress: "",
  employerPhone: "",

  hotelAddress: "",
  hotelPhone: "",

  emergencyName: "",
  emergencyAddress: "",
  emergencyPhone: "",
});
</script>

<style scoped lang="scss">
.grid-1 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}
</style>
