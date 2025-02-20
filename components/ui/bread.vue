<template>
  <nav aria-label="breadcrumbs" class="breadcrumbs">
    <div class="first">
      <NuxtLink to="/">
        <p>Главная</p>
        <Icon name="f:right" :size="16" />
      </NuxtLink>
    </div>
    <ul>
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <span v-if="crumb.path">
          <NuxtLink v-if="index !== breadcrumbs.length - 1" :to="crumb.path">
            {{ crumb.title }}
          </NuxtLink>
          <span v-else>{{ crumb.title }}</span>
        </span>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  breadcrumbs: any;
}>();
</script>

<style scoped lang="scss">
.first {
  a {
    @include flex-start;
    gap: 1.6rem;
    font-size: 1.8rem;
    color: $blue;
    font-family: $font_2;

    @include bp($point_2) {
      font-size: 1.4rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
}

nav {
  @include flex-start;
  gap: 1.6rem;
  span {
    font-family: $font_3;
    font-weight: 500;
  }
}

.iconify {
  @include bp($point_2) {
    width: 1.3rem;
    height: 1.3rem;
    @include flex-center;
  }
}

ul {
  @include flex-start;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
