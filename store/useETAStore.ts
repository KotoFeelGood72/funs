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
    loading: false as boolean
  }),
  getters: {
    // currentVisa(state): any {
    //   return (
    //     state.visa?.find((visa: any) => visa.id === state.visaId) || null
    //   );
    // },
  },
  actions: {
    async getVisaTypes(route: any, router: any, country: any) {
      this.loading = true;
      try {
        const response = await api.get("/visa-types?country_id=" + country.id);

        // Проверяем, если текущий маршрут не '/eta', то редиректим
        if (route.path !== "/eta") {
          router.push("/eta/" + '?request_id=' + response.data.request_id);
        }
        this.visa = response.data;
      } catch (error) {
        console.error("Error fetching visa types:", error);
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
    nextStep() {
      this.currentStep++;
    },
    prevStep() {
      if (this.currentStep > 1) this.currentStep--;
    },
    goToStep(step: number) {
      if (step >= 1) this.currentStep = step;
    }
  },
});

export const useETAStoreRefs = () => storeToRefs(useETAStore());
