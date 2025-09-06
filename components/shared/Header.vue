<template>
  <header class="header">
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
            class="header_profile"
            :name="isUser ? user.email ?? 'e-mail не указан' : 'Личный кабинет'"
            icon="user"
            theme="secondary"
            @click="goToProfile"
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
import { useRouter } from "vue-router";
import { computed } from "vue";

const { user, accessToken } = useAuth();
const { openModal } = useModalStore();
const router = useRouter();

const nav = [
  { link: "/air", name: "Билеты" },
  { link: "/hotels", name: "Отели" },
  { link: "/eta", name: "ETA" },
];

const isUser = computed(() => {
  return (
    user.value &&
    typeof user.value === "object" &&
    Object.keys(user.value).length > 0 &&
    accessToken.value
  );
});

const goToProfile = () => {
  if (isUser.value === null) {
    openModal("auth");
  } else {
    router.push("/profile");
  }
};
</script>

<style scoped lang="scss">
.header {
  height: $header;
  background-color: $white;
  transition: all 0.3s ease-in-out;

  @include bp($point_2) {
    height: 8rem;
  }
}
.header_main {
  @include flex-space;
  padding: 3.2rem 0;
  @include bp($point_2) {
    padding: 1.5rem 0;
  }
}
.right {
  @include flex-end;
  gap: 3.2rem;
}

:deep(.btn p) {
  @include bp($point_2) {
    font-size: 1.4rem;
  }
}

.logo {
  @include bp($point_2) {
    max-width: 15rem;
    @include flex-center;
  }

  img {
    @include bp($point_2) {
      width: 100%;
    }
  }
}
</style>
