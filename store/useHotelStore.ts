import { defineStore, storeToRefs } from "pinia";
import { api } from "~/api/api";

export const useHotelStore = defineStore("hotel-ticket", {
  state: () => ({
    places: [] as any,
    ticketHotel: {
      city: { name: "", value: "" } as any,
      check_in_date: null as string | null,
      check_out_date: null as string | null,
      email_address: "" as string,
      phone_number: "" as string,
      hotel_class: 3 as number,
      adults: 1 as number,
      children: 1 as number,
      passengers: [] as Array<{
        first_name: string;
        last_name: string;
        passport_seria: number;
        passport_number: number;
        birth_date: string;
      }>,
    },
  }),
  actions: {
    createPassengersHotel() {
      this.ticketHotel.passengers = Array.from(
        { length: this.ticketHotel.adults },
        () => ({
          first_name: "",
          last_name: "",
          passport_seria: 0,
          passport_number: 0,
          birth_date: "",
        })
      );
    },

    async fetchHotels(router: any) {
      try {
        const query = {
          // city: {
          //   name: this.ticketHotel.city.name,
          //   value: this.ticketHotel.city.value,
          // },
          check_in_date: this.ticketHotel.check_in_date || "",
          check_out_date: this.ticketHotel.check_out_date || "",
          adults: this.ticketHotel.adults.toString(),
          hotel_class: this.ticketHotel.hotel_class,
        };

        // Обновляем параметры в URL
        router.push({
          path: "/hotels",
          query,
        });

        // Выполняем запрос
        const response = await api.get("/hotels", { params: query });
        // this.hotels = response.data; // Если есть массив отелей, его нужно сохранить
      } catch (error) {
        console.error("Ошибка при загрузке отелей:", error);
      }
    },

    async fetchPlaceHotel(query?: string) {
      try {
        const response = await api.get("places", {
          params: {
            query,
            locale: "ru",
          },
        });
        this.places = response.data.map((item: any) => ({
          name: item.city_name_ru,
          value: item.code,
        }));
      } catch (error) {
        console.error("Ошибка при загрузке мест:", error);
      }
    },

    async bookingHotel() {
      try {
        const response = await api.post("/hotels", {
          email_address: this.ticketHotel.email_address,
          phone_number: this.ticketHotel.phone_number,
          check_in_date: this.ticketHotel.check_in_date,
          check_out_date: this.ticketHotel.check_out_date,
          city: this.ticketHotel.city?.value,
          hotel_class: this.ticketHotel.hotel_class,
          passengers: [...this.ticketHotel.passengers],
        });
        console.log("Бронирование успешно", response.data);
      } catch (error) {
        console.error("Ошибка при бронировании отеля:", error);
      }
    },

    async clearPlace() {
      this.places = [];
    },

    // Метод для получения данных из query и обновления store
    fillHotelTicketFromQuery(query: any) {
      this.ticketHotel.city = { name: query.cityName, value: query.cityValue };
      this.ticketHotel.check_in_date = query.check_in_date || null;
      this.ticketHotel.check_out_date = query.check_out_date || null;
      this.ticketHotel.adults = query.adults ? parseInt(query.adults) : 1;
      this.ticketHotel.children = query.children ? parseInt(query.children) : 0;
      this.ticketHotel.hotel_class = query.hotel_class
        ? parseInt(query.hotel_class)
        : 3;

      // Обновляем пассажиров
      this.createPassengersHotel();
    },
  },
});

export const useHotelStoreRefs = () => storeToRefs(useHotelStore());
