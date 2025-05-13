<template>
  <div class="phone-input">
    <label for="phone" v-if="label">{{ label }}</label>
    <div class="phone-input-wrapper">
      <div class="country-select">
        <select v-model="selectedCountry" @change="onCountryChange">
          <option v-for="country in countries" :key="country.code" :value="country">
            {{ country.flag }} {{ country.code }}
          </option>
        </select>
      </div>

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
const emit = defineEmits(["update:modelValue"]);

// 3) список стран (оставили ваш полный список)
const countries = ref<Country[]>([
  // СНГ + Америка + Азия + Европа + другие
  { name: "Russia", code: "+7", flag: "🇷🇺", mask: " (###) ###-##-##" },
  { name: "United States", code: "+1", flag: "🇺🇸", mask: " (###) ###-####" },
  { name: "Canada", code: "+1", flag: "🇨🇦", mask: " (###) ###-####" },
  { name: "Ukraine", code: "+380", flag: "🇺🇦", mask: " (##) ###-##-##" },
  { name: "Kazakhstan", code: "+7", flag: "🇰🇿", mask: " (###) ###-##-##" },

  // недавние
  { name: "India", code: "+91", flag: "🇮🇳", mask: " #####-#####" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦", mask: " ## #######" },
  { name: "UAE (Dubai)", code: "+971", flag: "🇦🇪", mask: " ## ### ####" },
  { name: "Turkey", code: "+90", flag: "🇹🇷", mask: " (###) ###-##-##" },

  // Европа
  { name: "Germany", code: "+49", flag: "🇩🇪", mask: " #### #######" },
  { name: "France", code: "+33", flag: "🇫🇷", mask: " # ## ## ## ##" },
  { name: "Spain", code: "+34", flag: "🇪🇸", mask: " ### ### ###" },
  { name: "Italy", code: "+39", flag: "🇮🇹", mask: " ### ### ###" },
  { name: "Poland", code: "+48", flag: "🇵🇱", mask: " ### ### ###" },
  { name: "Netherlands", code: "+31", flag: "🇳🇱", mask: " ## ### ####" },
  { name: "Sweden", code: "+46", flag: "🇸🇪", mask: " ##-### ### ###" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧", mask: " #### ### ####" },
  { name: "Portugal", code: "+351", flag: "🇵🇹", mask: " ### ### ###" },
  { name: "Greece", code: "+30", flag: "🇬🇷", mask: " ### ### ###" },
  { name: "Australia", code: "+61", flag: "🇦🇺", mask: " # #### ####" },
  { name: "Japan", code: "+81", flag: "🇯🇵", mask: " ##-####-####" },
  { name: "South Korea", code: "+82", flag: "🇰🇷", mask: " ##-####-####" },
  { name: "China", code: "+86", flag: "🇨🇳", mask: " ## #### ####" },
  { name: "Brazil", code: "+55", flag: "🇧🇷", mask: " (##) ####-####" },
  { name: "Mexico", code: "+52", flag: "🇲🇽", mask: " ## #### ####" },
  { name: "South Africa", code: "+27", flag: "🇿🇦", mask: " ## ### ####" },
  { name: "Egypt", code: "+20", flag: "🇪🇬", mask: " ## ### ####" },
  { name: "Israel", code: "+972", flag: "🇮🇱", mask: " ##-###-####" },
]);

const selectedCountry = ref<Country>(countries.value[0]);

const localPhone = computed<string>({
  get: () => props.modelValue,
  set: (val: string) => {
    emit("update:modelValue", val);
  },
});

const currentMask = computed<string>(() => selectedCountry.value.mask);

function onCountryChange() {
  emit("update:modelValue", "");
}
</script>

<style scoped lang="scss">
.phone-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.phone-input-wrapper {
  position: relative;
  @include flex-start;
  border: 0.1rem solid $light-blue;
  border-radius: 0.5rem;
}

.country-select select {
  border: none;
  @include app;
  @include flex-start;
  margin-left: 2rem;
  font-size: 1.6rem;
}

.masked-input {
  @include app;
  font-size: 1.6rem;
  padding: 1.2rem 2rem 1.2rem 0;
  flex-grow: 1;
}

.masked-input:focus {
  border-color: $blue;
  outline: none;
}
</style>
