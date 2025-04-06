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
  modules: ["@nuxt/icon", "@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],

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
        "Funbooking - бронь для визы, оплата Е-Виз и ЕТА. Авиабронь и бронь отеля без полной оплаты билета",
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
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "96x96",
          href: "/favicon-96x96.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "128x128",
          href: "/favicon-128x128.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "196x196",
          href: "/favicon-196x196.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "57x57",
          href: "/apple-touch-icon-57x57.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "72x72",
          href: "/apple-touch-icon-72x72.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "76x76",
          href: "/apple-touch-icon-76x76.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "114x114",
          href: "/apple-touch-icon-114x114.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "120x120",
          href: "/apple-touch-icon-120x120.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "144x144",
          href: "/apple-touch-icon-144x144.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "152x152",
          href: "/apple-touch-icon-152x152.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon-180x180.png",
        },
      ],
    },
  },
});
