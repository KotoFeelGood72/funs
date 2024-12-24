<template>
  <div class="layouts">
    <Header />
    <slot />
    <div class="footer__w blue">
      <Footer />
    </div>
    <transition name="fade-bg">
      <div v-if="isModalActive" class="page-bg" @click="closeAllModals"></div>
    </transition>
    <Modals />
    <Coockies />
  </div>
</template>

<script setup lang="ts">
import Header from "~/components/shared/Header.vue";
import Footer from "~/components/shared/Footer.vue";
import Modals from "~/components/modals/Modals.vue";
import Coockies from "~/components/ui/Coockies.vue";
import { useModalStore, useModalStoreRefs } from "~/store/useModalStore";
import { useRoute, useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";
const { getProfile, accessToken } = useAuth();

const { closeAllModals } = useModalStore();
const { modals } = useModalStoreRefs();
const route = useRoute();
const router = useRouter();

const isModalActive = computed(() => {
  return Object.values(modals.value).some((isActive) => isActive);
});

watch(
  () => route,
  () => {
    closeAllModals(router, route);
  }
);

onMounted(() => {
  if (accessToken.value) {
    getProfile();
  }
});
</script>

<style scoped lang="scss">
.footer__w {
  padding-top: 9.6rem;
  position: relative;
}

.layouts {
  background-color: $blue;
}

.page-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.fade-bg-enter-active,
.fade-bg-leave-active {
  transition: opacity 0.5s ease;
}

.fade-bg-enter-from,
.fade-bg-leave-to {
  opacity: 0;
}

.fade-bg-enter-to,
.fade-bg-leave-from {
  opacity: 1;
}
</style>
