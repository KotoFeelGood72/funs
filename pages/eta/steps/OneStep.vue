<template>
  <ContentView :is-loading="loading && visa">
    <div class="eta__head">
      <VisaFilterForm />
    </div>
    <div class="eta_main">
      <div class="eta__forms">
        <div class="grid_data">
          <infoText
            :info="{
              icon: 'carbon:time',
              label: 'Одобрение до: ' + currentVisa?.processing_time,
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
              label: 'Срок действия: ' + currentVisa?.duration_days + ' д.',
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
              v-if="isListCurrentVisaType"
              :options="isListCurrentVisaType"
              v-model="visaId"
              placeholder="Выберите тип"
            />
          </div>
          <div class="eta__price">{{ currentVisa?.price || "—" }} ₽</div>
        </div>
        <div class="notice">
          По требованию Бюро иммиграции, мы просим вас раскрыть туристическую цель поездки
          в Индию более подробно. Пожалуйста, отметьте один из пунктов в качестве вашей
          основной цели:
        </div>
        <visa_short_form
          v-if="currentVisa && currentVisa.visa_form"
          v-model="dynamicForm"
          :fields="currentVisa.visa_form.fields"
          ref="visaFormRef"
          class="visa_form"
        />
        <div v-if="currentVisa?.visa_purposes?.length" class="eta__purposes">
          <ul class="eta_visaPurposes__list">
            <li
              v-for="purpose in currentVisa.visa_purposes"
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
            Оформите
            <NuxtLink to="/">проверяемое бронирование для авиа</NuxtLink>, или
            <NuxtLink to="/">бронирование отеля без его полной оплаты</NuxtLink>
            с нашим сервисом.
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
            v-html="visa?.conditions_and_document"
          />
        </div>
        <div class="row">
          <div class="price">
            <span>Общая стоимость</span>
            <p>{{ currentVisa?.price || "—" }} ₽</p>
          </div>
          <btn name="Далее" theme="primary" @click="submitVisa()" />
        </div>
      </div>

      <div class="eta__img">
        <img :src="visa?.country_image" alt="" />
      </div>
    </div>
  </ContentView>
</template>

<script setup lang="ts">
import Select from "~/components/ui/inputs/Select.vue";
import ContentView from "~/components/shared/ContentView.vue";
import infoText from "~/components/ui/info-text.vue";
import btn from "~/components/ui/buttons/btn.vue";
import visa_short_form from "~/components/forms/visa_short_form.vue";
import VisaFilterForm from "@/components/ui/filters/VisaFilterForm.vue";

import { useRoute, useRouter } from "vue-router";
import { useETAStoreRefs, useETAStore } from "~/store/useETAStore";
import { ref, computed, watch, onMounted } from "vue";
import { api } from "~/api/api";

const { visa, visaId, loading } = useETAStoreRefs();
const { getVisaById, nextStep, getVisaByIdForm } = useETAStore();

const visaPurposeId = ref<number | null>(null);
const isDocumentsOpen = ref(false);
const route = useRoute();
const router = useRouter();

// СОЗДАЁМ ref для данных динамической формы
const visaFormRef = ref<{
  validate: () => boolean;
} | null>(null);
const dynamicForm = ref<Record<string, any>>({});

// Когда меняется тип визы – инициализируем пустой объект со всеми ключами

const isListCurrentVisaType = computed(
  () =>
    visa.value?.visa_types?.map((el: any) => ({
      label: el.name,
      value: el.id,
    })) ?? []
);

const currentVisa = computed(() => {
  if (!visa.value?.visa_types) return null;
  return visa.value.visa_types.find((v: any) => v.id === visaId.value) || null;
});

// при переключении визы — сбрасываем цель и форму
watch(visaId, () => {
  visaPurposeId.value = null;
  getVisaByIdForm(visaId.value);
});

onMounted(async () => {
  if (route.query.request_id) {
    await getVisaById(route.query.request_id);
    if (visa.value?.visa_types?.length && visaId?.value === null) {
      visaId.value = visa?.value?.visa_types[0]?.id;
    }
  }
});

watch(
  () => currentVisa.value?.visa_form,
  (formDef) => {
    if (formDef) {
      dynamicForm.value = formDef.fields.reduce(
        (acc: any, f: any) => ({ ...acc, [f.name]: "" }),
        {}
      );
    }
  },
  { immediate: true }
);

// const goToTheFormNextStep = async (id: number) => {
//   // проверяем валидацию
//   if (visaFormRef.value && !visaFormRef.value.validate()) {
//     // можно прокрутить к первой ошибке или вывести общий тост
//     return;
//   }

//   await nextStep(router, route, visaId.value);
// };

const submitVisa = async () => {
  if (!visaId.value || (visaFormRef.value && !visaFormRef.value.validate())) {
    console.log("Good");
    return;
  }

  // клонируем, чтобы избавиться от Proxy
  const payload: any = {};
  if (currentVisa.value?.visa_form) {
    payload.formData = { ...dynamicForm.value };
  } else if (visaPurposeId.value !== null) {
    payload.purpose_id = visaPurposeId.value;
  }

  try {
    await api.post(`/eta/${route.query.request_id}`, payload);
    console.log("Отправили:", payload);
    nextStep(router, route, visaId.value!.toString());
  } catch (err) {
    console.error("Ошибка отправки:", err);
  }
};
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
  // border-bottom: 0.1rem solid $blue;
  color: $blue;
  font-family: $font_2;
  padding-left: 2.8rem;
}

.eta_visaPurposes__list {
  padding: 1.6rem 0;
}

.eta_visaPurposes__list__item {
  border-bottom: 0.1rem solid rgba(162, 208, 255, 0.2);
  @include flex-start;
  width: 100%;

  p {
    line-height: 0;
    @include flex-start;
  }
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
    width: 100%;
  }
}

.purpose_icon {
  @include flex-center;
  color: $light;
}

.notice {
  font-size: 1.4rem;
  padding: 1.6rem 0;
}

.documents {
  border: 0.1rem solid $light;
  border-radius: 1.6rem;
  margin-bottom: 2.4rem;
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

.action {
  padding: 1.6rem 0;
  a {
    color: $blue;
  }
}

.row {
  @include flex-space;

  p {
    font-size: 2.4rem;
    font-family: $font_2;
    font-weight: 600;
  }
}

.visa_form {
  padding: 2rem 0;
}
</style>
