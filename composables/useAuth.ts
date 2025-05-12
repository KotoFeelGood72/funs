import { ref } from "vue";
import { api } from "~/api/api";
// import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const accessToken = ref<string | null>(null);
const refreshToken = ref<string | null>(null);
const user = ref<any>({
  id: 0,
  email: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  remind_booking_completion: false,
  remind_booking_end_day: false,
  offer_extend_booking: false,
  receive_email_notifications: false,
  receive_sms_notifications: false,
});

export function useAuth(store?: any, router?: any) {
  const toast = useToast();
  const email = ref<string>("");
  const password = ref<string>("");

  if (process.client) {
    accessToken.value = localStorage.getItem("accessToken");
    refreshToken.value = localStorage.getItem("refreshToken");
  }

  // Queue to hold requests during token refresh
  let isRefreshing = false;
  let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: any) => void; }> = [];

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
      if (error) prom.reject(error);
      else prom.resolve(token!);
    });
    failedQueue = [];
  };

  // Request interceptor: attach token
  api.interceptors.request.use(config => {
    if (accessToken.value) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken.value}`;
    }
    return config;
  });

  // Response interceptor: handle 401
  api.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise(async (resolve, reject) => {
          try {
            const newToken = await refresh();
            processQueue(null, newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          } catch (err) {
            processQueue(err, null);
            logout();
            reject(err);
          } finally {
            isRefreshing = false;
          }
        });
      }
      return Promise.reject(error);
    }
  );

  const login = async () => {
    try {
      const response = await api.post("/auth", {
        email: email.value,
        password: password.value,
      });
      setTokens(response.data.access_token, response.data.refresh_token);
      await getProfile();
      toast.success("Вы успешно авторизовались");
      if (store?.closeAllModals) store.closeAllModals();
      await router.push("/profile");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Произошла ошибка, повторите позже");
    }
  };

  const getProfile = async () => {
    try {
      const response = await api.get("/profiles");
      user.value = response.data;
    } catch (error) {
      console.error("Profile fetch error:", error);
    }
  };

  const updateProfile = async () => {
    try {
      const response = await api.patch("/profiles", user.value);
      user.value = response.data;
      toast.success("Профиль успешно обновлен");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Не удалось обновить профиль");
    }
  };

  const refresh = async (): Promise<string> => {
    if (!refreshToken.value) throw new Error("No refresh token available");
    const response = await api.post("/refresh_token", {
      refresh_token: refreshToken.value,
    });
    setTokens(response.data.access_token, response.data.refresh_token);
    await getProfile();
    return response.data.access_token;
  };

  const setTokens = (access: string, refresh: string) => {
    accessToken.value = access;
    refreshToken.value = refresh;
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  };

  const logout = async () => {
    accessToken.value = null;
    refreshToken.value = null;
    user.value = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return {
    accessToken,
    refreshToken,
    email,
    password,
    user,
    login,
    getProfile,
    updateProfile,
    refresh,
    logout,
    setTokens,
  };
}
