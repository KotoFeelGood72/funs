import { defineStore, storeToRefs } from "pinia";
import { usePassengers } from "@/composables/usePassengers";
import { useModalStore } from "./useModalStore";
import { useToast } from "vue-toastification";
import { api } from "~/api/api";

export const useHotelStore = defineStore("hotel-ticket", {
  state: () => ({
    order: null as any,
    load: false as boolean,
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
      this.load = true;
      try {
        const filteredTicket = Object.fromEntries(
          Object.entries(this?.ticket || {}).filter(
            ([_, value]) =>
              value !== null && value !== undefined && value !== ""
          )
        );
        const response = await api.post("hotels", {
          ...filteredTicket,
          city: this?.ticket?.city?.name || undefined,
        });
        this.ticket = response.data;
        this.getHotelId(response.data.id);

        return response.data.id;
      } catch (error) {
        this.load = false;
        return null;
      } finally {
        this.load = false;
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
      const toast = useToast();
      const { openModal } = useModalStore();
      try {
        const response = await api.get(`/hotels/${id}`);
        this.ticket = response.data;

        const { createPassengers } = usePassengers();
        const adults = response.data.adults || [];
        const isPassengerEmpty = (adult: any) =>
          Object.values(adult).every(
            (value) => !value || value.toString().trim() === ""
          );

        const allPassengersEmpty =
          adults.length === 0 || adults.every(isPassengerEmpty);

        if (allPassengersEmpty) {
          console.log("Создаю пассажиров:", this.ticket.adults_count);
          createPassengers(this.ticket.adults_count);
        } else {
          console.log("Пассажиры уже есть:", adults);
        }
      } catch (error) {
        // toast.warning("Зарегистрируйтесь, для того что бы забронировать отель");
        // console.error("Ошибка при загрузке отелей:", error);
        openModal("auth");
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
