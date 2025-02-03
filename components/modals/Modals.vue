<template>
  <transition :name="modalTransitionName">
    <component v-if="activeModalComponent" :is="activeModalComponent" />
  </transition>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useModalStoreRefs } from "~/store/useModalStore";
import Auth from "./modals/Auth.vue";

const { modals } = useModalStoreRefs();

type ModalKey = keyof typeof modals.value;

const ModalUp = ref<any>(["auth"]);

const activeModalName = computed(() => {
  for (const name in modals.value) {
    if (modals.value[name as ModalKey]) {
      return name as ModalKey;
    }
  }
  return null;
});

const activeModalComponent = computed(() => {
  for (const [key, isActive] of Object.entries(modals.value)) {
    if (isActive) {
      switch (key) {
        case "auth":
          return Auth;
        default:
          return null;
      }
    }
  }
  return null;
});

const modalTransitionName = computed(() => {
  if (activeModalName.value) {
    if (ModalUp.value.includes(activeModalName.value)) {
      return "slide-up";
    }
  }
  return "slide-up";
});
</script>

<style lang="scss">
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-leave-from {
  transform: translateY(0);
}

.slide-up-leave-to {
  transform: translateY(100%);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-right-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-right-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

// Стили для модального окна

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 115;
  @include flex-center;
  transition: all 0.3s ease-in-out;
}
</style>
