import { ref } from "vue";
import { useTicketStoreRefs } from "~/store/useTicketStore";
import { useHotelStoreRefs } from "~/store/useHotelStore";

export function usePassengers() {
  const { currentOrder } = useTicketStoreRefs();
  const { ticket } = useHotelStoreRefs();


  function createPassengers(adultsCount: number, childrenCount: number = 0) {
    const adults = Array.from({ length: adultsCount }, () => ({
      first_name: "",
      last_name: "",
      number_seria_passport: "",
    }));
  
    const passengers = [...adults];
  
    if (childrenCount > 0) {
      const children = Array.from({ length: childrenCount }, () => ({
        first_name: "",
        last_name: "",
        number_seria_passport: "",
        birth_date: "",
      }));
  
      passengers.push(...children);
    }
  
    ticket.value.adults = passengers;
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
