import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "~/api/api";
import { useToast } from "vue-toastification";

const accessToken = ref<string | null>(null);
const refreshToken = ref<string | null>(null);
const user = ref<any>(null);

export function useAuth(store?: any, routerParam?: any) {
  const toast = useToast();
  const router = routerParam || useRouter();

  const email = ref("");
  const password = ref("");
  const isLoading = ref(false);

  // при старте читаем токены из localStorage
  if (process.client) {
    accessToken.value = localStorage.getItem("accessToken");
    refreshToken.value = localStorage.getItem("refreshToken");
  }

  let isRefreshing = false;
  let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (err: any) => void;
  }> = [];

  function processQueue(error: any, token: string | null = null) {
    failedQueue.forEach((p) => {
      if (error) p.reject(error);
      else p.resolve(token!);
    });
    failedQueue = [];
  }

  // 1) Вешаем request-интерсептор, чтобы во все запросы вставлять Authorization
  api.interceptors.request.use((cfg) => {
    if (accessToken.value) {
      cfg.headers = cfg.headers || {};
      cfg.headers.Authorization = `Bearer ${accessToken.value}`;
    }
    return cfg;
  });

  // 2) Вешаем response-интерсептор
  api.interceptors.response.use(
    (res) => res,
    (err) => {
      const original = err.config as any;
      const status = err.response?.status;

      // a) Если 401 пришёл именно от эндпоинта /refresh_token
      //    — значит, обновить токен не удалось, выкидываем пользователя на /
      if (
        status === 401 &&
        typeof original.url === "string" &&
        original.url.includes("/refresh_token")
      ) {
        logout();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/");
        return Promise.reject(err);
      }

      // b) Если 401 от других запросов и мы ещё не повторялись
      if (status === 401 && !original._retry) {
        // если уже в процессе рефреша — ставим запрос в очередь
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

        original._retry = true;
        isRefreshing = true;

        // запускаем рефреш-флоу
        return new Promise(async (resolve, reject) => {
          try {
            const newToken = await refresh(); // вызов /refresh_token
            processQueue(null, newToken);
            original.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(original));
          } catch (e) {
            processQueue(e, null);
            // разлогиниваем и редиректим
            logout();
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            router.push("/");
            reject(e);
          } finally {
            isRefreshing = false;
          }
        });
      }

      return Promise.reject(err);
    }
  );

  // --- Остальные методы логина/профиля/рефреша ---

  async function login() {
    try {
      const { data } = await api.post("/auth", {
        email: email.value,
        password: password.value,
      });
      setTokens(data.access_token, data.refresh_token);
      await getProfile();
      toast.success("Авторизация успешна");
      store?.closeAllModals?.();
      await router.push("/profile");
    } catch {
      toast.error("Ошибка при входе");
    }
  }

  async function getProfile() {
    const { data } = await api.get("/profiles");
    user.value = data;
  }

  async function updateProfile(patchData?: Partial<typeof user.value>) {
    isLoading.value = true;
    try {
      // если в patchData передали что-то — шлём его, иначе весь user.value
      const payload = patchData ?? user.value;
      const { data } = await api.patch("/profiles", payload);
      user.value = data;
      toast.success("Профиль обновлён");
      return data;
    } catch (error) {
      toast.error("Не удалось обновить профиль");
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  async function refresh(): Promise<string> {
    if (!refreshToken.value) throw new Error("Нет refresh-token");
    const { data } = await api.post("/refresh_token", {
      refresh_token: refreshToken.value,
    });
    setTokens(data.access_token, data.refresh_token);
    await getProfile();
    return data.access_token;
  }

  function setTokens(access: string, refresh: string) {
    accessToken.value = access;
    refreshToken.value = refresh;
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  }

  function logout() {
    accessToken.value = null;
    refreshToken.value = null;
    user.value = null;
  }

  return {
    accessToken,
    refreshToken,
    user,
    email,
    password,
    isLoading,
    login,
    getProfile,
    updateProfile,
    refresh,
    logout,
    setTokens,
  };
}
