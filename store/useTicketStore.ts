import { defineStore, storeToRefs } from "pinia";
import { api } from "~/api/api";

export const useTicketStore = defineStore("tickets", {
  state: () => ({
    currentOrder: {} as any,
    ticket: null as any,
    tickets: {
      data: {
        departure: { name: "", value: "" },
        arrival: { name: "", value: "" },
        date_forward: "",
        date_backward: "",
        class_type: "ECONOMY",
        adults: 1,
      },
    } as any,
    isLoading: false as boolean,
    airlines: [] as any,
    stops: [] as any,
    selectedAirlines: [] as any,
  }),
  // persist: {
  //   storage: piniaPluginPersistedstate.localStorage(),
  // },
  actions: {
    async getTickets() {
      console.log("Событие getTicket сработало!");
      try {
        this.isLoading = true;
        const response = await api.get("/tickets", {
          params: {
            departure: this.tickets.data.departure.value,
            arrival: this.tickets.data.arrival.value,
            date_forward: this.tickets.data.date_forward,
            date_backward: this.tickets.data.date_backward,
            class_type: this.tickets.data.class_type,
            adults: this.tickets.data.adults,
          },
        });

        console.log("Ответ API:", response.data);

        this.tickets = response.data;
        this.collectAirlines();
      } catch (error) {
        console.error("Ошибка при загрузке билетов:", error);
      } finally {
        this.isLoading = false;
      }
    },
    collectAirlines() {
      const airlineSet = new Set(["Все"]);
      this.tickets.offers.forEach((ticket: any) => {
        airlineSet.add(ticket.airline);
      });
      this.airlines = Array.from(airlineSet);
    },

    applyAirlineFilter(selected: string[]) {
      this.selectedAirlines = selected.includes("Все") ? [] : selected;
    },

    async fetchTickedId(id: any) {
      try {
        const response = await api.get(
          `/tickets/${this.tickets.request_id}/${id}`
        );
        this.ticket = response.data;
      } catch (error) {
        console.error("Ошибка при загрузке билетов:", error);
      }
    },
  },
});

export const useTicketStoreRefs = () => storeToRefs(useTicketStore());
