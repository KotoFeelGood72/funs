<template>
  <div class="head">
    <div class="air-logo">
      <div class="air_logo__img" v-if="logo">
        <img :src="logo" />
      </div>
      <p>{{ title }}</p>
    </div>
    <div class="share">
      <Icon name="f:share" :size="25" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  logo?: string;
}>();
</script>

<style scoped lang="scss">
.head {
  @include flex-space;
}

.air-logo {
  @include flex-start;
  gap: 1.6rem;
}

.air_logo__img {
  width: 5rem;
  height: 5rem;
  border-radius: 100%;
  overflow: hidden;
  // width: 4rem;
  // height: 4rem;
  // border-radius: 100rem;
  overflow: hidden;

  @include bp($point_2) {
    width: auto;
    max-width: 15rem;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

p {
  font-family: $font_3;
  font-weight: 600;
}
</style>
