<template>
  <div class="payment-form">
    <div class="payment-form__head">
      <p>Покупатель</p>
    </div>
    <div class="payment-form__action">
      <Inputs
        type="email"
        id="payment-email"
        label="Email"
        v-model="ticketHotel.email_address"
      />
      <InputsMask
        v-model="ticketHotel.phone_number"
        label="Номер телефона"
        type="text"
        mask="# (###) ###-##-##"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Inputs from "../ui/inputs/Inputs.vue";
import { useHotelStoreRefs } from "~/store/useHotelStore";
import InputsMask from "../ui/inputs/InputsMask.vue";

const { ticketHotel } = useHotelStoreRefs();
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
