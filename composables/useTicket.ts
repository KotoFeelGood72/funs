import { ref } from "vue";
import { api } from "~/api/api";

const tickets = ref<any>(null);
export function useFetchTickets() {
const isLoading = ref<boolean>(false)

  const getTickets = async (data: any) => {
    console.log("Запрос:", data);
    try {
      isLoading.value = true
      const response = await api.get("/tickets", { params: data });
  
      console.log("Ответ API:", response.data); // Проверяем, что приходит
  
      tickets.value = response.data;
      console.log("Сохранённые данные:", tickets.value);
    } catch (error) {
      console.error("Ошибка при загрузке билетов:", error);
    } finally {
      isLoading.value = false
    }
  };

  return { tickets, getTickets, isLoading };
}
