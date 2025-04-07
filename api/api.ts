import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const api = axios.create({
  baseURL: "https://funbooking.ru/api/",
});

// Интерсептор запросов
api.interceptors.request.use(
  async (config) => {
    const { useAuth } = await import("~/composables/useAuth");
    const { accessToken } = useAuth();

    if (accessToken.value) {
      config.headers.Authorization = `Bearer ${accessToken.value}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Интерсептор ответов
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error && error.response) {
      const status = error.response.status;

      if (status === 401) {
        const { useAuth } = await import("~/composables/useAuth");
        const { logout } = useAuth();

        // toast.error("Сессия истекла. Пожалуйста, войдите заново.");
        logout();

        return Promise.reject(error);
      }

      const message = error.response.data?.message || "Произошла ошибка";
      // toast.error(`Ошибка ${status}: ${message}`);
    } else {
      // toast.error("Ошибка сети. Проверьте подключение к интернету.");
    }

    return Promise.reject(error);
  }
);

export { api };
