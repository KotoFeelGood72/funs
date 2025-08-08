import { defineStore, storeToRefs } from "pinia";
import { api } from "~/api/api";
import { usePassengers } from "@/composables/usePassengers";

export const useETAStore = defineStore("eta", {
  state: () => ({
    currentStep: 1 as number,
    questions: null as any,
    application: null as any,
    eta: {
      country: "" as any,
      date_forward: "" as any,
      date_backward: "" as any,
    },
    visaList: null as any,
    visaId: null as any,
    visa: null as any,
    formShema: null as any,
    loading: false as boolean,
  }),
  actions: {
    async getVisaTypes(route: any, router: any, id: any) {
      this.loading = true;
      try {
        const response = await api.get("/visa-types?country_id=" + id);
        if (route.path !== "/eta") {
          router.push("/eta/" + "?request_id=" + response.data.request_id);
        }
        this.visa = response.data;
      } catch (error) {
        console.error("Error fetching visa types:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async fetchMainVisaForm(
      router: any,
      request_id: any,
      form_id: any,
      formData: Record<string, any>
    ) {
      try {
        const response = await api.post(
          `/submit-eta-form/${request_id}/${form_id}`,
          formData
        );

        // Дожидаемся, пока application_id появится
        const applicationId = response?.data?.application_id;

        if (!applicationId) {
          console.warn("application_id не получен:", response.data);
          return;
        }

        const currentRoute = { ...router.currentRoute.value };
        console.log("→ applicationId OK:", applicationId);

        this.nextStep(router, currentRoute, form_id, applicationId);
      } catch (error: any) {
        // Если сервер вернул 404 — отправляем пользователя на главную
        if (error.response?.status === 404) {
          console.warn("Форма не найдена, редирект на главную");
          // router.push("/");
          return;
        }

        // Иначе — просто логируем и пробрасываем (или можно показать тост)
        console.error("Ошибка при отправке формы:", error);
        throw error;
      }
    },

    async submitQuestions(applicationId: number, payload: Record<string, any>) {
      this.loading = true;
      try {
        const formData = new URLSearchParams();

        for (const key in payload) {
          if (payload[key] !== null && payload[key] !== undefined) {
            formData.append(key, payload[key].toString());
          }
        }

        const response = await api.post(
          `/security-questions/${applicationId}`,
          formData,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        // API возвращает URL следующего шага (upload_documents)
        return response.data;
      } catch (error) {
        console.error("Ошибка при отправке вопросов:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async uploadFileVisa(
      applicationId: number,
      photoFile: File,
      passportScanFile: File
    ) {
      this.loading = true;
      try {
        const formData = new FormData();
        formData.append("photo", photoFile);
        formData.append("passport_scan", passportScanFile);

        const response = await api.post(
          `/upload-documents/${applicationId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Возвращает URL следующего шага (например, confirm/submit)
        return response.data;
      } catch (error) {
        console.error("Ошибка загрузки документов:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async getVisaById(id: any) {
      this.loading = true;
      try {
        const response = await api.get("/eta/" + id);
        this.visa = response.data;
      } catch (error) {
        console.error("Error fetching visa by ID:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async getSecurityQuestions() {
      this.loading = true;
      try {
        const response = await api.get("/security-questions");
        this.questions = response.data[0];
      } catch (error) {
        console.error("Error fetching visa by ID:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async getApplication(application_id: any) {
      this.loading = true;
      try {
        const response = await api.get(`/review-application/${application_id}`);
        this.application = response.data;
      } catch (error) {
        console.error("Error fetching visa by ID:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async submitSecurityAnswers(
      applicationId: number,
      payload: Record<string, any>
    ) {
      this.loading = true;
      try {
        const formData = new URLSearchParams();
        for (const key in payload) {
          if (payload[key] !== null && payload[key] !== undefined) {
            formData.append(key, payload[key].toString());
          }
        }

        const response = await api.post(
          `/security-questions/${applicationId}`,
          formData,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        // Вернёт URL для следующего шага (если есть)
        return response.data;
      } catch (error) {
        console.error("Ошибка отправки вопросов безопасности:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async getVisaByIdForm(id: any) {
      this.loading = true;
      try {
        const response = await api.get("/form-schema/" + id);
        this.formShema = response.data;
      } catch (error) {
        console.error("Error fetching visa by ID:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    nextStep(router: any, route: any, visaId?: string, applicationId?: string) {
      this.currentStep++;

      router.push({
        path: route.path,
        query: {
          ...route.query,
          step: String(this.currentStep),
          visa_id: visaId || route.query.visa_id,
          application_id: applicationId || route.query.application_id,
        },
      });
    },
    prevStep(router: any, route: any) {
      if (this.currentStep > 1) {
        this.currentStep--;

        router.push({
          // можно использовать name: route.name
          path: route.path,
          query: {
            ...route.query,
            step: String(this.currentStep),
            // если вы храните visa_id в query — оставляем его
            visa_id: route.query.visa_id,
          },
        });
      }
    },
    // если вы берёте router и route из аргументов:
    goToStep(step: number, router: any, route: any, visaId?: string) {
      if (step >= 1) {
        this.currentStep = step;

        router.push({
          // или: name: route.name
          path: route.path,
          query: {
            ...route.query,
            // step всегда строкой
            step: String(step),
            // если передали новый visaId — ставим его, иначе оставляем старый
            visa_id: visaId ?? route.query.visa_id,
          },
        });
      }
    },
  },
});

export const useETAStoreRefs = () => storeToRefs(useETAStore());
