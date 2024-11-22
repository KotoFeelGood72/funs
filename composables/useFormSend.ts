import { ref } from "vue";
import { api } from "~/api/api";

export function useFormSend() {
  const formData = ref<any>({
    name: "",
    email: "",
    description: "",
  });

  const sendForm = () => {
    try {
      const response = api.post("/send", formData);
    } catch (error) {}
  };

  return {
    sendForm,
    formData,
  };
}
