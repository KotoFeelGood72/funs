import { defineStore, storeToRefs } from "pinia";
import { api } from "~/api/api";

interface FetchTiket {
  departure: string;
  arrival: string;
  date_forward: string;
  date_backward: string;
  class_type: string;
  adults: number;
  children: number;
  infants: number;
}

export const useFiltersStore = defineStore("filters", {
  state: () => ({
    selectedCityFrom: {
      value: "",
      name: "",
    },
    selectedCityTo: {
      value: "",
      name: "",
    },
    selectedDateTo: "" as string,
    selectedDateFrom: "" as string,
    selectedPeople: "" as string,
    airData: {
      people: ["Эконому-1", "Эконому-2", "Эконому-3"],
    },
    places: [] as any,
    tickets: [] as any,
  }),
  actions: {
    async fetchTickets(queryParams: FetchTiket) {
      try {
        const response = await api.get("/tickets", { params: queryParams });
        this.tickets = response.data;
      } catch (error) {
        console.error("Ошибка при загрузке билетов:", error);
      }
    },

    async fetchPlace(query?: string) {
      try {
        const response = await api.get("places", {
          params: {
            query, // Передаём строку в параметре query
            locale: "en", // Язык локали
          },
        });
        this.places = response.data.map((item: any) => ({
          name: item.city_name_en, // Отображаемое имя города
          value: item.code, // Код города
        }));
      } catch (error) {
        console.error("Ошибка при загрузке мест:", error);
      }
    },

    async clearPlace() {
      console.log("clear");
      this.places = [];
    },
  },
});

export const useFiltersStoreRefs = () => storeToRefs(useFiltersStore());
