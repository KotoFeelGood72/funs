import { defineStore, storeToRefs } from "pinia";
import { api } from "~/api/api";
import { usePassengers } from "@/composables/usePassengers";

export const useETAStore = defineStore("eta", {
  state: () => ({
    currentStep: 1 as number,
    eta: {
      country: "" as any,
      date_forward: "" as any,
      date_backward: "" as any,
      adults: 1 as any,
    },
    visaList: null as any,
    visaId: null as any,
    visa: null as any,
    formShema: null as any,
    loading: false as boolean,
  }),
  getters: {
    // currentVisa(state): any {
    //   return (
    //     state.visa?.find((visa: any) => visa.id === state.visaId) || null
    //   );
    // },
  },
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
          formData // 👈 отправка всех полей
        );
        // Переход на следующий шаг
        this.nextStep(router, router.currentRoute.value, form_id);
      } catch (error) {
        console.error("Ошибка при отправке формы:", error);
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
    nextStep(router: any, route: any, visaId?: string) {
      // увеличили шаг
      this.currentStep++;

      router.push({
        // сохраняем текущий path/имя, чтобы не потерять маршрут
        path: route.path, // или: name: route.name
        query: {
          // все что было в query
          ...route.query,
          // новый шаг
          step: String(this.currentStep),
          // и id визы
          visa_id: visaId || route.query.visa_id,
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
