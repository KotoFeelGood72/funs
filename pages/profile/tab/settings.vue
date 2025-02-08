<template>
  <div class="settings">
    <div class="small-container">
      <h2 class="settings-title">Настройки личного кабинета</h2>
      <div class="settings-card">
        <h3 class="settings-card-title">Уведомления</h3>

        <!-- Свитч 1 -->
        <div class="settings-item">
          <span class="settings-item-link"
            >Напоминать о завершении бронирования</span
          >
          <label class="switch">
            <input
              type="checkbox"
              v-model="user.remind_booking_completion"
              @change="updateProfile"
            />
            <span class="slider"></span>
          </label>
        </div>

        <!-- Свитч 2 -->
        <div class="settings-item">
          <span class="settings-item-link"
            >Напоминать в день окончания брони</span
          >
          <label class="switch">
            <input
              type="checkbox"
              v-model="user.remind_booking_end_day"
              @change="updateProfile"
            />
            <span class="slider"></span>
          </label>
        </div>

        <!-- Свитч 3 -->
        <div class="settings-item">
          <span>Получать предложения о продлении брони за 2 дня </span>
          <label class="switch">
            <input
              type="checkbox"
              v-model="user.offer_extend_booking"
              @change="updateProfile"
            />
            <span class="slider"></span>
          </label>
        </div>

        <!-- Свитч 4 -->
        <div class="settings-item">
          <span class="settings-item-link">Получать по электронной почте</span>
          <label class="switch">
            <input
              type="checkbox"
              v-model="user.receive_email_notifications"
              @change="updateProfile"
            />
            <span class="slider"></span>
          </label>
        </div>

        <!-- Свитч 5 -->
        <div class="settings-item">
          <span>Получать по смс</span>
          <label class="switch">
            <input
              type="checkbox"
              v-model="user.receive_sms_notifications"
              @change="updateProfile"
            />
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useAuth } from "~/composables/useAuth";

const { user, updateProfile } = useAuth();
</script>

<style scoped lang="scss">
.settings {
  padding-top: 3.2rem;

  @include bp($point_2) {
    padding-top: 0;
  }

  &-title {
    text-align: center;
    font-size: 2.4rem;
    font-family: $font_2;
    font-weight: 500;
    margin-bottom: 3.2rem;

    @include bp($point_2) {
      font-size: 2rem;
    }
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

      @include bp($point_2) {
        font-size: 1.4rem;
      }
    }
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 4rem;
    height: 2.4rem;

    @include bp($point_2) {
      min-width: 4rem;
    }

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
      transform: translateX(1.4rem) translateY(-50%);
      background-color: $white;
    }
  }

  .settings-delete {
    text-align: center;
    margin-top: 2rem;

    .settings-delete-link {
      color: $blue;
      text-decoration: none;
      font-size: 1.4rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
