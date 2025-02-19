import { ref } from "vue";
import { useTicketStoreRefs } from "~/store/useTicketStore";
import { useHotelStoreRefs } from "~/store/useHotelStore";

export function usePassengers() {
  const { currentOrder } = useTicketStoreRefs();
  const { ticket } = useHotelStoreRefs();
  function createPassengers(num: number) {
    ticket.value.adults = Array.from({ length: num }, () => ({
      first_name: "",
      last_name: "",
      number_seria_passport: "",
      birth_date: "",
    }));
  }

  function createPassengersAvia(num: number) {
    currentOrder.value.adults = Array.from({ length: num }, () => ({
      first_name: "",
      last_name: "",
      number_seria_passport: "",
      birth_date: "",
      gender: "",
      nationality: "",
      validity_period: "",
    }));
  }

  return {
    createPassengers,
    createPassengersAvia,
  };
}
