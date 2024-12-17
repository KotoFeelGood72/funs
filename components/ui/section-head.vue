<template>
  <div class="section-head">
    <h3>{{ title }}</h3>
    <btn name="Смотреть все" @click="onLink(link)" />
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

<style scoped lang="scss"></style>
