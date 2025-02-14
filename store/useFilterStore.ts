import { defineStore, storeToRefs } from "pinia";
import { api } from "~/api/api";

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
    filterData: {
      departure: "",
      arrival: "",
      date_forward: "",
      date_backward: "",
      class_type: "",
      adults: 0,
      children: 0,
      infants: 0,
    } as any,
    airData: {
      people: ["Эконому-1", "Эконому-2", "Эконому-3"],
    },
    places: [] as any,
    tickets: [] as any,
    hotelData: {
      city: {
        name: "",
        value: "",
      },
      check_in_date: "" as string,
      check_out_date: "" as string,
      num_adults: 1 as number,
      num_children: 0 as number,
      adults: [] as any[],
      children: [] as any[],
    } as any,
  }),
  actions: {
    async fetchTickets() {
      try {
        this.filterData.departure = this.selectedCityFrom.value;
        this.filterData.arrival = this.selectedCityTo.value;
        const response = await api.get("/tickets", { params: this.filterData });
        this.tickets = response.data;
      } catch (error) {
        console.error("Ошибка при загрузке билетов:", error);
      }
    },

    setHotelUser(data: any) {
      this.hotelData = data;
    },
  },

  // persist: {
  //   storage: piniaPluginPersistedstate.sessionStorage(),
  // },
});

export const useFiltersStoreRefs = () => storeToRefs(useFiltersStore());
