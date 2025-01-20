<template>
  <ContentView :title="isHotelCity" :isLoading="isLoading">
    <div class="header">
      <hotel />
    </div>
    <div
      class="passenger-form"
      v-if="hotelData.adults.length > 0 || hotelData.children.length > 0"
    >
      <PassengerTabs
        :tabs="computedTabs"
        :activeTab="activeTab"
        @update:activeTab="setActiveTab"
      />
      <div class="tab-content">
        <div class="form-grid" v-if="activeTabData">
          <Inputs
            label="Введите фамилию как в загранпаспорте"
            v-model="activeTabData.last_name"
            :id="'lastName' + activeTab"
          />
          <Inputs
            label="Введите имя как в загранпаспорте"
            v-model="activeTabData.first_name"
            :id="'firstName' + activeTab"
          />
          <DatePicker :disablePast="true" v-model="activeTabData.birth_date" />
          <Inputs
            label="Email"
            type="email"
            v-model="activeTabData.email"
            :id="'email' + activeTab"
            icon="f:email"
            v-if="activeTabData.type === 'adult'"
          />

          <Select
            :options="['Россия', 'Украина', 'Беларусь']"
            v-model="activeTabData.citizenship"
            label="Выберите объект проживания"
            v-if="activeTabData.type === 'adult'"
          />
          <Select
            :options="['Россия', 'Украина', 'Беларусь']"
            v-model="activeTabData.hotel_class"
            label="Выберите класс"
            v-if="activeTabData.type === 'adult'"
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
                name: 'hotels-id-confirmId',
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
import { computed, ref } from "vue";
import { useFiltersStoreRefs } from "~/store/useFilterStore";

const isLoading = ref<boolean>(true);
const router = useRouter();
const { hotelData } = useFiltersStoreRefs();

const activeTab = ref<number>(0);

const setActiveTab = (index: number) => {
  activeTab.value = index;
};

const isHotelCity = computed(() => {
  return hotelData.value && hotelData.value.city
    ? `Отели в ${hotelData.value.city.name}`
    : "Отели";
});

const computedTabs = computed(() => {
  const tabs: any = [];

  hotelData.value.adults.forEach((adult: any, index: number) => {
    tabs.push({
      label: `Пассажир №${index + 1}, эконом`, // Добавление номера и класса
      type: "adult",
      index,
      ...adult,
    });
  });

  hotelData.value.children.forEach((child: any, index: number) => {
    tabs.push({
      label: `Пассажир №${index + hotelData.value.adults.length + 1}, эконом`, // Продолжение нумерации для детей
      type: "child",
      index,
      ...child,
    });
  });

  return tabs;
});

// const activeTabData = computed(() => {
//   const currentTab = computedTabs.value[activeTab.value];
//   if (currentTab) {
//     if (currentTab.type === "adult") {
//       return { ...hotelData.value.adults[currentTab.index], type: "adult" };
//     } else if (currentTab.type === "child") {
//       return { ...hotelData.value.children[currentTab.index], type: "child" };
//     }
//   }
//   return null;
// });

// const activeTabData = computed(() => {
//   const currentTab = computedTabs.value[activeTab.value];
//   if (currentTab) {
//     if (currentTab.type === "adult") {
//       return hotelData.value.adults[currentTab.index];
//     } else if (currentTab.type === "child") {
//       return hotelData.value.children[currentTab.index];
//     }
//   }
//   return null;
// });

const activeTabData = computed(() => {
  const currentTab = computedTabs.value[activeTab.value];
  if (currentTab) {
    if (currentTab.type === "adult") {
      return hotelData.value.adults[currentTab.index]; // Возвращаем ссылку на объект
    } else if (currentTab.type === "child") {
      return hotelData.value.children[currentTab.index]; // Возвращаем ссылку на объект
    }
  }
  return null;
});

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
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
    font-size: 1.8rem;
    margin-bottom: 2.4rem;

    .tab-link {
      background-color: #e0e0e0;
      border-radius: 0.8rem;
      color: #6a6a6a;
      padding: 1rem 0.8rem;
      cursor: pointer;

      &.active {
        color: #007bff;
        background-color: rgba(173, 216, 230, 0.5);
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
      }
    }
  }
}

.price {
  position: relative;
  &:after {
    content: " ₽";
    font-weight: 500;
  }
}
</style>
