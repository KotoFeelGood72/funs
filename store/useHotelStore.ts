import { defineStore, storeToRefs } from "pinia";
import { api } from "~/api/api";

export const useHotelStore = defineStore("hotel-ticket", {
  state: () => ({
    price: null as any,
    places: [] as any,
    currentOrder: null as any,
    ticketHotel: {
      city: { name: "", value: "" } as any,
      check_in_date: null as string | null,
      check_out_date: null as string | null,
      email_address: "" as string,
      phone_number: "" as string,
      hotel_class: 3 as number,
      num: 1 as number,
      children: 1 as number,
      adults: [] as Array<{
        first_name: string;
        last_name: string;
        number_seria_passport: string;
        birth_date: string;
      }>,
    },
  }),
  actions: {
    createPassengersHotel() {
      this.ticketHotel.adults = Array.from(
        { length: this.ticketHotel.num },
        () => ({
          first_name: "",
          last_name: "",
          number_seria_passport: "",
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
          hotel_class: String(this.ticketHotel.hotel_class),
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

    async bookingHotel() {
      try {
        const formattedAdults = this.ticketHotel.adults.map((adult) => ({
          ...adult,
          number_seria_passport: adult.number_seria_passport.replace(/-/g, ""),
        }));
        const response = await api.post("/hotels", {
          email_address: this.ticketHotel.email_address,
          phone_number: this.ticketHotel.phone_number,
          check_in_date: this.ticketHotel.check_in_date,
          check_out_date: this.ticketHotel.check_out_date,
          city: this.ticketHotel.city?.value,
          hotel_class: String(this.ticketHotel.hotel_class),
          adults: formattedAdults,
        });
        console.log("Бронирование успешно", response.data);
        this.currentOrder = response.data;
      } catch (error) {
        console.error("Ошибка при бронировании отеля:", error);
      }
    },

    async getHotelPrice() {
      try {
        const response = await api.get("/hotels/price");
        this.price = response.data;
      } catch (error) {}
    },

    async clearPlace() {
      this.places = [];
    },

    // Метод для получения данных из query и обновления store
    fillHotelTicketFromQuery(query: any) {
      this.ticketHotel.city = { name: query.cityName, value: query.cityValue };
      this.ticketHotel.check_in_date = query.check_in_date || null;
      this.ticketHotel.check_out_date = query.check_out_date || null;
      this.ticketHotel.num = query.num ? parseInt(query.num) : 1;
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
