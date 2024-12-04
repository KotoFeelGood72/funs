<template>
  <div class="settings">
    <h2 class="settings-title">Настройки личного кабинета</h2>
    <div class="settings-card">
      <h3 class="settings-card-title">Уведомления</h3>
      <div class="settings-item" v-for="(notification, index) in notifications" :key="index">
        <span :class="{ 'settings-item-link': notification.link }">{{ notification.text }}</span>
        <label class="switch">
          <input type="checkbox" v-model="notification.enabled" />
          <span class="slider"></span>
        </label>
      </div>
    </div>
    <div class="settings-delete">
      <a href="#" class="settings-delete-link">Удалить профиль</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

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
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;

  &-title {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 2rem;
    color: #333;
  }

  .settings-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.5rem;

    &-title {
      font-size: 1.6rem;
      margin-bottom: 1.5rem;
      color: #555;
    }
  }

  .settings-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid #e0e0e0;
    font-size: 1.4rem;
    color: #555;

    &:last-child {
      border-bottom: none;
    }

    &-link {
      color: #007bff;
      cursor: pointer;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 34px;
    height: 20px;

    input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: 0.4s;
      border-radius: 20px;

      &:before {
        position: absolute;
        content: "";
        height: 14px;
        width: 14px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
      }
    }

    input:checked + .slider {
      background-color: #007bff;
    }

    input:checked + .slider:before {
      transform: translateX(14px);
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