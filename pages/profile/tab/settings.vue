<template>
  <div class="settings">
    <div class="small-container">
      <h2 class="settings-title">Настройки личного кабинета</h2>
      <div class="settings-card">
        <h3 class="settings-card-title">Уведомления</h3>
        <div
          class="settings-item"
          v-for="(notification, index) in notifications"
          :key="index"
        >
          <span :class="{ 'settings-item-link': notification.link }">{{
            notification.text
          }}</span>
          <label class="switch">
            <input type="checkbox" v-model="notification.enabled" />
            <span class="slider"></span>
          </label>
        </div>
      </div>
      <btn
        name="Удалить профиль"
        theme="white"
        style="justify-content: center"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import btn from "~/components/ui/buttons/btn.vue";

const notifications = ref([
  { text: "Напоминать о завершении бронирования", enabled: true, link: true },
  { text: "Напоминать в день окончания брони", enabled: true, link: true },
  { text: "Получать предложения о продлении брони за 2 дня", enabled: false },
  { text: "Получать по электронной почте", enabled: true, link: true },
  { text: "Получать по смс", enabled: false },
]);
</script>

<style scoped lang="scss">
.settings {
  padding-top: 3.2rem;

  &-title {
    text-align: center;
    font-size: 2.4rem;
    font-family: $font_2;
    font-weight: 500;
    margin-bottom: 3.2rem;
  }

  .settings-card {
    border: 0.1rem solid #d9d9d9;
    border-radius: 0.8rem;
    padding: 1.6rem;
    margin-bottom: 3.2rem;

    &-title {
      font-size: 1.4rem;
      margin-bottom: 1.6rem;
      font-family: $font_2;
      font-weight: 500;
    }
  }

  .settings-item {
    @include flex-space;

    &:not(:last-child) {
      margin-bottom: 1.2rem;
    }

    &:last-child {
      border-bottom: none;
    }

    font-weight: 500;
    .settings-item-link {
      font-size: 1.8rem;
      color: $blue;
    }
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 4rem;
    height: 2.4rem;

    input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      border: 0.1rem solid $gray;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: $white;
      transition: 0.4s;
      border-radius: 2rem;

      &:before {
        position: absolute;
        content: "";
        height: 1.8rem;
        width: 1.8rem;
        left: 0.3rem;
        top: 50%;
        transform: translateY(-50%);
        background-color: $gray;
        transition: 0.4s;
        border-radius: 50%;
      }
    }

    input:checked + .slider {
      background-color: $blue;
    }

    input:checked + .slider:before {
      transform: translateX(14px) translateY(-50%);
      background-color: $white;
    }
  }

  .settings-delete {
    text-align: center;
    margin-top: 2rem;

    .settings-delete-link {
      color: #007bff;
      text-decoration: none;
      font-size: 1.4rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
