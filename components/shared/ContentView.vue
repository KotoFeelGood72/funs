<template>
  <section class="area">
    <div class="container">
      <div class="area_main">
        <div class="area__head" v-if="title">
          <div
            class="area-back"
            v-if="back && !isLoading"
            @click="router.back()"
          >
            <Icon name="f:left" />
          </div>
          <h3 v-if="title && !isLoading">{{ title }}</h3>
          <div class="square"></div>
        </div>
        <div class="area__layout">
          <transition name="fade" mode="out-in">
            <template v-if="isLoading">
              <div class="area__empty" key="loading">
                <img src="~/assets/img/loader.png" alt="Загрузка" />
                <p>
                  Загрузка<span class="dots">{{ animatedDots }}</span>
                </p>
              </div>
            </template>

            <template v-else-if="$slots.default">
              <div key="content">
                <slot />
              </div>
            </template>

            <template v-else>
              <div class="empty" key="empty">
                <h2>Билетов не найдено</h2>
              </div>
            </template>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useRouter } from "vue-router";

const props = withDefaults(
  defineProps<{
    title?: any;
    back?: boolean;
    isLoading?: boolean;
  }>(),
  {
    title: "",
    back: true,
    isLoading: true,
  }
);

const router = useRouter();

// Реактивное свойство для точек
const dots = ref<string>("");

onMounted(() => {
  const interval = setInterval(() => {
    dots.value = dots.value.length < 3 ? dots.value + "." : "";
  }, 500);

  // Очистка интервала при размонтировании
  onUnmounted(() => clearInterval(interval));
});

const animatedDots = computed(() => dots.value);
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
  @include bp($point_2) {
    padding: 2rem 1rem;
    border-radius: 1.6rem;
  }
}

.area__head {
  @include flex-space;
  gap: 1rem;
  margin-bottom: 3.2rem;
  h3 {
    font-size: 2.4rem;
    font-family: $font_2;
    font-weight: 500;

    @include bp($point_2) {
      font-size: 1.6rem;
      font-weight: 500;
      text-align: center;
    }
  }
}

.area-back {
  @include flex-center;
  width: 4.8rem;
  height: 4.8rem;
  cursor: pointer;
  @include bp($point_2) {
    width: 3.5rem;
    height: 3.5rem;
  }
}

.square {
  width: 4.8rem;
  height: 4.8rem;
  @include bp($point_2) {
    width: 3.5rem;
    height: 3.5rem;
  }
}

.area__empty {
  @include flex-center;
  flex-direction: column;
  font-size: 2.4rem;
  gap: 1.6rem;
  height: 100%;
  padding: 15rem 0;

  @include bp($point_2) {
    padding: 4rem;
  }
  p {
    width: 12rem;
    @include bp($point_2) {
      font-size: 1.8rem;
      margin-right: -3.5rem;
    }
  }
  img {
    max-width: 40rem;
    @include flex-center;
    @include bp($point_2) {
      max-width: 20rem;
      margin-bottom: 2rem;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
