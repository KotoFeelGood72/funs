// composables/useCheckAuth.ts
import { useModalStore } from "@/store/useModalStore";
import { useAuth } from "@/composables/useAuth";

export function useCheckAuth() {
  const { openModal } = useModalStore();
  const { getProfile, user } = useAuth();

  const checkAuthThen = async (callback: () => void) => {
     await getProfile();
    if (user.value && user.value.id) {
      callback();
    } else {
      openModal("auth");
    }
  };

  return { checkAuthThen };
}