// composables/useCheckAuth.ts
import { useModalStore } from "@/store/useModalStore";
import { useAuth } from "@/composables/useAuth";

export function useCheckAuth() {
  const { openModal } = useModalStore();
  const { getProfile, user } = useAuth();

// useCheckAuth.ts
const checkAuthThen = async (callback?: () => void): Promise<boolean> => {
  await getProfile();
  if (user.value && user.value.id) {
    callback?.();
    return true;
  } else {
    openModal("auth");
    return false;
  }
};

  return { checkAuthThen };
}