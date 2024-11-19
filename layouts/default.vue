<template>
  <div class="layouts">
    <Header />
    <slot />
  </div>
</template>

<script setup lang="ts">
import Header from "~/components/shared/Header.vue";
</script>

<style scoped lang="scss"></style>
