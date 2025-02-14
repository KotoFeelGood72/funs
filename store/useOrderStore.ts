import { defineStore, storeToRefs } from "pinia";
import { api } from "~/api/api";

export const useOrderStore = defineStore("order", {
  state: () => ({
    histories: [] as any,
    orders: [] as any,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    // Получение истории заказов
    async getHistory() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get("/profiles/history");
        this.histories = response.data;
      } catch (err: any) {
        this.error = err.message || "Ошибка загрузки истории заказов";
      } finally {
        this.loading = false;
      }
    },

    // Получение списка заказов
    async getOrders() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get("/profiles/orders");
        this.orders = response.data;
      } catch (err: any) {
        this.error = err.message || "Ошибка загрузки заказов";
      } finally {
        this.loading = false;
      }
    },
  },
});

export const useOrderStoreRefs = () => storeToRefs(useOrderStore());
