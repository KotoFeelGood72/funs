<template>
  <div class="profile">
    <div class="small-container">
      <div class="header">
        <h3>Заполните данные профиля для доступа к заказам</h3>
      </div>
      <div class="profile-form">
      <Inputs placeholder="Введите фамилию" label="Фамилия"/>
      <Inputs placeholder="Введите имя" label="Имя"/>
      <Inputs placeholder="Введите адрес электронной почты (обязательно)" label="Email"/>
      <Inputs placeholder="Введите номер телефона" label="Номер телефона"/>
      </div>
      <Checkboxes
          :id="'agreement-profile-edit'"
          :label="'Я соглашаюсь с условиями договора, правилами и условиями обработки и хранения персональных данных'"
          :value="'Я соглашаюсь с условиями договора, правилами и условиями обработки и хранения персональных данных'"
          name="transfers"
        />
        <div class="footer">
        <btn name="Отменить" size="normal"/>
        <btn name="Сохранить" size="normal" theme="primary"/>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Inputs from '~/components/ui/inputs/Inputs.vue';
import Checkboxes from '~/components/ui/inputs/Checkboxes.vue';
import btn from '~/components/ui/buttons/btn.vue';
</script>

<style scoped lang="scss">
.header {
  margin-bottom: 3.2rem;
  padding-top: 3.2rem;
  h3 {
    font-family: $font_1;
    font-size: 2.4rem;
    text-align: center;
  }
}

.profile-form {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  grid-gap: 2.4rem;
  margin-bottom: 2.4rem;
}

.profile {
  :deep(label) {
    font-size: 1.4rem;
  }
}

.footer {
  @include flex-end;
  gap: 1.6rem;
  padding-top: 2.4rem;
}
</style>
