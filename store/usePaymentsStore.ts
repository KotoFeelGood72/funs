import { defineStore, storeToRefs } from "pinia";
import { useFiltersStoreRefs } from "./useFilterStore";
import { api } from "~/api/api";

export const usePaymentsStore = defineStore("payments", {
  state: () => ({
    hotel: null as any,
  }),
  actions: {
    async payHotel() {
      const { hotelData } = useFiltersStoreRefs();
      try {
        // Копируем объект, чтобы не изменять оригинальные данные
        const sanitizedData = JSON.parse(JSON.stringify(hotelData.value));

        // Удаляем id у adults и children
        sanitizedData.adults = sanitizedData.adults.map((adult: any) => {
          const { id, ...rest } = adult; // Исключаем id
          return rest;
        });

        sanitizedData.children = sanitizedData.children.map((child: any) => {
          const { id, ...rest } = child; // Исключаем id
          return rest;
        });

        // Преобразуем city в строку
        sanitizedData.city = sanitizedData.city.name;

        // Отправляем данные
        await api.post("/hotels", sanitizedData);
      } catch (error) {
        console.error("Ошибка при оплате:", error);
      }
    },
  },
});


export const usePaymentsStoreRefs = () => storeToRefs(usePaymentsStore());


