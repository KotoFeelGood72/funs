<template>
  <div v-if="isClient && !isCookieAccepted" class="cookies">
    <p>
      Мы используем cookie-файлы для предоставления наилучшего пользовательского
      опыта. Продолжая использовать сайт, Вы соглашаетесь с Политикой
      использования cookie-файлов.
    </p>
    <div class="row">
      <btn name="Отклонить" @click="declineCookie" />
      <btn theme="primary" name="Я согласен" @click="acceptCookie" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import btn from "./buttons/btn.vue";

// Состояние для отслеживания куки
const isCookieAccepted = ref(false);
const isClient = ref(false); // Для проверки клиентской стадии

// Функция для получения куки
const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

// Проверяем состояние куки только на клиенте
onMounted(() => {
  isClient.value = true; // Устанавливаем, что мы на клиенте
  isCookieAccepted.value = getCookie("cookieAccepted") === "true";
});

// Функция для принятия куки
const acceptCookie = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1); // Устанавливаем истечение через год
  document.cookie = `cookieAccepted=true; path=/; expires=${date.toUTCString()}`;
  isCookieAccepted.value = true;
};

// Функция для отклонения куки
const declineCookie = () => {
  document.cookie = `cookieAccepted=false; path=/;`;
  isCookieAccepted.value = true;
};
</script>

<style scoped lang="scss">
.cookies {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  border-radius: 2rem;
  padding: 2rem;
  background-color: #ffffffce;
  backdrop-filter: blur(2rem);
  z-index: 999;
  gap: 2rem;
  box-shadow: 0 0 2rem 0 #00000027;
  overflow: hidden;
  @include flex-space;
  gap: 2rem;

  p {
    max-width: 50rem;
    font-size: 1.4rem;
  }
  .row {
    display: flex;
    gap: 1.5rem;

    :deep(.btn) {
      padding: 1rem 2rem 1.2rem 2rem;
      font-size: 1.4rem;
    }
  }
}
</style>
