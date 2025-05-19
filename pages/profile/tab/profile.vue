<template>
  <div class="profile">
    <div class="small-container">
      <div class="header">
        <h3>Заполните данные профиля для доступа к заказам</h3>
      </div>
      <div class="profile-form">
        <Inputs label="Имя" v-model="user.first_name" />
        <Inputs label="Фамилия" v-model="user.last_name" />
        <Inputs label="Email" v-model="user.email" />
        <CustomSelectPhone label="Номер телефона" v-model="user.phone_number" />
      </div>
      <Checkboxes
        :id="'agreement-profile-edit'"
        :label="'Я соглашаюсь с условиями договора, правилами и условиями обработки и хранения персональных данных'"
        :value="'Я соглашаюсь с условиями договора, правилами и условиями обработки и хранения персональных данных'"
        name="transfers"
      />
      <div class="footer">
        <btn name="Отменить" size="normal" />
        <btn
          name="Сохранить"
          size="normal"
          theme="primary"
          @click="updateProfile"
          :loading="isLoading"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Inputs from "~/components/ui/inputs/Inputs.vue";
import Checkboxes from "~/components/ui/inputs/Checkboxes.vue";
import btn from "~/components/ui/buttons/btn.vue";
import { useAuth } from "~/composables/useAuth";
import CustomSelectPhone from "~/components/ui/inputs/CustomSelectPhone.vue";

const { updateProfile, user, getProfile, isLoading } = useAuth();
</script>

<style scoped lang="scss">
.header {
  margin-bottom: 3.2rem;
  padding-top: 3.2rem;
  @include bp($point_2) {
    padding-top: 0;
  }
  h3 {
    font-family: $font_2;
    font-weight: 500;
    font-size: 2.4rem;
    text-align: center;

    @include bp($point_2) {
      font-size: 2rem;
    }
  }
}

.profile-form {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  grid-gap: 2.4rem;
  margin-bottom: 2.4rem;

  @include bp($point_2) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    grid-gap: 2rem;
  }
}

.profile {
  // :deep(label) {
  //   font-size: 1.4rem;
  // }
}

.footer {
  @include flex-end;
  gap: 1.6rem;
  padding-top: 2.4rem;

  @include bp($point_2) {
    justify-content: space-between;
  }
}
</style>
