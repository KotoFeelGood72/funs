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

<style scoped lang="scss">
.area {
  background-color: $blue;
  padding: 8rem 0;
}

.area_main {
  background-color: $white;
  border-radius: 3.2rem;
  padding: 3.2rem;
}

.area__head {
  @include flex-center;
  gap: 1rem;
  // padding-top: 3.2rem;
  h3 {
    font-size: 2.4rem;
    font-family: $font_2;
    font-weight: 500;
  }
}

.area-back {
  @include flex-center;
}
</style>
