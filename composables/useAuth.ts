import { ref } from "vue";
import axios from "axios";

interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export function useAuth() {
  // Состояние для хранения токенов
  const accessToken = ref<string | null>(null);
  const refreshToken = ref<string | null>(null);

  // Регистрация пользователя
  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post<AuthResponse>("/auth", {
        email,
        password,
      });
      accessToken.value = response.data.access_token;
      refreshToken.value = response.data.refresh_token;
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  // Авторизация пользователя
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<AuthResponse>("/auth", {
        email,
        password,
      });
      accessToken.value = response.data.access_token;
      refreshToken.value = response.data.refresh_token;
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Обновление токена
  const refresh = async () => {
    try {
      if (!refreshToken.value) throw new Error("No refresh token available");

      const response = await axios.post<AuthResponse>("/refresh_token", {
        refresh_token: refreshToken.value,
      });
      accessToken.value = response.data.access_token;
      refreshToken.value = response.data.refresh_token;
      console.log("Token refreshed successfully:", response.data);
    } catch (error) {
      console.error("Token refresh error:", error);
      throw error;
    }
  };

  const setTokens = (access: string, refresh: string) => {
    accessToken.value = access;
    refreshToken.value = refresh;
  };

  // Очистка токенов
  const logout = () => {
    accessToken.value = null;
    refreshToken.value = null;
  };

  return {
    accessToken,
    refreshToken,
    register,
    login,
    refresh,
    logout,
    setTokens,
  };
}
