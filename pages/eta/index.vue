<template>
  <div class="eta">
    <ContentView :is-loading="false">
      <div class="eta__head">
        <eta />
      </div>
      <div class="eta_main">
        <div class="eta__forms">
          <div class="grid_data">
            <infoText
              :info="{
                icon: 'carbon:time',
                label: 'Одобрение до: 14 ноября 2024',
                notice:
                  'Требуется подать заявку минимум за 4 дня, максимум за 30 дней до прибытия.',
              }"
            />
            <infoText
              :info="{
                icon: 'solar:map-point-outline',
                label: 'Макс. время посещения: 30 д.',
                notice:
                  'Требуется подать заявку минимум за 4 дня, максимум за 30 дней до прибытия.',
              }"
            />
            <infoText
              :info="{
                icon: 'uiw:date',
                label: 'Срок действия: 90 д.',
                notice:
                  'Требуется подать заявку минимум за 4 дня, максимум за 30 дней до прибытия.',
              }"
            />
            <infoText
              :info="{
                icon: 'pepicons-pencil:internet',
                label: 'Цель поездки: любая',
                notice:
                  'Требуется подать заявку минимум за 4 дня, максимум за 30 дней до прибытия.',
              }"
            />
          </div>

          <div class="eta_forms__change">
            <div class="eta_selects">
              <Select
                :options="isListCurrentVisaType"
                v-model="visaId"
                label="Выберите тип"
              />
            </div>
            <div class="eta__price">14 900 ₽</div>
          </div>
          <div class="notice">
            По требованию Бюро иммиграции, мы просим вас раскрыть туристическую цель
            поездки в Индию более подробно. Пожалуйста, отметьте один из пунктов в
            качестве вашей основной цели:
          </div>

          <div v-if="currentVisaPurposes.length" class="eta__purposes">
            <ul class="eta_visaPurposes__list">
              <li
                v-for="purpose in currentVisaPurposes"
                :key="purpose.id"
                class="eta_visaPurposes__list__item"
              >
                <input
                  type="radio"
                  :id="'purpose-' + purpose.id"
                  :value="purpose.id"
                  v-model="visaPurposeId"
                />
                <label :for="'purpose-' + purpose.id">
                  <div class="purpose_icon">
                    <Icon
                      :size="22"
                      :name="
                        visaPurposeId === purpose.id
                          ? 'ic:round-radio-button-checked'
                          : 'ic:round-radio-button-unchecked'
                      "
                    />
                  </div>
                  <p>{{ purpose.name }}</p>
                </label>
              </li>
            </ul>
            <div class="notice">
              Эти сведения будут указаны в E-визе. Сотрудник иммиграционной службы Индии
              имеет право потребовать от вас подтверждение целей визита, а также обратный
              билет и подтверждение проживания в отеле.
            </div>
            <div class="action">
              Оформите <NuxtLink to="/">проверяемое бронирование для авиа</NuxtLink>, или
              <NuxtLink to="/">бронирование отеля без его полной оплаты</NuxtLink> с нашим
              сервисом.
            </div>
          </div>
          <div class="documents">
            <h2 class="documents__toggle" @click="isDocumentsOpen = !isDocumentsOpen">
              Условия и документы
              <Icon
                :name="isDocumentsOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                class="chevron"
                size="20"
              />
            </h2>

            <div
              v-show="isDocumentsOpen"
              class="documents__content"
              v-html="visaList.conditions_and_document"
            />
          </div>
        </div>

        <div class="eta__img">
          <img src="@/assets/img/eta.jpg" alt="" />
        </div>
      </div>
    </ContentView>
  </div>
</template>

<script setup lang="ts">
import Select from "~/components/ui/inputs/Select.vue";
import eta from "~/components/ui/filters/eta.vue";
import ContentView from "~/components/shared/ContentView.vue";
import infoText from "~/components/ui/info-text.vue";
import { useETAStoreRefs } from "~/store/useETAStore";
import { ref, computed, watch } from "vue";

const { visaList, visaId } = useETAStoreRefs();

const visaPurposeId = ref<number | null>(null);
const isDocumentsOpen = ref(false);

const isListCurrentVisaType = computed(() =>
  visaList?.value.visa_types.map((el: any) => ({
    name: el.name,
    value: el.id,
  }))
);

// Получение целей визита по выбранной визе
const currentVisaPurposes = computed(() => {
  const selectedVisa = visaList.value.visa_types?.find((v: any) => v.id === visaId.value);
  return selectedVisa?.visa_purposes || [];
});

// Сброс выбранной цели при смене типа визы
watch(visaId, () => {
  visaPurposeId.value = null;
});
</script>

<style scoped lang="scss">
.eta_main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  gap: 3.2rem;
}

.eta__img {
  img {
    width: 100%;
  }
}

.grid_data {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  grid-gap: 2.4rem;
  margin-bottom: 2.4rem;
}

.eta__head {
  margin-bottom: 3.2rem;
}

.eta_forms__change {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  margin-bottom: 1.6rem;
}

.eta__price {
  @include flex-start;
  border-bottom: 0.1rem solid $blue;
  color: $blue;
  font-family: $font_2;
  padding-left: 2.8rem;
}

.eta_visaPurposes__list {
  padding: 1.6rem 0;
}

.eta_visaPurposes__list__item {
  border-bottom: 0.1rem solid rgba(162, 208, 255, 0.2);
  input {
    display: none;
    &:checked + label {
      background-color: rgba(162, 208, 255, 0.2);

      .purpose_icon {
        color: $blue;
      }
      color: $blue;
    }
  }

  label {
    position: relative;
    padding-left: 4rem;
    cursor: pointer;
    display: flex;
    padding: 1.6rem;
    font-size: 1.6rem;
    gap: 1.6rem;
  }
}

.purpose_icon {
  @include flex-center;
  color: $light;
}

.notice {
  font-size: 1.4rem;
}

.documents {
  border: 0.1rem solid $light;
  border-radius: 1.6rem;
  &:deep(h3) {
    font-size: 1.6rem;
    font-family: $font_2;
    font-weight: 600;
    padding: 1.6rem 0;
  }

  &:deep(ul) {
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: disc;
    padding-left: 2rem;
  }
  &:deep(li) {
    list-style: disc;
  }

  &:deep(p),
  &:deep(strong) {
    font-size: 1.6rem;
    font-family: $font_2;
    font-weight: 400;
    padding: 0.5rem 0;
  }
}

.documents__toggle {
  @include flex-space;
  padding: 1.6rem;
}

.documents__content {
  padding: 0 1.6rem 1.6rem 1.6rem;
}
</style>
