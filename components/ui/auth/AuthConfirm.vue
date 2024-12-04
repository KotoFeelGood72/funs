<template>
  <div class="modal">
    <div class="auth">
      <Close @close="closeAllModals" />
      <div class="auth_head">
        <h3>Вход в личный кабинет</h3>
        <p>Введите код из электронной почты</p>
      </div>
      <div class="auth_body">
        <div class="otp-inputs">
          <input
            v-for="(value, index) in otp"
            :key="index"
            type="text"
            maxlength="1"
            class="otp-input"
            v-model="otp[index]"
            @input="onInput(index, $event)"
            @keydown.backspace="onBackspace(index)"
          />
        </div>
      </div>
      <div class="auth_bottom">
        <btn name="Подтвердить" theme="primary" size="large" @click="verifyOtp" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import btn from "~/components/ui/buttons/btn.vue";
import Close from "~/components/ui/Close.vue";
import { useModalStore } from "~/store/useModalStore";
import { ref } from "vue";

const { closeAllModals } = useModalStore();

const otp = ref(Array(6).fill("")); // Массив для хранения символов OTP

// Обработка ввода символа
const onInput = (index: number, event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.value.length === 1 && index < otp.value.length - 1) {
    const nextInput = input.nextElementSibling as HTMLInputElement;
    nextInput?.focus();
  }
};

// Обработка нажатия клавиши Backspace
const onBackspace = (index: number) => {
  if (index > 0 && otp.value[index] === "") {
    const previousInput = document.querySelectorAll(".otp-input")[index - 1] as HTMLInputElement;
    previousInput?.focus();
  }
};

// Проверка OTP
const verifyOtp = () => {
  const code = otp.value.join("");
  console.log("OTP код:", code);
  // Логика проверки кода
};
</script>

<style scoped lang="scss">
.auth {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  background-color: $white;
  border-radius: 3.2rem;
  padding: 3.2rem;
  text-align: center;
  width: 62.6rem;
  position: relative;

  h3 {
    font-size: 2.4rem;
    margin-bottom: 1.6rem;
  }

  p {
    color: $gray;
    font-size: 1.6rem;
  }
}

.otp-inputs {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.otp-input {
  width: 4rem;
  height: 5rem;
  text-align: center;
  font-size: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }
}
</style>