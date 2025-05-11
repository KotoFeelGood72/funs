<template>
  <div class="eta">
    <OneStep v-if="currentStep === 1" />
    <TwoStep v-else-if="currentStep === 2" />
    <FreeStep v-else-if="currentStep === 3" />
    <FourStep v-else-if="currentStep === 4" />
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import OneStep from "./steps/OneStep.vue";
import TwoStep from "./steps/TwoStep.vue";
import FreeStep from "./steps/FreeStep.vue";
import FourStep from "./steps/FourStep.vue";
import { useETAStore } from "~/store/useETAStore";

// получаем стор и реф на currentStep
const etaStore = useETAStore();
const { currentStep } = storeToRefs(etaStore);

// роут и query
const route = useRoute();

// при монтировании и при каждом изменении ?step=...
watch(
  () => route.query.step,
  (step) => {
    // при невалидном или отсутствии -- шаг 1
    const n = Number(step);
    etaStore.currentStep = n >= 1 ? n : 1;
  },
  { immediate: true }
);
</script>
