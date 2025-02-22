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

        return response.data.id;
      } catch (error) {
        console.error("Ошибка при бронировании отеля:", error);
        return null;
      }
    },

    async bookingHotelAddInfo(
      requestId: any,
      method: "get" | "post" | "patch" | "delete" = "post"
    ) {
      try {
        const filteredTicket = this?.ticket
          ? Object.fromEntries(
              Object.entries(this.ticket).filter(([key, value]) => {
                // Фильтруем пустые значения
                if (value === null || value === undefined || value === "") {
                  return false;
                }

                // Проверяем массив adults, чтобы не отправлять, если все поля в нем пустые
                if (key === "adults" && Array.isArray(value)) {
                  const hasValidAdult = value.some((adult) =>
                    Object.values(adult).some(
                      (field) =>
                        field !== "" && field !== null && field !== undefined
                    )
                  );
                  return hasValidAdult;
                }

                return true;
              })
            )
          : {};

        const response = await api[method](
          `hotels/${requestId}`,
          method === "get" || method === "delete"
            ? undefined
            : { ...filteredTicket, city: this?.ticket?.city?.name }
        );

        return response.data;
      } catch (error) {
        console.error("Ошибка при бронировании отеля:", error);
        return null;
      }
    },
    // async addPayment(id: any) {
    //   try {
    //     const response = await api.get(`/hotels/${id}`, {
    //       ...this.ticket,
    //       city: this.ticket.city.name,
    //     });
    //     // this.ticket = response.data;
    //   } catch (error) {}
    // },

    async getHotelId(id: any) {
      try {
        const response = await api.get(`/hotels/${id}`);
        this.ticket = response.data;

        const { createPassengers } = usePassengers();

        // Проверяем, пуст ли массив adults
        if (!this.ticket.adults || this.ticket.adults.length === 0) {
          createPassengers(this.ticket.adults_count);
        }

        console.log(this.ticket);
      } catch (error) {
        console.error("Ошибка при загрузке отелей:", error);
      }
    },

    async getHotelPrice() {
      try {
        const response = await api.get("/hotels/price");
        return response.data;
      } catch (error) {}
    },
  },
  // persist: {
  //   storage: piniaPluginPersistedstate.localStorage(),
  // },
});

export const useHotelStoreRefs = () => storeToRefs(useHotelStore());
