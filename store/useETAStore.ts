import { defineStore, storeToRefs } from "pinia";
import { api } from "~/api/api";
import { usePassengers } from "@/composables/usePassengers";

export const useETAStore = defineStore("eta", {
  state: () => ({
    eta: {
      country: '' as any,
      date_forward: "" as any,
      date_backward: "" as any,
      adults: 1 as any
    }
  }),
  actions: {

  },
});

export const useETAStoreRefs = () => storeToRefs(useETAStore());
