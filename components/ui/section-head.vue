<template>
  <div class="section-head">
    <h3>{{ title }}</h3>
    <btn v-if="link" name="Смотреть все" @click="onLink(link)" />
  </div>
</template>

<script setup lang="ts">
import btn from "./buttons/btn.vue";
import { useRouter } from "vue-router";
const props = defineProps<{
  title: string;
  link?: any;
}>();

const router = useRouter();

const onLink = (link: string) => {
  router.push(link);
};
</script>

<style scoped lang="scss">
.section-head {
  @include flex-space;
  gap: 4rem;

  @include bp($point_2) {
    gap: 2rem;
  }

  h3 {
    font-size: 3.2rem;
    font-weight: 500;
    font-family: $font_2;
    @include bp($point_2) {
      font-size: 1.8rem;
      flex-grow: 1;
      min-width: 20rem;
    }
  }
}
</style>
