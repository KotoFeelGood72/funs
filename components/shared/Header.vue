<template>
  <header class="header" :class="{ isHome: route.name === 'index' }">
    <div class="container">
      <div class="header_main">
        <div class="logo">
          <NuxtLink to="/">
            <img src="~/assets/img/logo.svg" />
          </NuxtLink>
        </div>
        <div class="right">
          <listLink :list="nav" />
          <btn
            v-if="isUser !== null"
            :name="isUser ? user.email ?? 'e-mail не указан' : 'Личный кабинет'"
            icon="user"
            theme="primary"
            @click="isUser ? goToProfile : openModal('auth')"
          />

          <btn
            v-else
            name="Личный кабинет"
            icon="user"
            theme="primary"
            @click="openModal('auth')"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import listLink from "../ui/list/list-link.vue";
import btn from "../ui/buttons/btn.vue";
import { useModalStore } from "~/store/useModalStore";
import { useAuth } from "~/composables/useAuth";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";

const { user, accessToken } = useAuth();
const { openModal } = useModalStore();
const router = useRouter();
const route = useRoute();

const nav = [
  { link: "/air", name: "Билеты" },
  { link: "/hotel", name: "Отели" },
  { link: "/", name: "ETA" },
];

// Проверка, что пользователь авторизован
const isUser = computed(() => {
  return (
    user.value &&
    typeof user.value === "object" &&
    Object.keys(user.value).length > 0 &&
    accessToken.value
  );
});

// Переход в личный кабинет
const goToProfile = () => {
  router.push("/profile");
};
</script>

<style scoped lang="scss">
.header {
  height: $header;
  background-color: $white;
  border-bottom-right-radius: 3.2rem;
  border-bottom-left-radius: 3.2rem;
  &.isHome {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
}
.header_main {
  @include flex-space;
  padding: 3.2rem 0;
}
.right {
  @include flex-end;
  gap: 3.2rem;
}
</style>
