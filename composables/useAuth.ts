import { ref } from "vue";
import { api } from "~/api/api";
import { useRouter } from "vue-router";
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
export function useAuth(store?: any) {
  const router = useRouter();
  const toast = useToast();
  // Состояние для хранения токенов

  console.log(accessToken);

  // Состояние для email и password
  const email = ref<string>("");
  const password = ref<string>("");

  accessToken.value = localStorage.getItem("accessToken");
  refreshToken.value = localStorage.getItem("refreshToken");

  // Регистрация пользователя
  // const register = async () => {
  //   try {
  //     const response = await api.post("/auth", {
  //       email: email.value,
  //       password: password.value,
  //     });
  //     accessToken.value = response.data.access_token;
  //     refreshToken.value = response.data.refresh_token;
  //     await getProfile();
  //     console.log("Registration successful:", response.data);
  //     toast.success("Вы успешно зарегистрировались");
  //     store.closeAllModals();
  //     await router.push("/profile");
  //   } catch (error) {
  //     toast.error("Произошла ошибка, повторите позже");
  //     console.error("Registration error:", error);
  //     throw error;
  //   }
  // };

  // Авторизация пользователя
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

  const updateProfile = async (updatedUser: any) => {
    try {
      const response = await api.patch("/profiles", user.value);
      user.value = response.data;
      toast.success("Профиль успешно обновлен");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Не удалось обновить профиль");
    }
  };

  const refresh = async () => {
    try {
      if (!refreshToken.value) throw new Error("No refresh token available");

      const response = await api.post("/refresh_token", {
        refresh_token: refreshToken.value,
      });
      setTokens(response.data.access_token, response.data.refresh_token);
      await getProfile();
    } catch (error) {
      console.error("Token refresh error:", error);
      logout(); // Очистка состояния при неудаче
    }
  };

  const setTokens = (access: string, refresh: string) => {
    accessToken.value = access;
    refreshToken.value = refresh;
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  };

  // Очистка токенов
  const logout = () => {
    accessToken.value = null;
    refreshToken.value = null;
    user.value = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    toast.success("Вы вышли из системы");
    router.push("/");
  };

  return {
    accessToken,
    refreshToken,
    email,
    password,
    user,
    updateProfile,
    login,
    refresh,
    logout,
    setTokens,
  };
}
