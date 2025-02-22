<template>
  <ContentView
    title="Проверьте правильность введённых данных"
    :is-loading="false"
  >
    <div class="passenger-form">
      <div
        v-for="(tab, index) in ticket.adults"
        :key="index"
        class="accordion-item"
      >
        <div
          class="accordion-header"
          @click="toggleAccordion(index)"
          :class="{ active: activeAccordion === index }"
        >
          <p>Гость № {{ index + 1 }}</p>
          <div :class="['acc_icon', { active: activeAccordion === index }]">
            <Icon name="bxs:down-arrow" :size="12" />
          </div>
        </div>
        <transition
          name="accordion"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <div class="accordion-body" v-if="activeAccordion === index">
            <div class="form-grid">
              <Inputs
                label="Введите фамилию как в загранпаспорте"
                v-model="tab.last_name"
                :id="'lastName' + index"
              />
              <Inputs
                label="Введите имя как в загранпаспорте"
                v-model="tab.first_name"
                :id="'firstName' + index"
              />
              <Inputs
                type="date"
                label="Дата рождения"
                v-model="tab.birth_date"
                :id="'dateBirth' + index"
              />
              <InputsMask
                label="Номер загранпаспорта"
                v-model="tab.number_seria_passport"
                :id="route.params.id + 'passportNumber' + index"
                mask="##-## ###-###"
              />
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="bottom">
      <Checkbox
        id="agreement-hotel"
        label="Я соглашаюсь с условиями договора, правилами и условиями обработки и хранения персональных данных"
        value="Я соглашаюсь с условиями договора, правилами и условиями обработки и хранения персональных данных"
        v-model="agreement"
        name="agreement"
      />
      <p>
        Бронирование формируется в срок до 3-х часов. Лист бронирования
        официальной платформы направим на указанный электронный адрес не позднее
        19 ч МСК
      </p>
      <div class="row">
        <div class="price">
          <span>Общая стоимость</span>
          <p>600</p>
        </div>
        <btn name="Оплатить" theme="primary" @click="openModal('payment')" />
      </div>
    </div>
  </ContentView>
</template>

<script setup lang="ts">
import ContentView from "~/components/shared/ContentView.vue";
import Inputs from "~/components/ui/inputs/Inputs.vue";
import btn from "~/components/ui/buttons/btn.vue";
import Checkbox from "~/components/ui/inputs/Checkbox.vue";
import { ref, watch, computed } from "vue";
import { usePaymentsStore } from "~/store/usePaymentsStore";
import { useHotelStore, useHotelStoreRefs } from "~/store/useHotelStore";
import InputsMask from "~/components/ui/inputs/InputsMask.vue";
import { useModalStore } from "~/store/useModalStore";

const route = useRoute();
const { getHotelId } = useHotelStore();
const { ticket } = useHotelStoreRefs();
const { openModal } = useModalStore();

const agreement = ref<boolean>(false);
const activeTab = ref<any>(0);

// const setActiveTab = (index: number) => {
//   activeTab.value = index;
// };

const activeAccordion = ref<number | null>(0);

const toggleAccordion = (index: number) => {
  activeAccordion.value = activeAccordion.value === index ? null : index;
};

const beforeEnter = (el: any) => {
  el.style.height = "0";
  el.style.overflow = "hidden";
};

const enter = (el: any) => {
  el.style.transition = "height 0.3s ease";
  el.style.height = el.scrollHeight + "px";
};

const leave = (el: any) => {
  el.style.transition = "height 0.3s ease";
  el.style.height = el.scrollHeight + "px";
  requestAnimationFrame(() => {
    el.style.height = "0";
  });
};

onMounted(() => {
  getHotelId(route.params.id);
});
</script>

<style scoped lang="scss">
.header {
  margin-bottom: 3.2rem;
}
.passenger-form {
  margin: 0 auto 2.4rem auto;
  width: 100%;
  max-width: 94.8rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  .tab-links {
    @include flex-start;
    gap: 0.4rem;
    flex-wrap: wrap;
    font-size: 1.8rem;
    font-family: $font_2;
    margin-bottom: 2.4rem;

    @include bp($point_2) {
      font-size: 1.4rem;
    }

    .tab-link {
      background-color: $gray-light;
      border-radius: 0.8rem;
      color: $dark;
      padding: 1rem 0.8rem 0.8rem 0.8rem;
      cursor: pointer;
      &.active {
        color: $blue;
        background-color: #a2d0ff4a;
      }
    }
  }

  .tab-content {
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.4rem;
      margin-bottom: 2.4rem;
    }
  }

  .note {
    color: #999;
    margin-bottom: 2.4rem;
    font-size: 1.4rem;
  }

  .price {
    position: relative;
    &:after {
      font-family: "Arial";
      content: " ₽";
      font-weight: 500;
    }
  }

  .accordion-header {
    @include flex-space;
    font-size: 1.8rem;
    font-family: $font_3;
    cursor: pointer;

    @include bp($point_2) {
      font-size: 1.6rem;
    }
  }

  .acc_icon {
    @include flex-center;
    color: $blue;
    transition: all 0.3s ease-in-out;
    &.active {
      transform: rotate(180deg);
    }
  }

  .accordion-item {
    padding: 2.4rem;
    border: 0.1rem solid $light;
    border-radius: 1.6rem;

    @include bp($point_2) {
      padding: 1.6rem;
    }
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
    gap: 2.4rem;
    padding: 3rem 0 0 0;

    @include bp($point_2) {
      gap: 3rem 1rem;
    }
  }
}
.bottom {
  margin: 0 auto;
  width: 100%;
  max-width: 94.8rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  p {
    font-size: 1.4rem;
  }

  :deep(.checkbox) {
    font-size: 1.4rem;
  }
  .row {
    @include flex-space;
    span {
      font-size: 1.4rem;
      color: #999;
      display: block;
      margin-bottom: 0.8rem;
    }
    p {
      font-size: 3.2rem;
      font-weight: 500;
      font-family: $font_2;
    }
  }
}
</style>
