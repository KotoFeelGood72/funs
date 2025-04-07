// import axios from "axios";
// import { useToast } from "vue-toastification";

// const toast = useToast();
// let isRefreshing = false;
// const api = axios.create({
//   baseURL: "https://funbooking.ru/api/",
// });

// // Интерсептор запросов
// api.interceptors.request.use(
//   async (config) => {
//     const { useAuth } = await import("~/composables/useAuth"); // Ленивый импорт
//     const { accessToken } = useAuth();

//     if (accessToken.value) {
//       config.headers.Authorization = `Bearer ${accessToken.value}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error && error.response) {
//       const status = error.response.status;

//       if (status === 401 && !isRefreshing) {
//         isRefreshing = true;

//         try {
//           const { useAuth } = await import("~/composables/useAuth"); // Ленивый импорт
//           const { refresh, logout } = useAuth();

//           await refresh(); // Пытаемся обновить токен
//           isRefreshing = false; // Сбрасываем флаг при успешной попытке
//           return api.request(error.config); // Повторяем запрос с новым токеном
//         } catch (refreshError) {
//           isRefreshing = false; // Сбрасываем флаг при ошибке
//           toast.error("Сессия истекла. Пожалуйста, войдите заново.");
//           const { useAuth } = await import("~/composables/useAuth");
//           const { logout } = useAuth();
//           logout(); // Выход из системы
//           return Promise.reject(refreshError);
//         }
//       } else if (status === 401 && isRefreshing) {
//         // Если уже была попытка обновления токена, но ошибка осталась, выходим
//         toast.error("Сессия истекла. Пожалуйста, войдите заново.");
//         const { useAuth } = await import("~/composables/useAuth");
//         const { logout } = useAuth();
//         logout();
//         return Promise.reject(error);
//       } else {
//         const message = error.response.data?.message || "Произошла ошибка";
//         toast.error(`Ошибка ${status}: ${message}`);
//       }
//     } else {
//       toast.error("Ошибка сети. Проверьте подключение к интернету.");
//     }

//     return Promise.reject(error);
//   }
// );

// export { api };

import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();
let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;
let failedQueue: Array<() => void> = [];

const api = axios.create({
  baseURL: "https://funbooking.ru/api/",
});

// Добавляем запрос в очередь
const queueFailedRequest = (cb: () => void) => {
  failedQueue.push(cb);
};

// Повторяем все запросы из очереди
const processQueue = () => {
  failedQueue.forEach((cb) => cb());
  failedQueue = [];
};

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
    const originalRequest = error.config;

    if (error && error.response) {
      const status = error.response.status;

      if (status === 401) {
        const { useAuth } = await import("~/composables/useAuth");
        const { refresh, logout } = useAuth();

        if (!isRefreshing) {
          isRefreshing = true;

          refreshPromise = refresh()
            .then(() => {
              isRefreshing = false;
              processQueue(); // Повтор всех отложенных запросов
            })
            .catch((refreshError) => {
              isRefreshing = false;
              toast.error("Сессия истекла. Пожалуйста, войдите заново.");
              logout();
              throw refreshError;
            });
        }

        // Возвращаем промис, который будет завершён после завершения обновления токена
        return new Promise((resolve, reject) => {
          queueFailedRequest(() => {
            // Повторяем оригинальный запрос после обновления токена
            api(originalRequest).then(resolve).catch(reject);
          });
        });
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
