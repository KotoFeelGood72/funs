import { defineStore, storeToRefs } from "pinia";

export const useModalStore = defineStore("modal", {
  state: (): { modals: any } => ({
    modals: {
      burger: false,
      search: false,
    },
  }),
  actions: {
    openModal(modalName: any) {
      this.modals[modalName] = !this.modals[modalName];
    },
    closeModal(modalName: any): void {
      this.modals[modalName] = false;
    },
  },
});

export const useModalStoreRefs = () => storeToRefs(useModalStore());
