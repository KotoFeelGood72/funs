<template>
  <div class="modal">
    <div class="auth">
      <Close />
      <div class="auth_head">
        <h3>Вход в личный кабинет</h3>
        <p>Введите адрес почты, чтобы получить доступ к заказам</p>
      </div>
      <div class="auth_body">
        <Inputs
          v-model="email"
          placeholder="E-Mail"
          id="auth-email"
          :disabled="isLoading"
        />
        <Inputs
          v-model="password"
          placeholder="Пароль"
          id="auth-password"
          type="password"
          :disabled="isLoading"
        />
      </div>
      <div class="auth_bottom">
        <btn
          :name="isLoading ? 'Загрузка…' : 'Авторизоваться'"
          style="justify-content: center; width: 100%"
          @click="login"
          :loading="isLoading"
          :disabled="isLoading"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Inputs from "~/components/ui/inputs/Inputs.vue";
import btn from "~/components/ui/buttons/btn.vue";
import Close from "~/components/ui/Close.vue";
import { useModalStore } from "~/store/useModalStore";
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/useAuth";

const store = useModalStore();
const router = useRouter();

const { email, password, login, isLoading } = useAuth(store, router);
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
  transition: all 0.3s ease-in-out;
  position: relative;

  @include bp($point_2) {
    width: 95%;
  }

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
  gap: 2rem;
}
</style>
