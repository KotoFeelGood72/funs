<template>
  <div class="phone-input" :class="{ error: error }">
    <label v-if="label">{{ label }}</label>
    <div class="phone-input-wrapper">
      <div class="country-select">
        <select v-model="selectedCountry" @change="onCountryChange">
          <option v-for="country in countries" :key="country.flag" :value="country">
            {{ country.flag }}
          </option>
        </select>
      </div>
      <input
        v-mask="currentMask"
        v-model="localPhone"
        :placeholder="currentMask"
        type="text"
        class="masked-input"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { mask as vMask } from "vue-the-mask";

interface Country {
  flag: string; // ISO-код, например "RU"
  mask: string; // полный шаблон, например "+7 (###) ###-##-##"
}

// Props & emit
const props = defineProps<{ modelValue: string; label?: string; error: any }>();
const emit = defineEmits<{ (e: "update:modelValue", v: string): void }>();

// Список стран с полным шаблоном в mask
const countries = ref<Country[]>([
  { flag: "RU", mask: "+7 (###) ###-##-##" },
  { flag: "IN", mask: "+91 #####-#####" },
  { flag: "SA", mask: "+966 ## #######" },
  { flag: "AE", mask: "+971 ## ### ####" },
  { flag: "TR", mask: "+90 (###) ###-##-##" },
  { flag: "DE", mask: "+49 #### #######" },
  { flag: "PL", mask: "+48 ### ### ###" },
  { flag: "ZA", mask: "+27 ## ### ####" },
  { flag: "EG", mask: "+20 ## ### ####" },
  { flag: "IL", mask: "+972 ##-###-####" },
]);

// Текущая выбранная страна
const selectedCountry = ref<Country>(countries.value[0]);

// По вводу полного номера автоматически подбираем страну по префиксу
watch(
  () => props.modelValue,
  (full) => {
    if (!full) return;
    // регуляркой берём префикс +числа
    const prefixMatch = full.match(/^\+\d+/);
    if (!prefixMatch) return;
    const prefix = prefixMatch[0];
    const found = countries.value.find((c) => c.mask.startsWith(prefix));
    if (found) selectedCountry.value = found;
  },
  { immediate: true }
);

// Маска для v-mask
const currentMask = computed(() => selectedCountry.value.mask);

// Локальная модель, которая просто читает/пишет полную строку
const localPhone = computed<string>({
  get: () => props.modelValue || "",
  set: (val: string) => {
    emit("update:modelValue", val);
  },
});

// При смене страны в селекте — сбрасываем номер
function onCountryChange() {
  emit("update:modelValue", "");
}
</script>

<style scoped lang="scss">
.phone-input-wrapper {
  position: relative;
  @include flex-start;
  border: 0.1rem solid #d8d7d7;
  border-radius: 0.5rem;
  gap: 0.5rem;
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

label {
  font-size: 1.6rem;
  color: #757575;
  margin-bottom: 1rem;
  display: flex;
}

.phone-input {
  &.error {
    .label {
      color: red;
    }
    input {
      &::placeholder {
        color: red;
      }
    }
    .phone-input-wrapper {
      border-color: red;
    }
  }
}
</style>
