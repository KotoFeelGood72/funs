<template>
  <ContentView :is-loading="false">
    <VisaHeadSteps :title="formShema?.country_name + ' - ' + formShema?.visa_name" />
    <form class="visa-security-form">
      <div class="questions">
        <RadioButtons
          v-for="question in questions?.fields.filter((f: any) => f.type === 'select')"
          :key="question.name"
          :id="question.name"
          :label="question.description"
          :options="question.options"
          v-model="answers[question.name]"
        />
        <div class="question_btn">
          <btn
            class="mt-6"
            variant="primary"
            @click="handleSubmitSecurityAnswers"
            name="Подветрдить"
          />
        </div>
      </div>
      <div class="questions__details">
        <div class="question__quote">
          <p>Вы ответили положительно – вы уверены?</p>
          <p>Если вы оставили «Да» ошибочно, переставьте ответ на корректный.</p>
          <p>Если вы уверены, просьба указать сведения:</p>
        </div>
        <Inputs v-model="confirmationDetails" placeholder="Укажите сведения" />
      </div>
      <Checkbox
        id="agreement-hotel"
        label="Настоящим я заявляю, что предоставленная выше информация соответствует действительности. В случае, если на каком-либо этапе информация будет признана ложной, я буду нести ответственность за судебный иск / депортацию / внесение в черный список или любые другие действия, которые правительство Индии сочтет необходимыми. Я соглашаюсь с правилами и условиями Funbooking по обработке и передаче указанных сведений, по правилам приобретения и порядку оплаты услуг."
        value="true"
        v-model="agreement"
        name="agreement"
      />
      <div class="upload-section mt-6">
        <p>Пожалуйста, загрузите документы согласно перечня:</p>

        <div class="upload-boxes">
          <UploadBox
            v-for="doc in formShema?.required_documents"
            :key="doc.name"
            :text="doc.description"
            :accept="acceptMap[doc.name] || '*/*'"
            :maxSizeKb="maxSizeMap[doc.name] || 1024"
            @file-selected="(files: any) => onFileSelected(doc.name, files)"
          />
        </div>
      </div>

      <div class="footer_bottom">
        <p>
          Funbooking свяжется с вами по электронной почте в случае вопросов к изложенным
          сведениям или содержанию приложенных документов. Нажимая «Загрузить» вы
          соглашаетесь с Правилами обработки персональных данных.
        </p>
        <btn class="mt-6" variant="primary" @click="goNext" name="Перейти к обзору"></btn>
      </div>
    </form>
  </ContentView>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import ContentView from "~/components/shared/ContentView.vue";
import RadioButtons from "~/components/ui/inputs/RadioButtons.vue";
import btn from "~/components/ui/buttons/btn.vue";
import Inputs from "~/components/ui/inputs/Inputs.vue";
import UploadBox from "~/components/ui/inputs/UploadBox.vue";
import VisaHeadSteps from "~/components/ui/VisaHeadSteps.vue";
import Checkbox from "~/components/ui/inputs/Checkbox.vue";
import { useETAStore, useETAStoreRefs } from "~/store/useETAStore";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();

const toast = useToast();
const isConfirmed = ref(false);

const {
  getVisaByIdForm,
  submitSecurityAnswers,
  getSecurityQuestions,
  uploadFileVisa,
} = useETAStore();
const { questions, formShema } = useETAStoreRefs();

const answers = ref<Record<string, string>>({});
const uploadedFiles = ref<Record<string, File[]>>({});
const agreement = ref(false);
const confirmationDetails = ref("");

const acceptMap: Record<string, string> = {
  passport_scan: "application/pdf",
  photo: "image/jpeg",
};

const maxSizeMap: Record<string, number> = {
  passport_scan: 300,
  photo: 1024,
};

function onFileSelected(name: string, files: File[]) {
  uploadedFiles.value[name] = files;
  console.log(name, files);
}

