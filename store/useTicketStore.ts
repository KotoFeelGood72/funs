import { defineStore, storeToRefs } from "pinia";
import { api } from "~/api/api";
import { usePassengers } from "@/composables/usePassengers";

export const useTicketStore = defineStore("tickets", {
  state: () => ({
    currentOrder: {
      adults: [] as any,
      phone_number: "" as any,
      email: "" as any,
      price: 0 as any,
    } as any,
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
        return response.data.request_id;
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

    async bookingTicket(ticketId: any) {
      try {
        const mappedAdults = this.currentOrder.adults.map((passenger: any) => {
          return {
            ...passenger,
            nationality: passenger.nationality.value,
          };
        });
    
        const response = await api.post(
          `/tickets/${this.tickets.request_id}/${ticketId}`,
          {
            ...this.currentOrder,
            adults: mappedAdults, 
          }
        );
    
        return response.data;
      } catch (error) {
        console.error("Ошибка при бронировании билета:", error);
      }
    },

    async getTicketPrice() {
      try {
        const response = await api.get("/tickets/price");
        this.currentOrder.price = response.data.price;
      } catch (error) {}
    },

    async getTickerForRequest(requestId: any) {
      try {
        const response = await api.get(`/tickets/requests/${requestId}`);
        this.tickets = response.data;

        const { createPassengersAvia } = usePassengers();

        createPassengersAvia(this.tickets.data.adults);
        this.getTicketPrice();
      } catch (error) {
        console.error("Ошибка при загрузке билетов:", error);
      }
    },

    async getTickerForRequestToId(request_id: any, id: any) {
      try {
        const response = await api.get(`/tickets/requests/${request_id}/${id}`);
        return response.data;
      } catch (error) {
        console.error("Ошибка при загрузке билетов:", error);
      }
    },

    async getDataClient(uid: any) {
      try {
        const response = await api.get(`/tickets/data/${uid}`);
        this.currentOrder = response.data;
      } catch (error) {}
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
