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
    transpile: ["@vuepic/vue-datepicker", "vue-toastification", "pinia-plugin-persistedstate"],
  },
  app: {
    pageTransition: {
      name: "fade",
      mode: "out-in",
    }  
  }
});
