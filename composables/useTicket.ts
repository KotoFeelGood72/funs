import { ref } from "vue";
import { api } from "~/api/api";

export function useFetchTickets() {
  const tickets = ref(null);

  const getTickets = async (data: any) => {
    try {
      const response = await api.get("/tickets", data);
      tickets.value = response.data;
    } catch (error) {
      console.error("Ошибка при загрузке билетов:", error);
    }
  };

  return { tickets, getTickets };
}
