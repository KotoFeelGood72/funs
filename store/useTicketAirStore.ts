import { defineStore, storeToRefs } from "pinia";
import { api } from "~/api/api";

export const useTicketAirStore = defineStore("air-ticket", {
  state: () => ({
    places: [] as any,
    tickets: [] as any,
    airlines: [] as any,
    currentTicket: null as any,
    loadTicket: false as boolean,
    selectedAirlines: [] as string[],
    ticket: {
      phone_number: "" as any,
      email: "" as any,
      departure: {
        name: "" as any,
        value: "" as any,
      } as any,
      arrival: {
        name: "" as any,
        value: "" as any,
      } as any,
      date_forward: null as any,
      date_backward: null as any,
      adults: 1 as any,
      children: 0 as any,
      class_type: "ECONOMY",
      passengers: [] as Array<{
        first_name: string;
        last_name: string;
        birth_date: string;
        gender: string;
        number_seria_passport: string;
        nationality: string;
        validity_period: string;
      }>,
    },
  }),
  actions: {
    createPassengers() {
      this.ticket.passengers = Array.from(
        { length: this.ticket.adults },
        () => ({
          first_name: "",
          last_name: "",
          birth_date: "",
          gender: "",
          number_seria_passport: "",
          nationality: "",
          validity_period: "",
        })
      );
    },

    async fetchTickets(router: any, route: any, data?: any) {
      let query = {};
      this.loadTicket = true;
      try {
        if (data) {
          query = {
            departure_name: data.departure_name,
            departure_value: data.departure_value,
            arrival_name: data.arrival_name,
            arrival_value: data.arrival_value,
            date_forward: data.date_forward || "",
            date_backward: data.date_backward || "",
            adults: data.adults?.toString(),
            children: data.children?.toString(),
            class_type: data.class_type,
          };

          this.ticket.departure = {
            name: data.departure_name || "",
            value: data.departure_value || "",
          };
          this.ticket.arrival = {
            name: data.arrival_name || "",
            value: data.arrival_value || "",
          };
          this.ticket.date_forward = data.date_forward || null;
          this.ticket.date_backward = data.date_backward || null;
          this.ticket.adults = parseInt(data.adults) || 1;
          this.ticket.children = parseInt(data.children) || 0;
          this.ticket.class_type = data.class_type || "ECONOMY";
        } else {
          query = {
            departure_name: this.ticket.departure?.name,
            departure_value: this.ticket.departure?.value,
            arrival_name: this.ticket.arrival?.name,
            arrival_value: this.ticket.arrival?.value,
            date_forward: this.ticket.date_forward || "",
            date_backward: this.ticket.date_backward || "",
            adults: this.ticket.adults?.toString(),
            children: this.ticket.children?.toString(),
            class_type: this.ticket.class_type,
          };
        }

        if (route.name != "air" && !data) {
          router.push({
            path: "/air",
            query,
          });
        }

        // Выполняем запрос
        const response = await api.get("/tickets", { params: query });
        this.tickets = response.data;
        this.loadTicket = false;
        this.collectAirlines();
      } catch (error) {
        console.error("Ошибка при загрузке билетов:", error);
        this.loadTicket = false;
      } finally {
        this.loadTicket = false;
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
        const response = await api.get(`/tickets/${id}`);
        this.currentTicket = response.data;
      } catch (error) {
        console.error("Ошибка при загрузке билетов:", error);
      }
    },

    async bookingTicketAir(ticketId: any) {
      try {
        const formattedPassengers = this.ticket.passengers.map((passenger) => ({
          ...passenger,
          number_seria_passport: passenger.number_seria_passport.replace(
            /-/g,
            ""
          ),
        }));

        const response = await api.post(`/tickets/${ticketId}`, {
          email: this.ticket.email,
          phone_number: this.ticket.phone_number,
          adults: formattedPassengers,
        });

        return response.data;
      } catch (error) {
        console.error("Ошибка при бронировании билета:", error);
      }
    },

    async clearPlace() {
      this.places = [];
    },
  },
});

export const useTicketAirStoreRefs = () => storeToRefs(useTicketAirStore());
