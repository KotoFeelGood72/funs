<template>
  <div class="modal">
    <div class="auth">
      <Close @close="closeAllModals" />
      <div class="auth_head">
        <h3>Вход в личный кабинет</h3>
        <p>Введите адрес почты, чтобы получить доступ к заказам</p>
      </div>
      <div class="auth_body">
        <Inputs v-model="email" label="E-Mail" id="auth-email" placeholder="Ваш e-mail"/>
      </div>
      <div class="auth_bottom">
        <btn name="Зарегистрироваться"  style="justify-content: center; width: 100%;" />
        <btn name="Войти" theme="primary" style="justify-content: center; width: 100%;" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Inputs from "~/components/ui/inputs/Inputs.vue";
import btn from "~/components/ui/buttons/btn.vue";
import Close from "~/components/ui/Close.vue";
import { useModalStore } from "~/store/useModalStore";
import { ref } from "vue";

const { closeAllModals } = useModalStore();

const email = ref<any>("");
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
  //   width: 100%;
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
</style>
