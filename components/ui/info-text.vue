<template>
  <div class="info-text">
    <div class="info_text__icon">
      <Icons :icon="info.icon" />
    </div>
    <div class="info_text__label">{{ info.label }}</div>
    <div class="info_text__info">
      <Icons icon="" />
      <p class="info_text__notice">{{ info.notice }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  info: any;
}>();
</script>

<style scoped lang="scss"></style>
