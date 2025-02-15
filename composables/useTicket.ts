import { ref } from "vue";
import { api } from "~/api/api";

export function useFetchTickets() {
  const tickets = ref(null);

  const getTickets = async (data: any) => {
    console.log("data", data);
    try {
      const response = await api.get("/tickets", { params: data });

      tickets.value = response.data;
      console.log("data", data, response.data);
    } catch (error) {
      console.error("Ошибка при загрузке билетов:", error);
    }
  };

  return { tickets, getTickets };
}
