import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const api = axios.create({
  baseURL: "https://funbooking.ru/api/",
});

// Интерсептор запросов
api.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      const token = parsedUser?.user?.token?.token;
      if (token) {
        config.headers.Authorization = `Basic ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерсептор ответов
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Проверяем наличие объекта ошибки
    if (error && error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || "Произошла ошибка";

      toast.error(`Ошибка ${status}: ${message}`, {
        timeout: 5000, // Время отображения в миллисекундах

        position: "bottom-left", // Позиция тоста
        closeOnClick: true, // Закрытие при клике
        pauseOnHover: false,
        draggable: true,
        draggablePercent: 0.6,
        hideProgressBar: false,
        icon: true,
      });

      if (status === 401) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    } else {
      // Если ошибка связана с сетью или объект response отсутствует
      toast.error("Ошибка сети. Проверьте подключение к интернету.");
    }

    return Promise.reject(error);
  }
);

export { api };
