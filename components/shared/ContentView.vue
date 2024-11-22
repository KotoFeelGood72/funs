<template>
  <section class="area">
    <div class="container">
      <div class="area_main">
        <div class="area__head">
          <div class="area-back">
            <Icon name="f:left" />
          </div>
          <h3>{{ title }}</h3>
        </div>
        <div class="area__layout">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    back?: boolean;
  }>(),
  {
    title: "",
    back: false,
  }
);
</script>

<style scoped lang="scss"></style>
