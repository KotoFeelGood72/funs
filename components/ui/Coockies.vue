<template>
  <div v-if="!isCookieAccepted" class="cookies">
    <p>
      Кстати, действия представителей оппозиции представлены в исключительно
      положительном свете. Бронь авиабилета можно проверить на сайте
      авиакомпании после оплаты заказа.
    </p>
    <div class="row">
      <btn name="Отклонить" @click="acceptCookie" />
      <btn theme="primary" name="Принять" @click="acceptCookie" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import btn from "./buttons/btn.vue";

const isCookieAccepted = ref(false);

onMounted(() => {
  isCookieAccepted.value = document.cookie.includes("cookieAccepted=true");
});

// Функция для принятия куки
const acceptCookie = () => {
  const currentDate = new Date().toUTCString(); // Получаем текущую дату в формате UTC
  document.cookie = `cookieAccepted=true; path=/; expires=Fri, 31 Dec 2024 23:59:59 GMT`;
  document.cookie = `cookieDate=${currentDate}; path=/; expires=Fri, 31 Dec 2024 23:59:59 GMT`;
  isCookieAccepted.value = true; // Скрываем сообщение
};
</script>

<style scoped lang="scss">
.coockies {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top-left-radius: 3.2rem;
  border-top-right-radius: 3.2rem;
  padding: 3.2rem;
  @include flex-space;
  background-color: $white;
  z-index: 999;
  gap: 2rem;
  .row {
    @include flex-start;
    gap: 1.5rem;
  }
}
</style>
