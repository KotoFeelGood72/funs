<template>
  <div class="eta">
    <OneStep v-if="currentStep === 1" />
    <TwoStep v-else-if="currentStep === 2" />
    <FreeStep v-else-if="currentStep === 3" />
    <FourStep v-else-if="currentStep === 4" />
  </div>
</template>

<script setup lang="ts">
import OneStep from "./steps/OneStep.vue";
import TwoStep from "./steps/TwoStep.vue";
import FreeStep from "./steps/FreeStep.vue";
import FourStep from "./steps/FourStep.vue";
import { useETAStoreRefs } from "~/store/useETAStore";

const { currentStep } = useETAStoreRefs();
</script>

<style scoped lang="scss">
.eta_main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  gap: 3.2rem;
}

.eta__img {
  img {
    width: 100%;
  }
}

.grid_data {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  grid-gap: 2.4rem;
  margin-bottom: 2.4rem;
}

.eta__head {
  margin-bottom: 3.2rem;
}

.eta_forms__change {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  margin-bottom: 1.6rem;
}

.eta__price {
  @include flex-start;
  border-bottom: 0.1rem solid $blue;
  color: $blue;
  font-family: $font_2;
  padding-left: 2.8rem;
}

.eta_visaPurposes__list {
  padding: 1.6rem 0;
}

.eta_visaPurposes__list__item {
  border-bottom: 0.1rem solid rgba(162, 208, 255, 0.2);
  input {
    display: none;
    &:checked + label {
      background-color: rgba(162, 208, 255, 0.2);

      .purpose_icon {
        color: $blue;
      }
      color: $blue;
    }
  }

  label {
    position: relative;
    padding-left: 4rem;
    cursor: pointer;
    display: flex;
    padding: 1.6rem;
    font-size: 1.6rem;
    gap: 1.6rem;
  }
}

.purpose_icon {
  @include flex-center;
  color: $light;
}

.notice {
  font-size: 1.4rem;
  padding: 1.6rem 0;
}

.documents {
  border: 0.1rem solid $light;
  border-radius: 1.6rem;
  margin-bottom: 2.4rem;
  &:deep(h3) {
    font-size: 1.6rem;
    font-family: $font_2;
    font-weight: 600;
    padding: 1.6rem 0;
  }

  &:deep(ul) {
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: disc;
    padding-left: 2rem;
  }
  &:deep(li) {
    list-style: disc;
  }

  &:deep(p),
  &:deep(strong) {
    font-size: 1.6rem;
    font-family: $font_2;
    font-weight: 400;
    padding: 0.5rem 0;
  }
}

.documents__toggle {
  @include flex-space;
  padding: 1.6rem;
}

.documents__content {
  padding: 0 1.6rem 1.6rem 1.6rem;
}

.action {
  padding: 1.6rem 0;
  a {
    color: $blue;
  }
}

.row {
  @include flex-space;

  p {
    font-size: 2.4rem;
    font-family: $font_2;
    font-weight: 600;
  }
}
</style>
