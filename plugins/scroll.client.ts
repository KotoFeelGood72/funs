// plugins/scroll.client.ts
import { defineNuxtPlugin } from "#app";
import { useRouter } from "vue-router";

export default defineNuxtPlugin(() => {
  const router = useRouter();
  router.afterEach(() => {
    // после каждого перехода — в начало страницы
    window.scrollTo({ top: 0, left: 0 });
  });
});
