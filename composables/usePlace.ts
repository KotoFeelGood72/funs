import { ref } from "vue";
import { api } from "~/api/api";

export function useFetchPlace() {
  const places = ref([]);

  const fetchPlace = async (query?: string) => {
    try {
      const response = await api.get("places", {
        params: {
          query,
          locale: "ru",
        },
      });
      places.value = response.data.map((item: any) => ({
        name: item.city_name_ru,
        value: item.code,
      }));
    } catch (error) {
      console.error("Ошибка при загрузке мест:", error);
    }
  };

  return { places, fetchPlace };
}
