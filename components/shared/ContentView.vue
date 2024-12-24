<template>
  <section class="area">
    <div class="container">
      <div class="area_main">
        <div class="area__head">
          <div class="area-back" v-if="back" @click="router.back()">
            <Icon name="f:left" />
          </div>
          <h3 v-if="title">{{ title }}</h3>
          <div class="square"></div>
        </div>
        <div class="area__layout">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const props = withDefaults(
  defineProps<{
    title?: string;
    back?: boolean;
  }>(),
  {
    title: "",
    back: true,
  }
);

const router = useRouter();
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
  @include flex-space;
  gap: 1rem;
  margin-bottom: 3.2rem;
  // padding-top: 3.2rem;
  h3 {
    font-size: 2.4rem;
    font-family: $font_2;
    font-weight: 500;
  }
}

.area-back {
  @include flex-center;
  width: 4.8rem;
  height: 4.8rem;
}

.square {
  width: 4.8rem;
  height: 4.8rem;
}
</style>
