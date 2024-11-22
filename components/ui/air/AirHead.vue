<template>
  <div class="head">
    <div class="air-logo">
      <div class="air_logo__img">
        <img :src="logo" />
      </div>
      <p>{{ title }}</p>
    </div>
    <div class="share">
      <Icon name="f:share" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  logo: string;
}>();
</script>

<style scoped lang="scss"></style>
