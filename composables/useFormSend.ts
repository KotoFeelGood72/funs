import { ref } from "vue";
import { api } from "~/api/api";
import { useToast } from "vue-toastification";

export function useFormSend() {
  const formData = ref<any>({
    name: "",
    email: "",
    text: "",
  });

  const isLoadingForm = ref(false);
  const isLoadingFormAnonim = ref(false);

  const toast = useToast();

  const sendForm = async () => {
    isLoadingForm.value = true;
    try {
      const response = await api.post("/faqs", formData.value);
      toast.success("Успешно отправлено");
      clearForm();
    } catch (error) {
      toast.error(error);
    } finally {
      isLoadingForm.value = false;
    }
  };

  const sendFormAnonim = async () => {
    isLoadingFormAnonim.value = true;
    try {
      const response = await api.post("/faqs/anonim", formData.value);
      toast.success("Успешно отправлено");
      clearForm();
    } catch (error) {
      console.error(error);
    } finally {
      isLoadingFormAnonim.value = false;
    }
  };

  const clearForm = () => {
    formData.value = {
      name: "",
      email: "",
      text: "",
    };
  };

  return {
    sendForm,
    sendFormAnonim,
    formData,
    isLoadingForm,
    isLoadingFormAnonim,
  };
}