async function handleSubmitSecurityAnswers() {
  const applicationId = route.query.application_id;
  if (!applicationId) {
    toast.error("Отсутствует ID заявки.");
    return;
  }

  const requiredFields = questions?.value?.fields.filter((f: any) => f.required);
  const missingAnswers = requiredFields?.some((f: any) => answers.value[f.name] == null);

  if (missingAnswers) {
    toast.info("Пожалуйста, ответьте на все обязательные вопросы.");
    return;
  }

  const payload: Record<string, any> = {};
  for (const key in answers.value) {
    const val = answers.value[key];
    payload[key] = val === "Да" ? true : val === "Нет" ? false : val;
  }

  payload.confirmation_details = confirmationDetails.value || null;

  try {
    const result = await submitSecurityAnswers(Number(applicationId), payload);
    isConfirmed.value = true;

    console.log("Ответ отправлен, результат:", result);
    toast.success("Ответы успешно сохранены.");
  } catch (err) {
    toast.error("Не удалось сохранить ответы. Попробуйте позже.");
  }
}

async function goNext() {
  const applicationId = route.query.application_id;
  if (!applicationId) {
    toast.error("Отсутствует ID заявки.");
    return;
  }

  if (!isConfirmed.value) {
    toast.info("Сначала подтвердите ответы на вопросы.");
    return;
  }

  if (!agreement.value) {
    toast.info("Вы должны согласиться с условиями.");
    return;
  }

  const requiredFields = questions?.value?.fields.filter((f: any) => f.required);
  const missingAnswers = requiredFields?.some((f: any) => answers.value[f.name] == null);

  if (missingAnswers) {
    toast.info("Пожалуйста, ответьте на все обязательные вопросы.");
    return;
  }

  const payload: Record<string, any> = {};

  for (const key in answers.value) {
    const val = answers.value[key];
    if (val === "Да") payload[key] = true;
    else if (val === "Нет") payload[key] = false;
    else payload[key] = val;
  }

  payload.confirmation_details = confirmationDetails.value || null;

  try {
    // 1. Отправка ответов на вопросы безопасности
    // await submitSecurityAnswers(Number(applicationId), payload);

    // 2. Получение и загрузка документов
    const files = uploadedFiles.value;

    const photo = files["photo"]?.[0];
    const passport = files["passport_scan"]?.[0];

    if (!photo || !passport) {
      toast.info("Пожалуйста, загрузите фото и скан паспорта.");
      return;
    }

    await uploadFileVisa(Number(applicationId), photo, passport);

    // 3. Переход к следующему шагу
    const visaId = route.query.visa_id;
    if (typeof visaId === "string") {
      await getVisaByIdForm(visaId);
    }

    useETAStore().nextStep(router, route);
  } catch (err) {
    console.error("Ошибка при отправке или загрузке:", err);
    toast.error("Не удалось отправить данные. Попробуйте позже.");
  }
}

onMounted(async () => {
  getSecurityQuestions();
  const id = route.query.visa_id;
  if (typeof id === "string") {
    await getVisaByIdForm(id);
  }
});
</script>

<style scoped lang="scss">
.upload-boxes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  grid-gap: 2rem;
  margin-bottom: 2.4rem;
}

.questions {
  border: 0.1rem solid #d9d9d9;
  padding: 3.6rem;
  border-radius: 2rem;
}

.upload-section {
  padding-top: 2.4rem;

  & > p {
    font-size: 1.4rem;
    color: $gray;
    margin-bottom: 2.4rem;
  }
}

.question__quote {
  font-size: 1.4rem;
  color: $gray;
  padding-top: 3rem;
}

.questions__details {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-bottom: 2.4rem;
  padding-bottom: 1.6rem;
  border-bottom: 0.1rem solid #d9d9d9;
}

:deep(.checkbox label) {
  font-size: 1.4rem;
}

.footer_bottom {
  @include flex-start;
  gap: 6rem;
  p {
    font-size: 1.4rem;
    color: $gray;
    max-width: 80%;
  }
}

.question_btn {
  @include flex-end;
  padding-top: 3rem;
}
</style>
