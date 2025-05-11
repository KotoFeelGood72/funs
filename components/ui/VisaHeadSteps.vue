<template>
  <div class="visa_head">
    <h3>{{ title }}</h3>
    <ul class="visa_head__steps">
      <li
        v-for="(item, idx) in steps"
        :key="`step-item-${idx}`"
        :class="{ active: currentStep === idx + 1 }"
        @click="goToThisStep(idx + 1)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useETAStore } from "~/store/useETAStore";
import { useRoute, useRouter } from "vue-router";

const props = defineProps<{
  title: string;
}>();

// Три шага жёстко внутри компонента:
const steps = ["Шаг 1: Персональные данные", "Шаг 2: Документы", "Шаг 3: Подтверждение"];

const etaStore = useETAStore();
const { goToStep } = etaStore;
const { currentStep } = storeToRefs(etaStore);

const router = useRouter();
const route = useRoute();

// Переход при клике на шаг
function goToThisStep(step: number) {
  const visaId = route.query.visa_id as string;
  goToStep(step, router, route, visaId);
}
</script>

<style scoped lang="scss">
.visa_head {
  text-align: center;
  @include flex-center;
  flex-direction: column;
  gap: 2rem;
  h3 {
    font-size: 2.4rem;
  }
}

.visa_head__steps {
  @include flex-center;
  margin-bottom: 3rem;
  gap: 2rem;
}
.visa_head__steps li {
  border: 0.1rem solid $blue;
  color: $blue;
  cursor: pointer;
  padding: 1.2rem 2rem;
  border-radius: 0.5rem;
  font-family: $font_3;
  font-size: 1.6rem;
  font-weight: 500;
}
.visa_head__steps li.active {
  background-color: $blue;
  color: $white;
}
</style>
