import { reactive } from "vue";

export const usePassengerData = () => {
  const generatePassengerData = (
    numAdults: number,
    numChildren: number,
    hotelClass: any
  ) => {
    if (numAdults < 0 || numChildren < 0) {
      throw new Error(
        "Количество взрослых и детей не может быть отрицательным"
      );
    }

    // Создаем реактивные массивы
    const adults = reactive(
      Array.from({ length: numAdults }, (_, index) => ({
        id: `adult-${index + 1}`, // Уникальный идентификатор
        first_name: "",
        last_name: "",
        email: "",
        birth_date: "",
        hotel_class: hotelClass,
      }))
    );

    const children = reactive(
      Array.from({ length: numChildren }, (_, index) => ({
        id: `child-${index + 1}`, // Уникальный идентификатор
        first_name: "",
        last_name: "",
        age: 0, // Возраст по умолчанию
      }))
    );

    return { adults, children };
  };

  return {
    generatePassengerData,
  };
};