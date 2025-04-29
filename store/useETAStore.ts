import { defineStore, storeToRefs } from "pinia";
import { api } from "~/api/api";
import { usePassengers } from "@/composables/usePassengers";

export const useETAStore = defineStore("eta", {
  state: () => ({
    eta: {
      country: "" as any,
      date_forward: "" as any,
      date_backward: "" as any,
      adults: 1 as any,
    },
    visaList: null as any,
    visaId: null as any,
  }),
  getters: {
    currentVisa(state): any {
      return (
        state.visaList?.find((visa: any) => visa.id === state.visaId) || null
      );
    },
  },
  actions: {
    async getVisaTypes(route: any, router: any, country: any) {
      try {
        const response = await api.get("/visa-types?country_id=" + country.id);

        // Проверяем, если текущий маршрут не '/eta', то редиректим
        if (route.path !== "/eta") {
          router.push("/eta");
        }
        this.visaList = response.data;
      } catch (error) {
        console.error("Error fetching visa types:", error);
        throw error;
      }
    },
  },
});

export const useETAStoreRefs = () => storeToRefs(useETAStore());
