// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/_mixins.scss" as *;
            @use "~/assets/scss/variables.scss" as *;
            `,
          api: "modern",
        },
      },
    },
  },
  plugins: [
    "~/plugins/datepicker.client.ts",
    "~/plugins/outside.client.ts",
    "~/plugins/toast.js",
  ],
  modules: ["@nuxt/icon", "@pinia/nuxt"],

  icon: {
    // provider: "server",
    customCollections: [
      {
        prefix: "f",
        dir: "./assets/icons",
      },
    ],
  },

  build: {
    transpile: [
      "@vuepic/vue-datepicker",
      "vue-toastification",
      "pinia-plugin-persistedstate",
    ],
  },
  app: {
    pageTransition: {
      name: "fade",
      mode: "out-in",
    },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title:
        "Funbooking - Дешевые авиабилеты в рассрочку и кредит, страховки. Бронь авиабилетов и отелей для визы.",
      meta: [
        {
          name: "keywords",
          content:
            "дешевые авиабилеты онлайн, билеты на самолет дешево, рассрочка, кредит, цены на авиабилеты, бронирование без оплаты для визы, бронь для визы",
        },
        {
          name: "description",
          content:
            "На портале авиабилетов funbooking.com богатый выбор сервисов авиабилетов: поиск, бронирование без оплаты, онлайн рассрочка и кредит, дешевые страховки, бронь авиабилетов и отелей для визы.",
        },
      ],
    },
  },
});
