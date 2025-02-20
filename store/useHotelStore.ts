import { defineStore, storeToRefs } from "pinia";
import { usePassengers } from "@/composables/usePassengers";
import { api } from "~/api/api";

export const useHotelStore = defineStore("hotel-ticket", {
  state: () => ({
    ticket: {
      city: { name: "", value: "" } as any,
      check_in_date: null as string | null,
      check_out_date: null as string | null,
      email_address: "" as string,
      phone_number: "" as string,
      hotel_class: "3" as string,
      adults_count: 1,
      adults: [] as any,
      id: null,
    },
  }),
  actions: {
    async bookingHotel() {
      try {
        const response = await api.post("hotels", {
          ...this?.ticket,
          city: this?.ticket?.city?.name,
        });

        this.ticket = response.data;

        if (response.data.id) {
          // await router.push(`hotels/${response.data.id}`);
          // await this.getHotelId(response.data.id);
        }

        return response.data.id; // Возвращаем ID брони
      } catch (error) {
        console.error("Ошибка при бронировании отеля:", error);
        return null; // Возвращаем null в случае ошибки
      }
    },

    async addPayment(id: any) {
      try {
        const response = await api.get(`/hotels/${id}`, {
          ...this.ticket,
          city: this.ticket.city.name,
        });
        // this.ticket = response.data;
      } catch (error) {}
    },

    async getHotelId(id: any) {
      try {
        const response = await api.get(`/hotels/${id}`);
        this.ticket = response.data;

        const { createPassengers } = usePassengers();

        createPassengers(this.ticket.adults_count);
      } catch (error) {
        console.error("Ошибка при загрузке отелей:", error);
      }
    },

    // async bookingHotel() {
    //   try {
    //     const formattedAdults = this.ticketHotel.adults.map((adult) => ({
    //       ...adult,
    //       number_seria_passport: adult.number_seria_passport.replace(/-/g, ""),
    //     }));
    //     const response = await api.post("/hotels", {
    //       email_address: this.ticketHotel.email_address,
    //       phone_number: this.ticketHotel.phone_number,
    //       check_in_date: this.ticketHotel.check_in_date,
    //       check_out_date: this.ticketHotel.check_out_date,
    //       city: this.ticketHotel.city?.value,
    //       hotel_class: String(this.ticketHotel.hotel_class),
    //       adults: formattedAdults,
    //     });
    //     console.log("Бронирование успешно", response.data);
    //     this.currentOrder = response.data;
    //   } catch (error) {
    //     console.error("Ошибка при бронировании отеля:", error);
    //   }
    // },

    async getHotelPrice() {
      try {
        const response = await api.get("/hotels/price");
        return response.data;
      } catch (error) {}
    },

    // async clearPlace() {
    //   this.places = [];
    // },

    // // Метод для получения данных из query и обновления store
    // fillHotelTicketFromQuery(query: any) {
    //   this.ticketHotel.city = { name: query.cityName, value: query.cityValue };
    //   this.ticketHotel.check_in_date = query.check_in_date || null;
    //   this.ticketHotel.check_out_date = query.check_out_date || null;
    //   this.ticketHotel.num = query.num ? parseInt(query.num) : 1;
    //   this.ticketHotel.children = query.children ? parseInt(query.children) : 0;
    //   this.ticketHotel.hotel_class = query.hotel_class
    //     ? parseInt(query.hotel_class)
    //     : 3;

    //   // Обновляем пассажиров
    //   // this.createPassengersHotel();
    // },
  },
  // persist: {
  //   storage: piniaPluginPersistedstate.localStorage(),
  // },
});

export const useHotelStoreRefs = () => storeToRefs(useHotelStore());
