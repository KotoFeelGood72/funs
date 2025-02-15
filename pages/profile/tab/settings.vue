<template>
  <div class="settings">
    <div class="small-container">
      <h2 class="settings-title">Настройки личного кабинета</h2>
      <div class="settings-card">
        <h3 class="settings-card-title">Уведомления</h3>

        <div
          v-for="(value, key) in localSettings"
          :key="key"
          class="settings-item"
        >
          <span class="settings-item-link">
            {{ labels[key] }}
          </span>
          <label class="switch">
            <!-- Вместо :checked="value" + @change -- используем v-model -->
            <input
              type="checkbox"
              v-model="localSettings[key]"
              @change="updateSettings(key)"
              :disabled="loadingKeys.includes(key)"
            />
            <span class="slider">
              <span v-if="loadingKeys.includes(key)" class="loader"></span>
            </span>
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

/**
 * В localSettings указываем только те поля, которые хотим показывать
 */
const localSettings = ref({
  remind_booking_completion: user.value.remind_booking_completion,
  remind_booking_end_day: user.value.remind_booking_end_day,
  offer_extend_booking: user.value.offer_extend_booking,
  receive_email_notifications: user.value.receive_email_notifications,
  receive_sms_notifications: user.value.receive_sms_notifications,
});

/**
 * Подписи для этих полей
 */
const labels = {
  remind_booking_completion: "Напоминать о завершении бронирования",
  remind_booking_end_day: "Напоминать в день окончания брони",
  offer_extend_booking: "Получать предложения о продлении брони за 2 дня",
  receive_email_notifications: "Получать по электронной почте",
  receive_sms_notifications: "Получать по смс",
};

const loadingKeys = ref<string[]>([]);

const updateSettings = async (key: keyof typeof localSettings.value) => {
  // Посмотрим, что сейчас в localSettings, key и какой newValue
  console.log("updateSettings", key, localSettings.value[key]);

  try {
    loadingKeys.value.push(key);
    const newValue = localSettings.value[key];

    // ...
    setTimeout(async () => {
      console.log("   -> отправляем на сервер", { [key]: newValue });
      await updateProfile({ [key]: newValue });
      user.value[key] = newValue;

      loadingKeys.value = loadingKeys.value.filter((item) => item !== key);
    }, 500);
  } catch (error) {
    // ...
  }
};

watch(
  user,
  (newUser) => {
    localSettings.value = {
      remind_booking_completion: newUser.remind_booking_completion,
      remind_booking_end_day: newUser.remind_booking_end_day,
      offer_extend_booking: newUser.offer_extend_booking,
      receive_email_notifications: newUser.receive_email_notifications,
      receive_sms_notifications: newUser.receive_sms_notifications,
    };
  },
  { immediate: true, deep: true }
);
</script>

<style scoped lang="scss">
.settings {
  padding-top: 3.2rem;
  .settings-title {
    text-align: center;
    font-size: 2.4rem;
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
      font-weight: 500;
    }
  }
  .settings-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    &:not(:last-child) {
      margin-bottom: 1.2rem;
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
      border: 0.1rem solid #ccc;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #fff;
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
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 50%;
      }
    }
    input:checked + .slider {
      background-color: #007bff;
    }
    input:checked + .slider:before {
      transform: translateX(1.4rem) translateY(-50%);
      background-color: #fff;
    }
  }
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-top: 2px solid #007bff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
