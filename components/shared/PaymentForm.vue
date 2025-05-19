<template>
  <div class="payment-form">
    <div class="payment-form__head">
      <p>Ваши данные</p>
    </div>
    <div class="payment-form__action">
      <Inputs
        type="email"
        id="payment-email"
        label="Email"
        v-model="currentOrder.email"
      />
      <CustomSelectPhone v-model="currentOrder.phone_number" label="Номер телефона" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Inputs from "../ui/inputs/Inputs.vue";
import { useTicketStoreRefs } from "~/store/useTicketStore";
import CustomSelectPhone from "../ui/inputs/CustomSelectPhone.vue";

const { currentOrder } = useTicketStoreRefs();
</script>

<style scoped lang="scss">
.payment-form__action {
  @include flex-start;
  gap: 2rem;
  margin-bottom: 4rem;
}

.payment-form__head {
  margin-bottom: 2rem;
  font-size: 2rem;
  font-family: $font_2;

  @include bp($point_2) {
    font-size: 1.6rem;
  }
}
</style>
