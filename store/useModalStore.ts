import { defineStore, storeToRefs } from "pinia";

export const useModalStore = defineStore("modal", {
  state: (): { modals: any } => ({
    modals: {
      auth: false,
      payment: false,
    },
  }),
  actions: {
    openModal(modalName: any) {
      this.modals[modalName] = !this.modals[modalName];
    },
    closeModal(modalName: any): void {
      this.modals[modalName] = false;
    },
    closeAllModals(router?: any, route?: any) {
      Object.keys(this.modals).forEach((modalName) => {
        // if (modalName !== "AlertPromo" && modalName !== "AlertSquare") {
        this.modals[modalName as keyof any] = false;
        // }
      });

      if (router && route && Object.keys(route.query).length > 0) {
        const newQuery = { ...route.query };
        delete newQuery["task"];
        delete newQuery["booster"];

        if (Object.keys(newQuery).length > 0) {
          router.replace({
            query: newQuery,
          });
        } else {
          router.replace({
            query: null,
          });
        }
      }
    },
  },
});

export const useModalStoreRefs = () => storeToRefs(useModalStore());
