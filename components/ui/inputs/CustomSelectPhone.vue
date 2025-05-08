<template>
  <div class="phone-input">
    <label for="phone" v-if="label">{{ label }}</label>
    <div class="phone-input-wrapper">
      <!-- Выбор страны -->
      <div class="country-select">
        <select v-model="selectedCountry" @change="onCountryChange">
          <option v-for="country in countries" :key="country.code" :value="country">
            {{ country.flag }} {{ country.code }}
          </option>
        </select>
      </div>

      <!-- Поле ввода с маской, привязанное к v-model -->
      <input
        v-mask="currentMask"
        v-model="localPhone"
        :placeholder="currentMask"
        type="text"
        id="phone"
        class="masked-input"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { mask as vMask } from "vue-the-mask";

interface Country {
  name: string;
  code: string;
  flag: string;
  mask: string;
}

// 1) объявляем props для v-model
const props = defineProps<{
  modelValue: string;
  label?: string;
}>();

// 2) объявляем emit для update:modelValue
const emit = defineEmits<{
  (e: "update:modelValue", val: string): void;
}>();

// 3) список стран (оставили ваш полный список)
const countries = ref<Country[]>([
  // СНГ + Америка + Азия + Европа + другие
  { name: "Russia", code: "+7", flag: "🇷🇺", mask: "+7 (###) ###-##-##" },
  { name: "United States", code: "+1", flag: "🇺🇸", mask: "+1 (###) ###-####" },
  { name: "Canada", code: "+1", flag: "🇨🇦", mask: "+1 (###) ###-####" },
  { name: "Ukraine", code: "+380", flag: "🇺🇦", mask: "+380 (##) ###-##-##" },
  { name: "Kazakhstan", code: "+7", flag: "🇰🇿", mask: "+7 (###) ###-##-##" },

  // недавние
  { name: "India", code: "+91", flag: "🇮🇳", mask: "+91 #####-#####" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦", mask: "+966 ## #######" },
  { name: "UAE (Dubai)", code: "+971", flag: "🇦🇪", mask: "+971 ## ### ####" },
  { name: "Turkey", code: "+90", flag: "🇹🇷", mask: "+90 (###) ###-##-##" },

  // Европа
  { name: "Germany", code: "+49", flag: "🇩🇪", mask: "+49 #### #######" },
  { name: "France", code: "+33", flag: "🇫🇷", mask: "+33 # ## ## ## ##" },
  { name: "Spain", code: "+34", flag: "🇪🇸", mask: "+34 ### ### ###" },
  { name: "Italy", code: "+39", flag: "🇮🇹", mask: "+39 ### ### ###" },
  { name: "Poland", code: "+48", flag: "🇵🇱", mask: "+48 ### ### ###" },
  { name: "Netherlands", code: "+31", flag: "🇳🇱", mask: "+31 ## ### ####" },
  { name: "Sweden", code: "+46", flag: "🇸🇪", mask: "+46 ##-### ### ###" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧", mask: "+44 #### ### ####" },
  { name: "Portugal", code: "+351", flag: "🇵🇹", mask: "+351 ### ### ###" },
  { name: "Greece", code: "+30", flag: "🇬🇷", mask: "+30 ### ### ###" },

  // Остальной мир
  { name: "Australia", code: "+61", flag: "🇦🇺", mask: "+61 # #### ####" },
  { name: "Japan", code: "+81", flag: "🇯🇵", mask: "+81 ##-####-####" },
  { name: "South Korea", code: "+82", flag: "🇰🇷", mask: "+82 ##-####-####" },
  { name: "China", code: "+86", flag: "🇨🇳", mask: "+86 ## #### ####" },
  { name: "Brazil", code: "+55", flag: "🇧🇷", mask: "+55 (##) ####-####" },
  { name: "Mexico", code: "+52", flag: "🇲🇽", mask: "+52 ## #### ####" },
  { name: "South Africa", code: "+27", flag: "🇿🇦", mask: "+27 ## ### ####" },
  { name: "Egypt", code: "+20", flag: "🇪🇬", mask: "+20 ## ### ####" },
  { name: "Israel", code: "+972", flag: "🇮🇱", mask: "+972 ##-###-####" },
]);

// 4) локальный выбор страны
const selectedCountry = ref<Country>(countries.value[0]);

// 5) «прокси» для v-model номера
const localPhone = computed<string>({
  get: () => props.modelValue,
  set: (val: string) => {
    emit("update:modelValue", val);
  },
});

// 6) текущая маска
const currentMask = computed<string>(() => selectedCountry.value.mask);

// при смене страны — сбрасываем ввод и обновляем маску
function onCountryChange() {
  // очистить текущее значение
  emit("update:modelValue", "");
}
</script>

<style scoped>
.phone-input {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.phone-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.country-select select {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 4px 8px;
  font-size: 14px;
}

.masked-input {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
}

.masked-input:focus {
  border-color: #007bff;
  outline: none;
}
</style>
