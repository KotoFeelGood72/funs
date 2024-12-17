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

const { openModal } = useModalStore();
const nav = [
  { link: "/air", name: "Билеты" },
  { link: "/hotel", name: "Отели" },
  { link: "/", name: "ETA" },
];
</script>

<style scoped lang="scss">
.header {
  height: $header;
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
