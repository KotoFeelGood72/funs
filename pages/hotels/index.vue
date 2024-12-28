<template>
  <ContentView :title="isHotelCity" :isLoading="isLoading">
    <div class="header">
      <hotel />
    </div>
    <div class="passenger-form" v-if="tabs.length > 0">
      <PassengerTabs
        :tabs="tabs"
        :activeTab="activeTab"
        @update:activeTab="setActiveTab"
      />
      <div class="tab-content">
        <div class="form-grid">
          <Inputs
            label="Введите фамилию как в загранпаспорте"
            v-model="hotelData.adults[activeTab].last_name"
            :id="'lastName' + activeTab"
          />
          <Inputs
            label="Введите имя как в загранпаспорте"
            v-model="hotelData.adults[activeTab].first_name"
            :id="'firstName' + activeTab"
          />
          <DatePicker
            :disablePast="true"
            v-model="hotelData.adults[activeTab].birth_date"
          />
          <Inputs
            label="Email"
            type="email"
            v-model="hotelData.adults[activeTab].email"
            :id="'email' + activeTab"
            icon="email"
          />
          <Select
            :options="['Россия', 'Украина', 'Беларусь']"
            v-model="hotelData.adults[activeTab].citizenship"
            label="Выберите объект проживания"
          />
          <Select
            :options="['Россия', 'Украина', 'Беларусь']"
            v-model="hotelData.adults[activeTab].hotel_class"
            label="Выберите класс"
          />
        </div>
        <div class="note">
          <p>Отель без полной предоплаты для подачи на визу.</p>
          <p>Проверяемое бронирование на срок до 14 дней.</p>
          <p>
            Соответствует требованиям большинства консульств о предоставлении
            листа бронирования
          </p>
        </div>
        <div class="bottom">
          <div class="total">
            <span>Общая стоимость</span>
            <p class="price">550</p>
          </div>
          <btn
            name="Далее"
            theme="primary"
            size="normal"
            @click="
              router.push({
                name: 'hotel-id-confirmId',
                params: { id: 1, confirmId: 2 },
              })
            "
          />
        </div>
      </div>
    </div>
  </ContentView>
</template>

<script setup lang="ts">
import ContentView from "~/components/shared/ContentView.vue";
import Inputs from "~/components/ui/inputs/Inputs.vue";
import btn from "~/components/ui/buttons/btn.vue";
import DatePicker from "~/components/ui/inputs/DatePicker.vue";
import Select from "~/components/ui/inputs/Select.vue";
import PassengerTabs from "~/components/ui/PassengerTabs.vue";
import hotel from "~/components/ui/filters/hotel.vue";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import { useFiltersStoreRefs } from "~/store/useFilterStore";

const isLoading = ref<boolean>(true);
const router = useRouter();
const { hotelData } = useFiltersStoreRefs();

const tabs = ref<any>([]);
const activeTab = ref<any>(0);

const setActiveTab = (index: number) => {
  activeTab.value = index;
};

const isHotelCity = computed(() => {
  "Отели в " + hotelData.value.city.name;
});

// Функция для обновления вкладок
const updateTabs = () => {
  tabs.value = [];

  // Добавляем взрослых
  hotelData.value.adults.forEach((adult: any, index: any) => {
    tabs.value.push({
      ...adult,
      type: "adult",
      label: `Взрослый ${index + 1}`,
    });
  });

  // Добавляем детей
  hotelData.value.children.forEach((child: any, index: any) => {
    tabs.value.push({
      ...child,
      type: "child",
      label: `Ребёнок ${index + 1}`,
    });
  });
};

// Следим за изменениями данных
watch(
  () => [hotelData.value.adults, hotelData.value.children],
  () => {
    updateTabs();
  },
  { immediate: true }
);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false; // Убираем состояние загрузки
  }, 2000);
});
</script>

<style scoped lang="scss">
.header {
  margin-bottom: 3.2rem;
}
.passenger-form {
  margin: 0 auto;
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

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1.6rem;

    .total {
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
}

.price {
  position: relative;
  &:after {
    font-family: "Arial";
    content: " ₽";
    font-weight: 500;
  }
}
</style>
