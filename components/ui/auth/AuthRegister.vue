<template>
  <div class="auth">
    <div class="auth_head">
      <h3>Вход в личный кабинет</h3>
      <p>Введите адрес почты, чтобы получить доступ к заказам</p>
    </div>
    <div class="auth_body">
      <Inputs
        v-model="email"
        label="E-Mail"
        id="auth-email"
        placeholder="Ваш e-mail"
        style="align-items: flex-start"
      />
      <PasswordInput
        label="Пароль"
        type="password"
        v-model="password"
        placeholder="Пароль"
      />
      <PasswordInput
        label="Подтверждение"
        type="password"
        placeholder="Подтверждение пароля"
        v-model="confirmPassword"
        :confirmationValue="password"
      />
    </div>
    <div class="auth_bottom">
      <btn
        name="Зарегистрироваться"
        style="justify-content: center; width: 100%"
        @click="register"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Inputs from "~/components/ui/inputs/Inputs.vue";
import PasswordInput from "../inputs/PasswordInput.vue";
import btn from "~/components/ui/buttons/btn.vue";
import { ref, defineEmits } from "vue";

const email = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");

const emit = defineEmits(["register"]);

const register = () => {
  emit("register", email.value);
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

.auth_bottom {
  @include flex-start;
  gap: 2rem;
}

.auth_body {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}
</style>
