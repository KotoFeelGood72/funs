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
            @file-selected="(files) => onFileSelected(doc.name, files)"
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

const route = useRoute();
const router = useRouter();

const { getVisaByIdForm, submitSecurityAnswers, getSecurityQuestions } = useETAStore();
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

async function goNext() {
  const applicationId = route.query.application_id;
  if (!applicationId) {
    alert("Отсутствует ID заявки.");
    return;
  }

  if (!agreement.value) {
    alert("Вы должны согласиться с условиями.");
    return;
  }

  const requiredFields = questions?.value?.fields.filter((f: any) => f.required);
  const missingAnswers = requiredFields?.some((f: any) => answers.value[f.name] == null);

  if (missingAnswers) {
    alert("Пожалуйста, ответьте на все обязательные вопросы.");
    return;
  }

  const payload: Record<string, any> = {
    ...answers.value,
    confirmation_details: confirmationDetails.value || null,
  };

  try {
    await submitSecurityAnswers(Number(applicationId), payload);
    const visaId = route.query.visa_id;
    if (typeof visaId === "string") {
      await getVisaByIdForm(visaId);
    }
    useETAStore().nextStep(router, route);
  } catch (err) {
    console.error("Ошибка при отправке:", err);
    alert("Не удалось отправить ответы. Попробуйте позже.");
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
</style>
