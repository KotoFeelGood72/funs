import { defineStore, storeToRefs } from "pinia";

export const useFiltersStore = defineStore("filters", {
  state: () => ({
    air: {
      selectedCityTo: "" as string,
      selectedCityFrom: "" as string,
      selectedDateTo: "" as string,
      selectedDateFrom: "" as string,
      selectedPeople: "" as string,
    },
    airData: {
      city: ["Москва", "Амстердам", "Лондон", "Париж", "Берлин"],
      people: ["Эконому-1", "Эконому-2", "Эконому-3"],
    },
  }),
  actions: {},
});

export const useFiltersStoreRefs = () => storeToRefs(useFiltersStore());
