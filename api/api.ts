import axios from "axios";
import { useToast } from "vue-toastification";
import { useAuth } from "~/composables/useAuth"; // ваш composable

const toast = useToast();

const api = axios.create({
  baseURL: "https://funbooking.ru/api/",
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token!);
  });
  failedQueue = [];
};

// 1) request interceptor — добавляем access token
api.interceptors.request.use((config) => {
  const { accessToken } = useAuth();
  if (accessToken.value) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken.value}`;
  }
  return config;
});

// 2) response interceptor
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    const status = err.response?.status;

    // если это refresh_token endpoint и он вернул 401 — сразу выкидываем
    if (status === 401 && original.url?.includes("/refresh_token")) {
      // чистим сессию
      const { logout } = useAuth();
      logout();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      toast.error("Сессия устарела, пожалуйста, войдите заново");
      // редирект на главную
      window.location.replace("/");
      return Promise.reject(err);
    }

    // иначе, если 401 и ещё не пытались refresh
    if (status === 401 && !original._retry) {
      original._retry = true;

      // если уже идёт refresh — ставим в очередь
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            return api(original);
          })
          .catch((e) => Promise.reject(e));
      }

      isRefreshing = true;

      try {
        const { refresh, logout } = useAuth();
        const newToken = await refresh();
        processQueue(null, newToken);
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch (e) {
        processQueue(e, null);
        // если refresh упал — чистим сессию и редиректим
        const { logout } = useAuth();
        logout();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        toast.error("Сессия устарела, пожалуйста, войдите заново");
        window.location.replace("/");
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export { api };
