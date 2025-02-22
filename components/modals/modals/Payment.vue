<template>
  <div class="modal">
    <div class="payments">
      <Close />
      <div class="payments__head">
        <h3>Выберите способ оплаты</h3>
        <p>
          Бронирование сформируется в течение нескольких минут и поступит на
          указанный email, а также станет доступным в вашем личном кабинете.
        </p>
      </div>
      <div class="payments__body">
        <ul>
          <li
            v-for="(method, index) in paymentMethods"
            :key="index"
            class="payment__btn"
            :class="{ selected: selectedMethod === method }"
            @click="selectMethod(method)"
          >
            {{ method }}
          </li>
        </ul>
      </div>

      <div class="payments__bottom">
        <btn
          name="Подтвердить"
          theme="blue"
          :disabled="!selectedMethod"
          style="justify-content: center"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import btn from "~/components/ui/buttons/btn.vue";
import Close from "~/components/ui/Close.vue";

// Доступные методы оплаты
const paymentMethods = ref([
  "Оплата банковской картой (Россия)",
  "Оплата банковской картой (Все страны мира)",
  "Оплата по QR-коду (СБП Пэй)",
]);

// Выбранный метод оплаты
const selectedMethod = ref<string | null>(null);

// Функция выбора метода
const selectMethod = (method: string) => {
  selectedMethod.value = method;
};
</script>

<style scoped lang="scss">
.payments {
  background-color: $white;
  max-width: 62.6rem;
  border-radius: 3.2rem;
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @include bp($point_2) {
    max-width: 95%;
    padding: 3.2rem 1.6rem;
    border-radius: 1rem;
  }
}

.payments__head {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  text-align: center;

  h3 {
    font-size: 2.4rem;
  }
  p {
    color: #757575;
    font-size: 1.6rem;

    @include bp($point_2) {
      font-size: 1.4rem;
    }
  }
}

.payments__body {
  ul {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    @include bp($point_2) {
      gap: 1rem;
    }

    li {
      border: 0.1rem solid #a2d0ff33;
      padding: 1.2rem;
      font-size: 1.6rem;
      font-family: $font_2;
      color: $blue;
      text-align: center;
      border-radius: 0.4rem;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      @include bp($point_2) {
        font-size: 1.4rem;
      }

      &:hover {
        background-color: #a2d0ff33;
      }

      &.selected {
        background-color: $light;
        color: $blue;
        font-family: $font_2;
      }
    }
  }
}
</style>
