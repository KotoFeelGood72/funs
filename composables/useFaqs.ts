import { api } from "~/api/api";

const faq = ref<any>(null);
export function useFaqs() {
  const fetchFaqs = async () => {
    try {
      const response = await api.get("/faqs");
      faq.value = response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    fetchFaqs,
    faq,
  };
}
