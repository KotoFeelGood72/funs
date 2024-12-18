import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const api = axios.create({
  baseURL: "https://funbooking.ru/api/",
});

// Интерсептор запросов
api.interceptors.request.use(
  async (config) => {
    const { useAuth } = await import("~/composables/useAuth"); // Ленивый импорт
    const { accessToken } = useAuth(); // Получение токенов в момент запроса

    if (accessToken.value) {
      config.headers.Authorization = `Bearer ${accessToken.value}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерсептор ответов
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error && error.response) {
      const status = error.response.status;

      if (status === 401) {
        try {
          const { useAuth } = await import("~/composables/useAuth"); // Ленивый импорт
          const { refresh, logout } = useAuth();

          await refresh(); // Обновляем токен
          return api.request(error.config); // Повторяем запрос с новым токеном
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          toast.error("Сессия истекла. Выполните вход снова.");
          localStorage.removeItem("user");
          // window.location.href = "/"; // Редирект на главную страницу
        }
      } else {
        const message = error.response.data?.message || "Произошла ошибка";
        toast.error(`Ошибка ${status}: ${message}`);
      }
    } else {
      toast.error("Ошибка сети. Проверьте подключение к интернету.");
    }

    return Promise.reject(error);
  }
);

export { api };
