<template>
  <ul class="tab-links">
    <li
      v-for="(tab, index) in tabs"
      :key="index"
      :class="{ active: activeTab === index }"
      class="tab-link"
      @click="$emit('update:activeTab', index)"
    >
      {{ isTypeTabsLabel }} № {{ index + 1 }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
defineProps<{
  tabs: any;
  activeTab: number;
}>();

const emit = defineEmits(["update:activeTab"]);
const route = useRoute();

const isTypeTabsLabel = computed(() => {
  switch (route.name) {
    case "air-id":
      return "Пассажир";
    case "hotels-id":
      return "Гость";
    default:
      return "Гость";
  }
});
</script>

<style scoped lang="scss">
.tab-links {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  font-size: 1.8rem;
  font-family: $font_2;
  margin-bottom: 2.4rem;

  @include bp($point_2) {
    font-size: 1.4rem;
  }

  .tab-link {
    background-color: $gray-light;
    border-radius: 0.8rem;
    color: $dark;
    padding: 1rem 0.8rem 0.8rem 0.8rem;
    cursor: pointer;
    &.active {
      color: $blue;
      background-color: #a2d0ff4a;
    }
  }
}
</style>
