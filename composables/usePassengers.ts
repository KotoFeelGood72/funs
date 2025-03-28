import { ref } from "vue";
import { useTicketStoreRefs } from "~/store/useTicketStore";
import { useHotelStoreRefs } from "~/store/useHotelStore";

export function usePassengers() {
  const { currentOrder } = useTicketStoreRefs();
  const { ticket } = useHotelStoreRefs();
  // function createPassengers(num: number) {
  //   ticket.value.adults = Array.from({ length: num }, () => ({
  //     first_name: "",
  //     last_name: "",
  //     number_seria_passport: "",
  //     birth_date: "",
  //   }));
  // }

  function createPassengers(adultsCount: number, childrenCount: number) {
    const adults = Array.from({ length: adultsCount }, () => ({
      first_name: "",
      last_name: "",
      number_seria_passport: "",
    }));

    const children = Array.from({ length: childrenCount }, () => ({
      first_name: "",
      last_name: "",
      number_seria_passport: "",
      birth_date: "",
    }));

    ticket.value.adults = [...adults, ...children];
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
